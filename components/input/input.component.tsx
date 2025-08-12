// "use client";

// import {
//   Control,
//   Controller,
//   ControllerRenderProps,
//   RegisterOptions,
// } from "react-hook-form";
// import "./input.scss";
// import { ReactNode, useState } from "react";
// import { useLocale, useTranslations } from "next-intl";
// import { cn, getColor } from "@/utils";
// import { ErrorMessage, IconButton } from "../index";
// import { inputSvc } from "./helper";

// interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
//   name: string;
//   control: Control<any>;
//   label?: string;
//   placeholder?: string;
//   type?: string;
//   rules?: Exclude<
//     RegisterOptions,
//     "valueAsNumber" | "valueAsDate" | "setValueAs"
//   >;
//   required?: boolean;
//   requiredMessage?: string;
//   className?: string;
//   inputClassName?: string;
//   textAreaClassName?: string;
//   isSecondary?: boolean;
//   disabled?: boolean;
//   readOnly?: boolean;
//   fontBold?: boolean;
//   info?: string;
//   hasIcon?: boolean;
//   defaultValue?: string;
//   customSuffix?: string | ReactNode;
//   callback?: (name: string, value: any) => () => void;
//   hidden?: boolean;
//   dir?: "ltr" | "rtl";
//   formatNumber?: boolean;
//   capitalize?: boolean;
//   removeText?: boolean;
//   removeOuterText?: boolean;
//   removeSpaces?: boolean;
//   removeNumbers?: boolean;
//   equalTo?: string;
//   equalErrormessage?: string;
//   callbackOnChange?: (value: string) => void;
//   floating?: boolean;
//   labelClassName?: string;
// }

// export const Input: React.FC<Props> = ({
//   name,
//   control,
//   label,
//   placeholder,
//   type = "string",
//   rules = {},
//   required,
//   requiredMessage,
//   className,
//   inputClassName,
//   textAreaClassName,
//   disabled = false,
//   isSecondary = false,
//   readOnly = false,
//   fontBold,
//   info,
//   hasIcon = true,
//   defaultValue,
//   customSuffix,
//   callback,
//   hidden = false,
//   dir,
//   formatNumber,
//   removeNumbers,
//   removeOuterText,
//   removeSpaces,
//   removeText,
//   capitalize,
//   equalTo,
//   equalErrormessage,
//   callbackOnChange,
//   floating = true,
//   labelClassName,
//   ...props
// }) => {
//   const t = useTranslations("trans");
//   const locale = useLocale();

//   const [showPassword, setShowPassword] = useState(false);
//   const [inputType, setInputType] = useState(type);

//   const servicesPriority = [
//     { key: "removeText", condition: removeText },
//     { key: "removeOuterText", condition: removeOuterText },
//     { key: "removeSpaces", condition: removeSpaces },
//     { key: "formatNumber", condition: formatNumber },
//     { key: "removeNumbers", condition: removeNumbers },
//     { key: "capitalize", condition: capitalize },
//   ];

//   const activeService =
//     servicesPriority.find((service) => service.condition)?.key || "default";

//   const onTogglePassword = () => {
//     const toggleValue = !showPassword;
//     setInputType(toggleValue ? "text" : "password");
//     setShowPassword(toggleValue);
//   };

//   const _renderSuffix = (field: ControllerRenderProps) => {
//     if (customSuffix)
//       return <span className="input__custom-suffix">{customSuffix}</span>;

//     if (type === "password" && hasIcon) {
//       return (
//         <IconButton onClick={onTogglePassword} className="input__toggle-button">
//           {showPassword ? (
//             <span className="text-gray-500">👁</span>
//           ) : (
//             <span className="text-gray-500">👁</span>
//           )}
//         </IconButton>
//       );
//     }

//     /*     if (type === "tel" && hasIcon) {
//       return (
//         <div className="input__dial-code">
//           <span className="text-gray-500">🇸🇦</span>
//           <div>966+</div>
//         </div>
//       );
//     } */

//     if (type === "number" && hasIcon) {
//       return (
//         <div className="flex flex-col">
//           <button
//             type="button"
//             className={disabled ? "cursor-not-allowed" : "cursor-pointer"}
//             onClick={() => {
//               if (!disabled) {
//                 const newValue = (+field.value || 0) + 1;
//                 field.onChange(String(newValue));
//                 callback?.(name, String(newValue));
//                 callbackOnChange?.(String(newValue));
//               }
//             }}
//           >
//             <span className="text-gray-500">↑</span>
//           </button>
//           <button
//             type="button"
//             className={disabled ? "cursor-not-allowed" : "cursor-pointer"}
//             onClick={() => {
//               if (!disabled) {
//                 const newValue = (+field.value || 0) - 1;
//                 field.onChange(String(newValue));
//                 callback?.(name, String(newValue));
//                 callbackOnChange?.(String(newValue));
//               }
//             }}
//           >
//             <span className="text-gray-500">↓</span>
//           </button>
//         </div>
//       );
//     }

