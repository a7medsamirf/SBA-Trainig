"use client";

import { Control, Controller } from "react-hook-form";
import ReactSelect, {
  components,
  OptionProps,
  Props as SelectProps,
  StylesConfig,
} from "react-select";
import AsyncReactSelect from "react-select/async";
import React, { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import "./select-input.scss";
import { cn, getColor } from "@/utils";
import { ErrorMessage, Separator } from "../index";

interface Option {
  [key: string]: any;
}

interface Props extends SelectProps {
  name: string;
  control: Control<any>;
  options?: Option[];
  loadOptions?: (inputValue: string) => Promise<Option[]>;
  className?: string;
  placeholder?: string;
  label?: string;
  required?: boolean;
  requiredMessage?: string;
  rules?: any;
  onChange?: (value: any) => void;
  hasButton?: boolean;
  onButtonClick?: () => void;
  separator?: boolean;
  defaultValue?: any;
  disabled?: boolean;
  isAsync?: boolean;
  isCreatable?: boolean;
  callback?: (name: string, value: string) => () => void;
  onRemoveItem?: any;
}

export const SelectInput: React.FC<Props> = ({
  name,
  control,
  options: baseOptions = [],
  loadOptions,
  className = "",
  placeholder = "",
  label = "",
  required = false,
  requiredMessage,
  rules,
  onChange,

  hasButton = false,
  onButtonClick,
  separator = true,
  defaultValue,
  getOptionLabel = (option: any) => option.label,
  getOptionValue = (option: any) => option.value,
  isMulti = false,
  disabled = false,
  isAsync = false,
  callback,
  onRemoveItem,
  menuPlacement = "auto",
  menuPosition = "fixed",
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("trans");

  const options = useMemo(() => {
    if (isAsync) return baseOptions;
    const filteredOptions = baseOptions.filter((opt) => !opt.isSeparator);
    if (separator) {
      return baseOptions.flatMap((option, index) =>
        index < baseOptions.length - 1
          ? [option, { isSeparator: true, value: `separator-${index}` }]
          : [option]
      );
    }
    return filteredOptions;
  }, [baseOptions, separator, isAsync]);

  const colorStyles: StylesConfig = {
    menu: (styles) => ({
      ...styles,
      minWidth: "150px",
      overflow: "hidden",
    }),
    menuPortal: (styles) => ({
      ...styles,
      zIndex: 9999,
    }),

    placeholder(base) {
      return {
        ...base,
        color: getColor("color-third"),
        fontSize: "14px",
        lineHeight: "26.24px",
        padding: "0 6.5px",
      };
    },
    singleValue(base) {
      return {
        ...base,
        color: getColor("color-primary"),
        fontSize: "14px",
        lineHeight: "26.24px",
        padding: "0 6.5px",
        borderRadius: "40px",
      };
    },

    option: (styles, { isDisabled, isSelected, isFocused }) => ({
      ...styles,
      backgroundColor:
        isFocused || isSelected ? getColor("color-gray-light") : "white",
      color: "black",
      cursor: isDisabled ? "not-allowed" : "pointer",
      ":hover": { backgroundColor: getColor("color-gray-light") },
      ":active": { backgroundColor: "white" },
    }),
  };

  const { Option, MenuList, MultiValueRemove } = components;
  const IconOption = (props: OptionProps) => (
    <Option {...props} className="!flex gap-2 !items-center justify-between">
      {getOptionLabel(props.data)}
      {props.isSelected && <span className="text-green-500">✓</span>}
    </Option>
  );

  const removeOption = (props: any) => {
    return (
      <MultiValueRemove
        {...props}
        innerProps={{
          ...props.innerProps,
          onClick: (e: any) => {
            e.stopPropagation();
            onRemoveItem?.(props.data);
            props.innerProps.onClick(e);
          },
        }}
      />
    );
  };

  const CustomMenuList = (props: any) => {
    const childrenArray = React.Children.toArray(props.children);
    return (
      <MenuList {...props}>
        {childrenArray.map((child, index) => (
          <React.Fragment key={index}>
            {child}
            {separator && !isAsync && index < childrenArray.length - 1 && (
              <Separator
                width="93%"
                height="1px"
                bgColor={getColor("color-gray-light")}
                tabIndex={-1}
                aria-hidden="true"
              />
            )}
          </React.Fragment>
        ))}
      </MenuList>
    );
  };

  const SelectComponent = isAsync ? AsyncReactSelect : ReactSelect;

  return (
    <div
      className={cn(
        "select-input__wrapper w-full",
        disabled ? "cursor-not-allowed" : "cursor-pointer",
        "rounded-[4px]",
        className
      )}
    >
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
                    if (isMulti) {
                      return Array.isArray(value) && value.length > 0
                        ? true
                        : requiredMessage || t("common.validation.required");
                    }
                    return value !== undefined && value !== "" && value !== null
                      ? true
                      : requiredMessage || t("common.validation.required");
                  },
                }
              : {}),
            ...rules?.validate,
          },
        }}
        render={({ field, fieldState: { error } }) => {
          const selectedValue = isMulti
            ? options
                ?.filter((opt) => !opt.isSeparator)
                ?.filter((option) =>
                  field.value?.includes(getOptionValue(option))
                )
            : options
                ?.filter((opt) => !opt.isSeparator)
                ?.find((c) => getOptionValue(c) === field.value);

          return (
            <>
              <div className="relative flex flex-col w-full">
              {label && !className?.includes("form-select") && (
                <label htmlFor={name} className="block text-sm select__label">
                  {label}
                </label>
              )}
                <SelectComponent
                  {...props}
                  inputId={name}
                  instanceId={`react-select-${name}`}
                  classNamePrefix="select-input"
                  className={cn(
                    "select-input",
                    disabled && "select-disabled cursor-not-allowed",
                    isOpen && "select-input--open",
                    error && "select-input--has-error",
                    selectedValue && "has-value" // 👈 دي مهمة جداً عشان الـ label يطلع فوق
                  )}
                  options={
                    isAsync
                      ? undefined
                      : options.filter((opt) => !opt.isSeparator)
                  }
                  cacheOptions
                  loadOptions={isAsync ? loadOptions : undefined}
                  defaultOptions={isAsync ? options : undefined}
                  components={{
                    Option: IconOption,
                    MenuList: CustomMenuList,
                    MultiValueRemove: removeOption,
                    IndicatorSeparator: () => null,
                    DropdownIndicator: () => (
                      <span className="rtl:ml-2.5 ltr:mr-2.5">
                        <span className="text-gray-500">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M16.6004 7.45831L11.1671 12.8916C10.5254 13.5333 9.47539 13.5333 8.83372 12.8916L3.40039 7.45831" stroke="#425A8B" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>

                        </span>
                      </span>
                    ),
                  }}
                  onChange={(selected: any) => {
                    const value = selected
                      ? isMulti
                        ? selected.map(getOptionValue)
                        : getOptionValue(selected)
                      : null;
                    field.onChange(value);

                    onChange?.(value);
                    callback?.(name, value);
                  }}
                  value={selectedValue}
                  getOptionLabel={getOptionLabel}
                  getOptionValue={getOptionValue}
                  placeholder={placeholder || t("common.select")}
                  styles={colorStyles}
                  id={name}
                  isMulti={isMulti}
                  noOptionsMessage={() => t("common.no_options")}
                  onMenuOpen={() => setIsOpen(true)}
                  onMenuClose={() => setIsOpen(false)}
                  isDisabled={disabled}
                  menuPlacement={menuPlacement}
                  menuPosition={menuPosition}
                />
              </div>
              {error?.message && <ErrorMessage message={error.message} />}
            </>
          );
        }}
      />
    </div>
  );
};
