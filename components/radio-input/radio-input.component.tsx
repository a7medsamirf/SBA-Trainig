"use client";

import { cn, randomKey } from "@/utils";
import { IconButton } from "../index";
import "./radio-input.scss";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  className?: string;
  disabled?: boolean;
  defaultValue?: string;
  checked?: boolean;
  showEmpty?: boolean;
  ref?: React.Ref<HTMLInputElement | null>;
  showRadioEmpty?: boolean;
  notClickable?: boolean;
}

export const RadioInput = ({
  id,
  label,
  checked,
  className,
  defaultValue,
  disabled,
  showEmpty = false,
  showRadioEmpty = true,
  notClickable = false,
  ref,
  ...props
}: Props) => {
  const key = randomKey();
  const newId = `${id}-${key}`;

  return (
    <label
      className={cn("radio-item", disabled && "cursor-not-allowed", className)}
      htmlFor={newId}
    >
      <IconButton
        color="alert-green"
        disableRipple={disabled}
        disabled={disabled}
        onClick={(e) => {
          if (disabled || notClickable) {
            e.preventDefault();
            return;
          }
          const input = document.getElementById(newId) as HTMLInputElement;
          input.click();
        }}
        tabIndex={-1}
        className={checked ? "!flex" : showRadioEmpty ? "" : "!hidden"}
      >
        <input
          type="radio"
          id={newId}
          checked={checked}
          {...props}
          ref={ref}
          disabled={disabled}
          className={cn(showEmpty && "radio-item-empty")}
        />
      </IconButton>
      <span className="radio-item-label">{label}</span>
    </label>
  );
};