//     return null;
//   };

//   return (
//     <Controller
//       name={name}
//       control={control}
//       defaultValue={defaultValue}
//       rules={{
//         ...rules,
//         validate: {
//           ...(required
//             ? {
//                 required: (value: string | number) => {
//                   if (typeof value === "string" && value.trim() !== "")
//                     return true;
//                   if (typeof value === "number" && value) return true;
//                   return requiredMessage || t("common.validation.required");
//                 },
//               }
//             : {}),
//           ...(equalTo
//             ? {
//                 equalTo: (value: string | number, formValues: any) => {
//                   return value === formValues[equalTo]
//                     ? true
//                     : equalErrormessage || t("common.validation.match");
//                 },
//               }
//             : {}),
//           ...rules?.validate,
//         },
//       }}
//       render={({ field, fieldState: { error } }) => (
//         <>
//           <div
//             className={cn(
//               floating && "form-floating",
//               "relative w-full",
//               className
//             )}
//           >
//             <div className={cn("flex flex-col gap-2")}>
//               <input
//                 type={inputType}
//                 disabled={disabled}
//                 id={name}
//                 dir={dir}
//                 readOnly={readOnly}
//                 placeholder={placeholder || label}
//                 hidden={hidden}
//                 style={{
//                   backgroundColor: readOnly ? getColor("color-gray-light") : "",
//                 }}
//                 className={cn(
//                   "form-control",
//                   fontBold && "input--bold",
//                   required && "input--required",
//                   locale === "en" && "input--ltr",
//                   type === "checkbox" && "input__checkbox-type",
//                   isSecondary && "input-secondary",
//                   disabled && "input--disabled",
//                   inputClassName,
//                   error ? "is-invalid" : "!text-[#1b1b1b]",
//                   floating ? "order-1" : "order-2"
//                 )}
//                 {...field}
//                 onChange={(e) => {
//                   const { value } = e.target;
//                   inputSvc(
//                     name,
//                     value,
//                     (newValue) => {
//                       e.target.value = newValue;
//                       field?.onChange(e);
//                       callbackOnChange?.(newValue);
//                     },
//                     callback,
//                     activeService
//                   );
//                 }}
//                 onKeyDown={(e) =>
//                   inputType === "number" && e.key === "e" && e.preventDefault()
//                 }
//                 {...props}
//               />
//               {label && (
//                 <label
//                   htmlFor={name}
//                   className={cn(
//                     floating ? "order-2" : "order-1",
//                     labelClassName
//                   )}
//                 >
//                   {label} {info && <span className="text-blue-500">ℹ</span>}
//                 </label>
//               )}
//             </div>
//             <div className="input__icon">{_renderSuffix(field)}</div>
//           </div>
//           {error?.message && <ErrorMessage message={error.message} />}
//         </>
//       )}
//     />
//   );
// };

"use client";

import {
  Control,
  Controller,
  ControllerRenderProps,
  RegisterOptions,
} from "react-hook-form";
import "./input.scss";
import { ReactNode, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { cn, getColor } from "@/utils";
import { ErrorMessage, IconButton } from "../index";
import { inputSvc } from "./helper";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
  label?: string;
  placeholder?: string;
  type?: string;
  rules?: Exclude<
    RegisterOptions,
    "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
  required?: boolean;
  requiredMessage?: string;
  className?: string;
  inputClassName?: string;
  textAreaClassName?: string;
  isSecondary?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  fontBold?: boolean;
  info?: string;
  hasIcon?: boolean;
  defaultValue?: string;
  customSuffix?: string | ReactNode;
  callback?: (name: string, value: any) => () => void;
  hidden?: boolean;
  dir?: "ltr" | "rtl";
  formatNumber?: boolean;
  capitalize?: boolean;
  removeText?: boolean;
  removeOuterText?: boolean;
  removeSpaces?: boolean;
  removeNumbers?: boolean;
  equalTo?: string;
  equalErrormessage?: string;
  callbackOnChange?: (value: string) => void;
  floating?: boolean;
  labelClassName?: string;
}

