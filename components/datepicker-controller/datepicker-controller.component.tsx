"use client";

import { Control, Controller } from "react-hook-form";
import DatePicker, { DatePickerProps, registerLocale } from "react-datepicker";
import { ar } from "date-fns/locale/ar";
registerLocale("ar", ar);
import "react-datepicker/dist/react-datepicker.css";

import "./datepicker.scss";
import { useTranslations } from "next-intl";
import { ErrorMessage, ReactDatePicker } from "../index";
import { cn } from "@/utils";

interface Props extends Omit<DatePickerProps, "onChange"> {
  name: string;
  control: Control<any>;
  rules?: any;
  required?: boolean;
  label?: string;
  className?: string;
  minDate?: Date;
  maxDate?: Date;
  placeholder?: string;
  hasDefault?: boolean;
  calendarColor?: string;
  requiredMessage?: string;
  callback?: (name: string, value: any) => void;
  defaultValue?: any;
}

export const ReactDatePickerController: React.FC<Props> = ({
  name,
  control,
  rules,
  required,
  label = "",
  className = "",
  wrapperClassName = "",
  minDate,
  maxDate,
  hasDefault = true,
  dateFormat = "dd-MM-yyyy",
  calendarColor = "color-gray-medium",
  requiredMessage,
  callback,
  defaultValue = undefined,
  disabled,
  ...props
}) => {
  const t = useTranslations("trans");

  const initialValue = hasDefault
    ? new Date()
    : defaultValue
    ? new Date(defaultValue)
    : null;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={initialValue}
      rules={{
        ...rules,
        validate: {
          ...(required
            ? {
                required: (value: string | number | Date | null) => {
                  if (value instanceof Date) return true;
                  if (typeof value === "string" && value.trim() !== "")
                    return true;
                  if (value) return true;
                  return requiredMessage || t("common.validation.required");
                },
              }
            : {}),
          ...rules?.validate,
        },
      }}
      render={({ field, fieldState: { error } }) => {
        return (
          <div className={cn("react-datepicker__container", className)}>
            {label && (
              <label htmlFor={name} className="react-datepicker__label">
                {label}
              </label>
            )}
            <ReactDatePicker
              {...field}
              {...(props as any)}
              disabled={disabled}
              selected={field.value ? new Date(field.value) : null}
              onChange={(date: Date) => {
                field.onChange(date);
              }}
              maxDate={maxDate ? new Date(maxDate) : undefined}
              minDate={minDate ? new Date(minDate) : undefined}
              dateFormat={dateFormat}
              calendarColor={calendarColor}
              defaultValue={defaultValue}
            />
            {error?.message && <ErrorMessage message={error.message} />}
          </div>
        );
      }}
    />
  );
};
