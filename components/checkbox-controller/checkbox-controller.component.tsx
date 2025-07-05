"use client";

import { useTranslations } from "next-intl";
import { Control, Controller, RegisterOptions } from "react-hook-form";
import "./checkbox-controller.scss";
import { memo, ReactNode } from "react";
import { Checkbox, ErrorMessage } from "../index";
import { cn } from "@/utils";

interface Props {
  name: string;
  control: Control<any>;
  label?: string | ReactNode;
  rules?: Exclude<
    RegisterOptions,
    "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
  required?: boolean;
  className?: string;
  labelClassName?: string;
  disabled?: boolean;
  defaultValue?: string;
  requiredMessage?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  callback?: (name: string, value: string) => () => void;
}

export const CheckboxController = memo(
  ({
    name,
    control,
    label,
    rules = {},
    required,
    className,
    labelClassName,
    disabled = false,
    defaultValue,
    requiredMessage,
    onChange,
    callback,
  }: Props) => {
    const t = useTranslations("trans");
    return (
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        disabled={disabled}
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
          return (
            <div className={cn("checkbox__wrapper", className)}>
              <Checkbox
                id={name}
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  onChange?.(e);
                  callback?.(name, e.target.value);
                }}
                className={className}
                labelClassName={labelClassName}
                label={label}
              />

              {error?.message ? <ErrorMessage message={error.message} /> : null}
            </div>
          );
        }}
      />
    );
  }
);