export const Input: React.FC<Props> = ({
  name,
  control,
  label,
  placeholder,
  type = "string",
  rules = {},
  required,
  requiredMessage,
  className,
  inputClassName,
  textAreaClassName,
  disabled = false,
  isSecondary = false,
  readOnly = false,
  fontBold,
  info,
  hasIcon = true,
  defaultValue,
  customSuffix,
  callback,
  hidden = false,
  dir,
  formatNumber,
  removeNumbers,
  removeOuterText,
  removeSpaces,
  removeText,
  capitalize,
  equalTo,
  equalErrormessage,
  callbackOnChange,
  floating = true,
  labelClassName,
  ...props
}) => {
  const t = useTranslations("trans");
  const locale = useLocale();

  const [showPassword, setShowPassword] = useState(false);
  const [inputType, setInputType] = useState(type);

  const servicesPriority = [
    { key: "removeText", condition: removeText },
    { key: "removeOuterText", condition: removeOuterText },
    { key: "removeSpaces", condition: removeSpaces },
    { key: "formatNumber", condition: formatNumber },
    { key: "removeNumbers", condition: removeNumbers },
    { key: "capitalize", condition: capitalize },
  ];

  const activeService =
    servicesPriority.find((service) => service.condition)?.key || "default";

  const onTogglePassword = () => {
    const toggleValue = !showPassword;
    setInputType(toggleValue ? "text" : "password");
    setShowPassword(toggleValue);
  };

  const _renderSuffix = (field: ControllerRenderProps) => {
    if (customSuffix)
      return <span className="input__custom-suffix">{customSuffix}</span>;

    if (type === "password" && hasIcon) {
      return (
        <IconButton onClick={onTogglePassword} className="input__toggle-button">
          {showPassword ? (
            <span className="text-gray-500">👁</span>
          ) : (
            <span className="text-gray-500">👁</span>
          )}
        </IconButton>
      );
    }

    /*     if (type === "tel" && hasIcon) {
      return (
        <div className="input__dial-code">
          <span className="text-gray-500">🇸🇦</span>
          <div>966+</div>
        </div>
      );
    } */

    if (type === "number" && hasIcon) {
      return (
        <div className="flex flex-col">
          <button
            type="button"
            className={disabled ? "cursor-not-allowed" : "cursor-pointer"}
            onClick={() => {
              if (!disabled) {
                const newValue = (+field.value || 0) + 1;
                field.onChange(String(newValue));
                callback?.(name, String(newValue));
                callbackOnChange?.(String(newValue));
              }
            }}
          >
            <span className="text-gray-500">↑</span>
          </button>
          <button
            type="button"
            className={disabled ? "cursor-not-allowed" : "cursor-pointer"}
            onClick={() => {
              if (!disabled) {
                const newValue = (+field.value || 0) - 1;
                field.onChange(String(newValue));
                callback?.(name, String(newValue));
                callbackOnChange?.(String(newValue));
              }
            }}
          >
            <span className="text-gray-500">↓</span>
          </button>
        </div>
      );
    }

    return null;
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={{
        ...rules,
        validate: {
          ...(required
            ? {
                required: (value: string | number) => {
                  if (typeof value === "string" && value.trim() !== "")
                    return true;
                  if (typeof value === "number" && value) return true;
                  return requiredMessage || t("common.validation.required");
                },
              }
            : {}),
          ...(equalTo
            ? {
                equalTo: (value: string | number, formValues: any) => {
                  return value === formValues[equalTo]
                    ? true
                    : equalErrormessage || t("common.validation.match");
                },
              }
            : {}),
          ...rules?.validate,
        },
      }}
      render={({ field, fieldState: { error } }) => (
        <>
          <div
            className={cn(
              floating && "form-floating",
              "relative w-full flex flex-col gap-2",
              className
            )}
          >
            <input
              type={inputType}
              disabled={disabled}
              id={name}
              dir={dir}
              readOnly={readOnly}
              placeholder={placeholder || label}
              hidden={hidden}
              style={{
                backgroundColor: readOnly ? getColor("color-gray-light") : "",
              }}
              className={cn(
                "form-control",
                fontBold && "input--bold",
                required && "input--required",
                locale === "en" && "input--ltr",
                type === "checkbox" && "input__checkbox-type",
                isSecondary && "input-secondary",
                disabled && "input--disabled",
                inputClassName,
                error ? "is-invalid" : "!text-[#1b1b1b]",
                floating ? "order-1" : "order-2"
              )}
              {...field}
              onChange={(e) => {
                const { value } = e.target;
                inputSvc(
                  name,
                  value,
                  (newValue) => {
                    e.target.value = newValue;
                    field?.onChange(e);
                    callbackOnChange?.(newValue);
                  },
                  callback,
                  activeService
                );
              }}
              onKeyDown={(e) =>
                inputType === "number" && e.key === "e" && e.preventDefault()
              }
              {...props}
            />
            {label && (
              <label
                htmlFor={name}
                className={cn(floating ? "order-2" : "order-1", labelClassName)}
              >
                {label} {info && <span className="text-blue-500">ℹ</span>}
              </label>
            )}
            <div className="input__icon">{_renderSuffix(field)}</div>
          </div>
          {error?.message && <ErrorMessage message={error.message} />}
        </>
      )}
    />
  );
};
