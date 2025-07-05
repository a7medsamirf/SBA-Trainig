"use client";
import Image from "next/image";
import { Fragment, ReactNode, useEffect, useRef, useState } from "react";
import {
  Control,
  RegisterOptions,
  useController,
  UseFormSetValue,
  UseFormTrigger,
} from "react-hook-form";
import "./image-input.scss";
import { useTranslations } from "next-intl";
import {
  cn,
  convertToBase64,
  flattenObject,
  getColor,
  withCallbacks,
} from "@/utils";
import { ErrorMessage, IconButton, Spinner } from "../index";
import toast from "react-hot-toast";

interface Document {
  fileName: string;
  contentType: string;
  fileContent: string;
  [key: string]: any;
}

interface Props {
  name: string;
  setValue: UseFormSetValue<any>;
  control: Control<any, any>;
  defaultValue?: Document[];
  className?: string;
  rules?: Exclude<
    RegisterOptions,
    "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
  label?: string | ReactNode;
  required?: boolean;
  trigger: UseFormTrigger<any>;
  isMultiple?: boolean;
  labelClassName?: string;
  ImageInputClassName?: string;
  isSmall?: boolean;
  onRemove?: (index: number) => void;
  index?: number;
  disabled?: boolean;
  callback?: () => void;
  showRules?: boolean;
  showAllowedFiles?: boolean;
  showIcon?: boolean;
  requiredMessage?: string;
  otherValues?: { [key: string]: any };
  maxSize?: number;
  accept?: string[];
  preUpload?: boolean;
  showAsIcon?: boolean;
  hasValue?: boolean;
}

