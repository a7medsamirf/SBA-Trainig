"use client";

import { SelectOption } from "@/models";
import React, { useState } from "react";
import ReactSelect, {
  components,
  OptionProps,
  Props as SelectProps,
  SingleValueProps,
  StylesConfig,
} from "react-select";
import "./dropdown.scss";
import { useTranslations } from "next-intl";
import { Separator } from "../index";
import { cn, getColor } from "@/utils";

interface Props extends SelectProps {
  options: SelectOption[] | any[];
  className?: string;
  placeholder?: string;
  onChange?: (value: any) => void;
  noBorder?: boolean;
  DropdownIndicator?: React.ReactNode;
  separator?: boolean;
  height?: string;
  gap?: string;
}

export const Dropdown: React.FC<Props> = ({
  options,
  className,
  placeholder,
  onChange,
  noBorder = false,
  DropdownIndicator,
  separator = true,
  height,
  gap,
  getOptionLabel = (option: any) => option.label,
  getOptionValue = (option: any) => option.value,

  ...props
}) => {
  const t = useTranslations("trans");

  const [isOpen, setIsOpen] = useState(false);

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

    control: (styles) => ({
      ...styles,
      height: height || "42px", // Use the height prop or default to 42px
      minHeight: height || "42px", // Ensure minHeight matches
      gap: gap || "0.5rem",
    }),

    option: (styles, { isDisabled, isSelected, isFocused }) => {
      let backgroundColor = "white";
      let color = "black";

      if (isFocused || isSelected) {
        backgroundColor = getColor("color-gray-light");
        color = "black";
      }
      return {
        ...styles,
        backgroundColor,
        color,
        cursor: isDisabled ? "not-allowed" : "pointer",
        ":hover": {
          ...styles[":hover"],
          backgroundColor: getColor("color-gray-light"),
        },

        ":active": {
          ...styles[":active"],
          backgroundColor: "white",
        },
      };
    },
    singleValue(base, props) {
      return {
        ...base,
        color: getColor("alert-red"),
      };
    },
  };
  const { Option, SingleValue, MenuList } = components;
  const IconOption = (props: OptionProps) => {
    return (
      <Option {...props} className="!flex gap-2 !items-center justify-between">
        {getOptionLabel(props.data)}
        {props.isSelected && <span className="text-green-500">✓</span>}
      </Option>
    );
  };

  const CustomMenuList = (props: any) => {
    const childrenArray = React.Children.toArray(props.children);

    return (
      <MenuList {...props}>
        {childrenArray.map((child, index) => (
          <React.Fragment key={index}>
            {child}
            {separator &&
              index < childrenArray.length - 1 &&
              index % 2 === 0 && (
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

  const CustomSingleValue: React.FC<SingleValueProps<any>> = (props) => {
    const { data } = props;

    return (
      <SingleValue {...props}>
        <span className="dropdown">
          {data.icon && data.icon}
          {getOptionLabel(data)}
        </span>
      </SingleValue>
    );
  };

  return (
    <div className={cn("cursor-pointer", className)}>
      <ReactSelect
        {...props}
        instanceId="react-select"
        classNamePrefix="dropdown-input"
        className={cn(
          "dropdown-input",
          noBorder && "no_border",
          isOpen && "dropdown-input--open",
          className
        )}
        options={options}
        isSearchable={false}
        components={{
          IndicatorSeparator: () => null,
          DropdownIndicator: () =>
            DropdownIndicator || (
              <span className="rtl:ml-2.5 ltr:mr-2.5">
                <span className="text-gray-500">↓</span>
              </span>
            ),
          Option: IconOption,
          SingleValue: CustomSingleValue,
          MenuList: CustomMenuList,
        }}
        // menuIsOpen={true}
        // isClearable
        styles={colorStyles}
        onChange={onChange}
        placeholder={placeholder || t("common.select")}
        // value={options.find((c) => c.value === field.value)}
        noOptionsMessage={() => t("common.no_options")}
        onMenuOpen={() => setIsOpen(true)}
        onMenuClose={() => setIsOpen(false)}
        menuPlacement="auto"
        menuPosition="fixed"
        getOptionLabel={getOptionLabel}
        getOptionValue={getOptionValue}
      />
    </div>
  );
};
