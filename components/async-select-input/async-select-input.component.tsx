"use client";
import { Control, Controller } from "react-hook-form";
import {
  components,
  OptionProps,
  Props as SelectProps,
  StylesConfig,
} from "react-select";
import React, { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { SelectOption } from "@/models";
import "./async-select-input.scss";
import { cn, getColor } from "@/utils";
import AsyncSelect from "react-select/async";
import { Separator, ErrorMessage } from "../index";

interface Option {
  [key: string]: any;
}

interface Props extends SelectProps {
  name: string;
  control: Control<any>;
  options: Option[];
  className?: string;
  placeholder?: string;
  label?: string;
  required?: boolean;
  requiredMessage?: string;
  rules?: any;
  errors?: any;
  onChange?: (value: any) => void;
  hasButton?: boolean;
  onButtonClick?: () => void;
  separator?: boolean;
  defaultValue?: any;
  disabled?: boolean;
  loadOptions: (inputValue: string) => Promise<Option[]>;
}

export const AsyncSelectInput: React.FC<Props> = ({
  name,
  control,
  options: baseOptions,
  className = "",
  placeholder = "",
  label = "",
  required = false,
  requiredMessage,
  rules,
  errors,
  onChange,
  hasButton = false,
  onButtonClick,
  separator = true,
  defaultValue,
  getOptionLabel = (option: any) => option.label,
  getOptionValue = (option: any) => option.value,
  isMulti = false,
  disabled = false,
  loadOptions,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("trans");

  const options = useMemo(() => {
    const filteredOptions = baseOptions.filter((opt) => !opt.isSeparator);
    if (separator) {
      return baseOptions.flatMap((option, index) =>
        index < baseOptions.length - 1
          ? [option, { isSeparator: true, value: `separator-${index}` }]
          : [option]
      );
    }
    return filteredOptions;
  }, [baseOptions, separator]);

  const colorStyles: StylesConfig = {
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

  const { Option, MenuList } = components;
  const IconOption = (props: OptionProps) => (
    <Option {...props} className="!flex gap-2 !items-center justify-between">
      {getOptionLabel(props.data)}
      {props.isSelected && <span className="text-green-500">✓</span>}
    </Option>
  );

  const CustomMenuList = (props: any) => {
    const childrenArray = React.Children.toArray(props.children);
    return (
      <MenuList {...props}>
        {childrenArray.map((child, index) => (
          <React.Fragment key={index}>
            {child}
            {separator && index < childrenArray.length - 1 && (
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

  const asyncSelectOnChange: any = {
    ...props,
  };
  if (onChange) {
    asyncSelectOnChange.onChange = onChange;
  }

  return (
    <div
      className={cn(
        "select-input__wrapper w-full",
        disabled ? "cursor-not-allowed" : "cursor-pointer",
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
                  required: (value: any) =>
                    value !== undefined && value !== ""
                      ? true
                      : requiredMessage || t("common.validation.required"),
                }
              : {}),
            ...rules?.validate,
          },
        }}
        render={({ field, fieldState: { error } }) => {
          return (
            <>
              <div className="relative flex flex-col w-full">
                {label ? (
                  <label htmlFor={name} className="select__label">
                    {label}
                  </label>
                ) : null}

                <AsyncSelect
                  {...props}
                  {...field}
                  instanceId="react-select"
                  classNamePrefix="select-input"
                  className={cn(
                    "select-input",
                    disabled && "select-disabled cursor-not-allowed",
                    isOpen && "select-input--open",
                    error && "select-input--has-error"
                  )}
                  cacheOptions
                  defaultOptions={options.filter((opt) => !opt.isSeparator)}
                  // defaultOptions={options}
                  loadOptions={loadOptions}
                  components={{
                    Option: IconOption,
                    MenuList: CustomMenuList,
                    IndicatorSeparator: () => null,
                    DropdownIndicator: () => (
                      <span className="rtl:ml-2.5 ltr:mr-2.5">
                        <span className="text-gray-500">↓</span>
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
                  }}
                  getOptionLabel={getOptionLabel}
                  getOptionValue={getOptionValue}
                  // menuIsOpen={true}
                  isClearable
                  // onChange={onChange}
                  // isSearchable={false}
                  placeholder={placeholder}
                  styles={colorStyles}
                  value={options.find((c) => getOptionValue(c) === field.value)}
                  id={name}
                  noOptionsMessage={() => t("common.no_options")}
                  loadingMessage={() => t("common.searching")}
                  onMenuOpen={() => setIsOpen(true)}
                  onMenuClose={() => setIsOpen(false)}
                  menuPlacement="auto"
                />
              </div>

              {error?.message ? <ErrorMessage message={error.message} /> : null}
            </>
          );
        }}
      />
    </div>
  );
};
