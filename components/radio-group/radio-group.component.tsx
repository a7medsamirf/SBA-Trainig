"use client";

import { useTranslations } from "next-intl";
import { Control, Controller, RegisterOptions } from "react-hook-form";
import "./radio-group.scss";
import { RadioInput, ErrorMessage } from "../index";
import { cn } from "@/utils";
import { memo } from "react";

interface Props {
  name: string;
  control: Control<any>;
  label?: string;
  rules?: Exclude<
    RegisterOptions,
    "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
  required?: boolean;
  requiredMessage?: string;
  className?: string;
  classNameGroup?: string;
  classNameItem?: string;
  gridNumber?: number;
  disabled?: boolean;
  defaultValue?: any;
  options: Option[];
  getOptionLabel?: (option: Option) => string;
  getOptionValue?: (option: Option) => any;
  showRadioEmpty?: boolean;
  callback?: (name: string, value: string) => () => void;
}

interface Option {
  [key: string]: any;
}

export const RadioGroup: React.FC<Props> = memo(
  ({
    name,
    control,
    label,
    rules = {},
    required,
    requiredMessage,
    className,
    classNameGroup,
    classNameItem,
    gridNumber = 3,
    disabled = false,
    options,
    defaultValue,
    getOptionLabel = (option: any) => option.label,
    getOptionValue = (option: any) => option.value,
    showRadioEmpty = false,
    callback,
  }) => {
    const t = useTranslations("trans");

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
                  required: (value: any) => {
                    if (
                      value === undefined ||
                      value === null ||
                      (typeof value === "string" && value.trim() === "")
                    ) {
                      return requiredMessage || t("common.validation.required");
                    }
                    return true;
                  },
                }
              : {}),
            ...rules?.validate,
          },
        }}
        render={({ field, fieldState: { error } }) => {
          return (
            <div className={cn("radio__wrapper", className)}>
              {label ? (
                <label htmlFor={`radio-${name}`} className="radio__label">
                  {label}
                </label>
              ) : null}
              <div>
                <div
                  className={cn(
                    "radio__group grid gap-4",
                    classNameGroup,
                    gridNumber === 1
                      ? "grid-cols-1"
                      : gridNumber === 2
                      ? "grid-cols-1 sm:grid-cols-2"
                      : gridNumber === 3
                      ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
                      : gridNumber === 4
                      ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                      : gridNumber === 5
                      ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
                      : gridNumber === 6
                      ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
                      : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
                  )}
                >
                  {options.map((option) => {
                    const optionValue = getOptionValue(option);
                    const optionLabel = getOptionLabel(option);

                    const isChecked = field.value === optionValue;

                    return (
                      <RadioInput
                        key={`radio-${optionValue}`}
                        id={`radio-${optionValue}`}
                        {...field}
                        checked={isChecked}
                        value={optionValue}
                        label={optionLabel}
                        disabled={disabled}
                        className={cn(
                          "radio__group-item",
                          error && "radio__group-item--error",
                          isChecked && "radio__group-item-checked",
                          classNameItem
                        )}
                        onChange={() => {
                          field.onChange(optionValue);
                          callback?.(name, optionValue);
                        }}
                        showRadioEmpty={showRadioEmpty}
                      />
                    );
                  })}
                </div>
                {error?.message ? (
                  <ErrorMessage message={error.message} />
                ) : null}
              </div>
            </div>
          );
        }}
      />
    );
  }
);