export const ImageInput: React.FC<Props> = ({
  name,
  setValue,
  control,
  defaultValue = undefined,
  rules,
  className,
  label = "",
  required = false,
  trigger,
  isMultiple = false,
  labelClassName = "",
  ImageInputClassName = "",
  isSmall = false,
  onRemove,
  index,
  disabled = false,
  showRules = false,
  showAllowedFiles = true,
  showIcon = true,
  requiredMessage,
  otherValues,
  callback,
  preUpload = true,
  showAsIcon = false,
  maxSize = 5 * 1024 * 1024, // 5MB in bytes
  accept = ["image/jpeg", "image/png", "application/pdf"],
  hasValue = false,
}) => {
  const t = useTranslations("trans");
  const [isUploading, setIsUploading] = useState(false);

  const [documents, setDocuments] = useState<Document[]>(
    defaultValue ? [...defaultValue] : []
  );

  const wrapperRef = useRef<HTMLLabelElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const controlRules: Exclude<
    RegisterOptions,
    "valueAsNumber" | "valueAsDate" | "setValueAs"
  > = {
    ...rules,
    validate: {
      ...(required
        ? {
            required: (value: Document[] | Document | undefined) => {
              // If preUpload is true, the value might be an attchmentId (string/number)
              if (preUpload) {
                if (!value) {
                  return requiredMessage || t("common.validation.required");
                }
                if (Array.isArray(value) && value.length === 0) {
                  return requiredMessage || t("common.validation.required");
                }
                return true; // If attchmentId exists, it's valid
              }

              // Default validation for non-preUpload case
              if (!value) {
                return requiredMessage || t("common.validation.required");
              }
              if (Array.isArray(value) && value.length === 0) {
                return requiredMessage || t("common.validation.required");
              }
              if (!Array.isArray(value) && !value.fileContent) {
                return requiredMessage || t("common.validation.required");
              }
              return true;
            },
          }
        : {}),
      ...rules?.validate,
    },
  };

  const {
    formState: { errors },
  } = useController({
    name,
    control,
    rules: controlRules,
    defaultValue: defaultValue,
  });

  const error = flattenObject(errors);

  // Convert file to document object
  const processFileToDocument = async (file: File): Promise<any> => {
    const fileContent = await convertToBase64(file);

    const fileSlice = fileContent.split("base64,")[1];

    const fileReturn = {
      fileName: file.name,
      contentType: file.type,
      fileContent: fileSlice,
      ...otherValues,
    };

    return fileReturn;
  };

  const validateFile = (file: File): boolean => {
    // Check file size
    if (file.size > maxSize) {
      control.setError(name, {
        type: "manual",
        message: t("common.validation.max-size", {
          size: `${maxSize / 1024 / 1024} ${t("common.mb")}`,
        }),
      });
      return false;
    }

    const extensions = accept.map((type) => type.split("/")[1]);
    const acceptFiles = extensions.join(", ");

    // Check file type
    if (!accept.includes(file.type)) {
      control.setError(name, {
        type: "manual",
        message: t("common.validation.accept-file", { acceptFiles }),
      });
      return false;
    }

    control.setError(name, {});
    return true;
  };

  const handlePreviewImage = async (file: File) => {
    if (!validateFile(file)) return;

    const document = await processFileToDocument(file);

    if (isMultiple) {
      setDocuments((prev) => [...prev, document]);
    } else {
      setDocuments([document]);
    }
  };

  const handleImageChange = async (e: any) => {
    if (documents.length < 5) {
      const newFiles: File[] = Array.from(e.target.files);

      const validFiles = newFiles.filter((file) => validateFile(file));
      if (validFiles.length === 0) return;

      const newDocuments = await Promise.all(
        newFiles.map(processFileToDocument)
      );

      if (isMultiple) {
        setDocuments((prev) => [...prev, ...newDocuments]);
      } else {
        setDocuments(newDocuments);
      }
    }
  };

  const handleDeleteImage = (imageIndex: number) => {
    const updatedDocuments = [...documents];

    updatedDocuments.splice(imageIndex, 1);

    if (inputRef.current) {
      inputRef.current.value = "";
    }

    setDocuments(updatedDocuments);

    control.setError(name, {});

    onRemove && onRemove(index!);
  };

  const onDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    wrapperRef.current?.classList.add("image__label--active");
    console.log("drop");
  };

  const onDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    // wrapperRef.current?.classList.remove(styles['image__label--active']);
    console.log("dropLEav");
  };

  const onDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.nativeEvent.stopPropagation();
    e.nativeEvent.preventDefault();
    console.log("over");
  };

  const onDrop = async (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    wrapperRef.current?.classList.remove("image__label--active");

    if (e.dataTransfer.files.length > 0 && documents.length < 5) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        const newDocument = await processFileToDocument(file);
        if (isMultiple) {
          setDocuments((prev) => [...prev, newDocument]);
        } else {
          setDocuments([newDocument]);
        }
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLLabelElement>) => {
    if (e.key === "Enter" && !disabled && !isUploading) {
      e.preventDefault();
      inputRef.current?.click();
    }
  };

  useEffect(() => {
    const value = isMultiple
      ? documents.map((doc) => (preUpload ? doc.attchmentId : doc))
      : preUpload
      ? documents[0]?.attchmentId
      : documents[0];

    setValue(name, value, { shouldValidate: false });

    callback?.();

    if (documents.length) {
      trigger(name);
      if (defaultValue) {
        documents.forEach(
          (file) => file instanceof File && handlePreviewImage(file)
        );
      }
    }
  }, [documents]);

  // useEffect(() => {
  //   console.log("documents", documents);
  // }, [documents]);

  return (
    <>
      <div className="flex flex-col justify-between gap-1">
        {showAsIcon ? (
          <label
            ref={wrapperRef}
            htmlFor={name}
            className="flex items-center justify-center bg-white border rounded-md cursor-pointer size-10 border-gray-light"
            tabIndex={0}
            onKeyDown={handleKeyDown}
          >
            {hasValue ? (
              <span className="text-green-500">✓</span>
            ) : isUploading ? (
              <Spinner size={20} stroke={2} color="secondary" />
            ) : (
              <span className="text-gray-500">📎</span>
            )}
          </label>
        ) : (
          <>
            {label ? <div className={cn("label")}>{label}</div> : null}
            <div
              className={cn(
                "flex items-end justify-center",
                ImageInputClassName
              )}
            >
              <div
                className={cn(
                  "image",
                  showRules ? "max-h-[230px]" : "max-h-[128px]",
                  className
                )}
              >
                {!isMultiple ? (
                  <>
                    {documents.length > 0 ? (
                      <>
                        {documents.map((document, index) => (
                          <Fragment key={index}>
                            <div className="image__uploaded">
                              <div className="image__uploaded-name">
                                <span className="text-green-500">✓</span>

                                <h1>{document?.fileName}</h1>
                              </div>

                              <IconButton
                                className="image__uploaded-delete"
                                onClick={() => handleDeleteImage(index)}
                              >
                                <span className="text-gray-500">✕</span>
                              </IconButton>
                            </div>
                          </Fragment>
                        ))}
                      </>
                    ) : (
                      <label
                        ref={wrapperRef}
                        tabIndex={0}
                        htmlFor={name}
                        className={cn(
                          "image__label",
                          (disabled || isUploading) && "image__label--disabled",
                          error[`${name}.message`] && "image__label--error",
                          labelClassName
                        )}
                        onDragEnter={(e) =>
                          !(disabled || isUploading) && onDragEnter(e)
                        }
                        onDragLeave={(e) =>
                          !(disabled || isUploading) && onDragLeave(e)
                        }
                        onDragOver={(e) =>
                          !(disabled || isUploading) && onDragOver(e)
                        }
                        onDrop={(e) => !(disabled || isUploading) && onDrop(e)}
                        onKeyDown={handleKeyDown}
                      >
                        {showIcon && <span className="text-gray-500">📎</span>}
                        {showRules && (
                          <div className="image__label-text-wrapper">
                            <span
                              className={cn(
                                "image__label-text",
                                isSmall && "image__label-text-small"
                              )}
                            >
                              {t("common.choose-file")}
                            </span>
                            {showAllowedFiles && (
                              <span
                                className={cn(
                                  "image__label-description",
                                  isSmall && "image__label-description-small"
                                )}
                              >
                                {t("common.accept-file", {
                                  acceptFiles: accept
                                    .join(", ")
                                    .replace(/\./g, ""),
                                  maxFileSize: `${maxSize / 1024 / 1024} ${t(
                                    "common.mb"
                                  )}`,
                                })}
                              </span>
                            )}
                          </div>
                        )}

                        <div
                          className={cn(
                            "image__button",
                            (disabled || isUploading) &&
                              "image__button--disabled",
                            isUploading && "image__button--loading"
                          )}
                        >
                          {isUploading && (
                            <Spinner size={20} stroke={2} color="white" />
                          )}

                          {t("common.browse-files")}
                        </div>
                      </label>
                    )}
                  </>
                ) : (
                  <>
                    {isMultiple || documents?.length < 5 ? (
                      <div className="image__wrapper-multiple">
                        <label
                          ref={wrapperRef}
                          htmlFor={name}
                          className={cn(
                            "image__label",
                            error[`${name}.message`] && "image__label--error"
                          )}
                          tabIndex={0}
                          onDragEnter={(e) =>
                            !(disabled || isUploading) && onDragEnter(e)
                          }
                          onDragLeave={(e) =>
                            !(disabled || isUploading) && onDragLeave(e)
                          }
                          onDragOver={(e) =>
                            !(disabled || isUploading) && onDragOver(e)
                          }
                          onDrop={(e) =>
                            !(disabled || isUploading) && onDrop(e)
                          }
                          onKeyDown={handleKeyDown}
                        >
                          {showIcon && (
                            <span className="text-gray-500">📎</span>
                          )}

                          {showRules && (
                            <div className="image__label-text-wrapper">
                              <span
                                className={cn(
                                  "image__label-text",
                                  isSmall && "image__label-text-small"
                                )}
                              >
                                {t("common.choose-file")}
                              </span>
                              {showAllowedFiles && (
                                <span
                                  className={cn(
                                    "image__label-description",
                                    isSmall && "image__label-description-small"
                                  )}
                                >
                                  {t("common.accept-file", {
                                    acceptFiles: accept
                                      .join(", ")
                                      .replace(/\./g, ""),
                                    maxFileSize: `${maxSize / 1024 / 1024} ${t(
                                      "common.mb"
                                    )}`,
                                  })}
                                </span>
                              )}{" "}
                            </div>
                          )}
                          <div
                            className={cn(
                              "image__button",
                              (disabled || isUploading) &&
                                "image__button--disabled",
                              isUploading && "image__button--loading"
                            )}
                          >
                            {isUploading && (
                              <Spinner size={20} stroke={2} color="white" />
                            )}

                            {t("common.browse-files")}
                          </div>
                        </label>
                      </div>
                    ) : null}
                  </>
                )}
              </div>
              {isMultiple ? (
                <div className="flex gap-3 mb-3">
                  {documents.map((document, index) => (
                    <div key={index} className="image__wrapper-multiple-img">
                      <Image
                        width={100}
                        height={100}
                        className="image__img"
                        src={document.fileContent}
                        alt={document.fileName}
                      />

                      <span
                        className="image__wrapper-multiple-delete"
                        onClick={() => handleDeleteImage(index)}
                      >
                        <span className="text-gray-500">✕</span>
                      </span>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </>
        )}
        {error[`${name}.message`] ? (
          <ErrorMessage message={error[`${name}.message`]} />
        ) : null}
      </div>
      <input
        hidden
        ref={inputRef}
        type="file"
        id={name}
        multiple={isMultiple}
        onChange={handleImageChange}
        disabled={disabled || isUploading}
      />
    </>
  );
};
