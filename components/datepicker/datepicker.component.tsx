"use client";

import DatePicker, { DatePickerProps, registerLocale } from "react-datepicker";
import { ar } from "date-fns/locale/ar";
registerLocale("ar", ar);
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";

import "./datepicker.scss";

import { useRef, useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { cn, getColor } from "@/utils";

interface Props extends Omit<DatePickerProps, "placeholderText"> {
  label?: string;
  className?: string;
  minDate?: Date;
  maxDate?: Date;
  placeholder?: string;
  hasDefault?: boolean;
  calendarColor?: string;
  defaultValue?: any;
}

export const ReactDatePicker: React.FC<Props> = ({
  label = "",
  className = "",
  wrapperClassName = "",
  minDate,
  maxDate,
  placeholder = "",
  hasDefault = false,
  dateFormat = "dd-MM-yyyy",
  calendarColor = "color-gray-medium",
  defaultValue = undefined,
  ...props
}) => {
  const locale = useLocale();
  const datePickerRef = useRef<any>(null);

  const [selectedYear, setSelectedYear] = useState<number>(
    props?.selected?.getFullYear() ||
      defaultValue?.getFullYear() ||
      (hasDefault ? maxDate?.getFullYear() : undefined) ||
      new Date().getFullYear()
  );

  const [selectedMonth, setSelectedMonth] = useState<number>(
    props?.selected?.getMonth() ||
      defaultValue?.getMonth() ||
      (hasDefault ? maxDate?.getMonth() : undefined) ||
      new Date().getMonth()
  );

  // Calculate year constraints
  const minYear = minDate?.getFullYear() || 1900;
  const maxYear = maxDate?.getFullYear() || 2100;

  // Generate fixed year options from 1900 to 2100, limited by minDate/maxDate
  const yearOptions = Array.from(
    { length: Math.min(2100, maxYear) - Math.max(1900, minYear) + 1 },
    (_, i) => {
      const year = Math.max(1900, minYear) + i;
      return {
        value: year,
        label: year.toString(),
      };
    }
  );

  // Generate month options
  const getMonthOptions = (currentYear: number) => {
    return Array.from({ length: 12 }, (_, i) => {
      const isDisabled = (() => {
        if (
          maxDate &&
          currentYear === maxDate.getFullYear() &&
          i > maxDate.getMonth()
        ) {
          return true;
        }
        if (
          minDate &&
          currentYear === minDate.getFullYear() &&
          i < minDate.getMonth()
        ) {
          return true;
        }
        return false;
      })();

      return {
        value: i,
        label: new Date(0, i).toLocaleDateString(locale, {
          month: "long",
        }),
        isDisabled,
      };
    });
  };

  // Normalize maxDate to end of day to ensure the entire day is selectable
  const normalizedMaxDate = maxDate
    ? new Date(
        maxDate.getFullYear(),
        maxDate.getMonth(),
        maxDate.getDate(),
        23,
        59,
        59,
        999
      )
    : undefined;

  // Normalize minDate to start of day
  const normalizedMinDate = minDate
    ? new Date(
        minDate.getFullYear(),
        minDate.getMonth(),
        minDate.getDate(),
        0,
        0,
        0,
        0
      )
    : undefined;

  // Update selectedYear when external date changes
  useEffect(() => {
    const externalYear = props.selected?.getFullYear();
    if (externalYear && externalYear !== selectedYear) {
      setSelectedYear(externalYear);
    }
  }, [props.selected]);

  // Update selectedMonth when external date changes
  useEffect(() => {
    const externalMonth = props.selected?.getMonth();
    if (externalMonth !== undefined && externalMonth !== selectedMonth) {
      setSelectedMonth(externalMonth);
    }
  }, [props.selected]);

  // Initialize with maxDate when no other date is selected
  useEffect(() => {
    // Only auto-initialize when hasDefault is explicitly set to true
    if (!props.selected && !defaultValue && maxDate && hasDefault) {
      const initialDate = new Date(maxDate);
      if (props.onChange) {
        props.onChange(initialDate as any, {} as any);
      }
    }
  }, [maxDate, props.selected, defaultValue, hasDefault]);

  // Custom styles for react-select
  const selectStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      minHeight: "40px",
      border: "2px solid #e5e7eb",
      borderRadius: "8px",
      padding: "2px 8px",
      fontSize: "14px",
      fontWeight: "600",
      color: "#374151",
      cursor: "pointer",
      background: "linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)",
      boxShadow: state.isFocused
        ? "0 0 0 3px rgba(59, 130, 246, 0.1)"
        : "0 1px 3px rgba(0, 0, 0, 0.1)",
      "&:hover": {
        borderColor: "#d1d5db",
      },
    }),
    menu: (provided: any) => ({
      ...provided,
      borderRadius: "8px",
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
      border: "1px solid #e5e7eb",
      maxHeight: "200px",
      zIndex: 9999,
    }),
    menuList: (provided: any) => ({
      ...provided,
      maxHeight: "200px",
      padding: "4px",
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      padding: "12px 16px",
      fontSize: "14px",
      fontWeight: "500",
      borderRadius: "6px",
      margin: "2px 0",
      cursor: state.isDisabled ? "not-allowed" : "pointer",
      backgroundColor: state.isSelected
        ? "#3b82f6"
        : state.isFocused
        ? "#f3f4f6"
        : "transparent",
      color: state.isSelected
        ? "#ffffff"
        : state.isDisabled
        ? "#9ca3af"
        : "#374151",
      "&:hover": {
        backgroundColor: state.isSelected ? "#3b82f6" : "#f3f4f6",
      },
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: "#374151",
      fontWeight: "600",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      color: "#6b7280",
      padding: "0 8px",
      "&:hover": {
        color: "#374151",
      },
    }),
  };

  return (
    <div className={cn("react-datepicker__container", className)}>
      {label && <label className="react-datepicker__label">{label}</label>}
      <div className={cn("react-datepicker__wrapper", wrapperClassName)}>
        <DatePicker
          {...(props as any)}
          className="w-full outline-none"
          locale={locale}
          ref={datePickerRef}
          minDate={normalizedMinDate}
          maxDate={normalizedMaxDate}
          placeholderText={placeholder}
          dateFormat={dateFormat}
          form="form"
          showYearDropdown
          showMonthDropdown
          dropdownMode="select"
          scrollableYearDropdown={false}
          scrollableMonthYearDropdown={false}
          renderCustomHeader={({
            date,
            changeYear,
            changeMonth,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => {
            const currentYear = date.getFullYear();
            const currentMonth = date.getMonth();

            return (
              <div className="react-datepicker__header__dropdown">
                <button
                  type="button"
                  onClick={decreaseMonth}
                  disabled={prevMonthButtonDisabled}
                  className="react-datepicker__navigation react-datepicker__navigation--previous"
                >
                  <span className="ltr:rotate-90 rtl:-rotate-90">←</span>
                </button>

                <div className="flex items-center gap-1">
                  {/* Month Select */}
                  <div className="react-datepicker__month-selector">
                    <Select
                      value={getMonthOptions(currentYear).find(
                        (option) => option.value === currentMonth
                      )}
                      options={getMonthOptions(currentYear)}
                      onChange={(selectedOption) => {
                        if (selectedOption && !selectedOption.isDisabled) {
                          changeMonth(selectedOption.value);
                          setSelectedMonth(selectedOption.value);
                        }
                      }}
                      styles={selectStyles}
                      isSearchable={false}
                      placeholder="Month"
                      className="react-datepicker__month-select"
                      classNamePrefix="react-select"
                      menuPlacement="auto"
                      menuPosition="absolute"
                      menuShouldScrollIntoView={true}
                      getOptionLabel={(option) => option.label}
                      getOptionValue={(option: any) => option.value}
                    />
                  </div>

                  {/* Year Select */}
                  <div className="react-datepicker__year-selector">
                    <Select
                      value={yearOptions.find(
                        (option) => option.value === currentYear
                      )}
                      options={yearOptions}
                      onChange={(selectedOption) => {
                        if (selectedOption) {
                          changeYear(selectedOption.value);
                          setSelectedYear(selectedOption.value);
                        }
                      }}
                      styles={selectStyles}
                      isSearchable={false}
                      placeholder="Year"
                      className="react-datepicker__year-select"
                      classNamePrefix="react-select"
                      menuPlacement="auto"
                      menuPosition="absolute"
                      menuShouldScrollIntoView={true}
                      getOptionLabel={(option) => option.label}
                      getOptionValue={(option: any) => option.value}
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={increaseMonth}
                  disabled={nextMonthButtonDisabled}
                  className="react-datepicker__navigation react-datepicker__navigation--next"
                >
                  <span className="ltr:-rotate-90 rtl:rotate-90">→</span>
                </button>
              </div>
            );
          }}
        />

        <span
          onClick={() => {
            if (datePickerRef.current) {
              datePickerRef.current.setOpen(
                !datePickerRef.current.isCalendarOpen()
              );
            }
          }}
          className="react-datepicker__icon"
        >
          <span className="text-gray-500">📅</span>
        </span>
      </div>
    </div>
  );
};
