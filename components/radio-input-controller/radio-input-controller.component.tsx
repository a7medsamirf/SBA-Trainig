"use client";

import { useTranslations } from "next-intl";
import { Control, Controller, RegisterOptions } from "react-hook-form";
import "./radio-input-controller.scss";
import { ErrorMessage, RadioInput } from "../index";
import { cn } from "@/utils";

interface Props {
  name: string;
  control: Control<any>;
  label: string;
  value: string;
  rules?: Exclude<
    RegisterOptions,
    "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
  required?: boolean;
  className?: string;
  disabled?: boolean;
  defaultValue?: string;
  checked?: boolean;
  showEmpty?: boolean;
  showRadioEmpty?: boolean;
  notClickable?: boolean;
}

export const RadioInputController = ({
  name,
  control,
  label,
  value,
  rules = {},
  required,
  className,
  disabled = false,
  defaultValue,
  checked,
  showEmpty = false,
  showRadioEmpty = true,
  notClickable = false,
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
                  if (typeof value === "string" && value.trim() !== "") {
                    return true;
                  } else if (value) {
                    return true;
                  }

                  return t("common.validation.required");
                },
              }
            : {}),
          ...rules?.validate,
        },
      }}
      render={({ field, fieldState: { error } }) => (
        <div className={cn("radio__wrapper", className)}>
          <RadioInput
            id={value}
            {...field}
            checked={checked}
            value={value}
            label={label}
            showEmpty={showEmpty}
            showRadioEmpty={showRadioEmpty}
            notClickable={notClickable}
          />

          {error?.message ? <ErrorMessage message={error?.message} /> : null}
        </div>
      )}
    />
  );
};
