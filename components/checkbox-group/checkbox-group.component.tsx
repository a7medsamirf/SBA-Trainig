"use client";

import { useTranslations } from "next-intl";
import { Control, Controller, RegisterOptions } from "react-hook-form";
import "./checkbox-group.scss";
import { Checkbox, ErrorMessage } from "../index";
import { cn, randomKey } from "@/utils";

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
  defaultValue?: string;
  options: Option[];
  getOptionLabel?: (option: Option) => string;
  getOptionValue?: (option: Option) => string;
  callback?: (name: string, value: any) => () => void;
}

interface Option {
  [key: string]: any;
}

export const CheckboxGroup = ({
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
  getOptionLabel = (option) => option.label,
  getOptionValue = (option) => option.value,
  callback,
}: Props) => {
  const t = useTranslations("trans");

  const key = randomKey();

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
                  if (typeof value === "string") {
                    if (value?.trim() !== "") {
                      return true;
                    }
                  } else if (value) {
                    return true;
                  }

                  return requiredMessage || t("common.validation.required");
                },
              }
            : {}),
          ...rules?.validate,
        },
      }}
      render={({ field, fieldState: { error } }) => {
        const handleChange = (option: Option) => {
          const optionValue = getOptionValue(option);

          let newArray = Array.isArray(field.value) ? [...field.value] : [];

          const index = newArray.findIndex(
            (x) => JSON.stringify(x) === JSON.stringify(optionValue)
          );

          if (index === -1) {
            newArray.push(optionValue);
          } else {
            newArray.splice(index, 1);
          }

          field.onChange(newArray.length > 0 ? newArray : undefined);
          callback?.(name, newArray);
        };

        return (
          <div className={cn("checkbox__wrapper", className)}>
            {label ? (
              <label
                htmlFor={`checkbox-${name}-${key}`}
                className="checkbox__label"
              >
                {label}
              </label>
            ) : null}

            <div
              className={cn(
                "checkbox__group grid gap-4",
                classNameGroup,
                gridNumber === 1
                  ? "grid-cols-1"
                  : gridNumber === 2
                  ? "grid-cols-1 sm:grid-cols-2"
                  : gridNumber === 3
                  ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
                  : gridNumber === 4
                  ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                  : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
              )}
            >
              {options.map((option) => {
                const optionValue = getOptionValue(option);
                const optionLabel = getOptionLabel(option);

                const isChecked = field.value?.some(
                  (checked: any) =>
                    JSON.stringify(checked) === JSON.stringify(optionValue)
                );

                return (
                  <Checkbox
                    key={`checkbox-${optionValue}-${key}`}
                    id={`checkbox-${optionValue}-${key}`}
                    {...field}
                    checked={isChecked}
                    value={optionValue}
                    label={optionLabel}
                    onChange={() => handleChange(option)}
                    className={cn(
                      "checkbox__group-item",
                      disabled && "checkbox__group-item--disabled",
                      error && "checkbox__group-item--error",
                      isChecked && "checkbox__group-item-checked",
                      classNameItem
                    )}
                    disabled={disabled}
                  />
                );
              })}
            </div>

            {error?.message ? <ErrorMessage message={error.message} /> : null}
          </div>
        );
      }}
    />
  );
};
