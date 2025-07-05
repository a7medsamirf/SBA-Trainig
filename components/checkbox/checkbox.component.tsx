import { cn, randomKey } from "@/utils";
import { IconButton } from "../index";
import "./checkbox.scss";
import { ReactNode } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string | ReactNode;
  required?: boolean;
  className?: string;
  labelClassName?: string;
  disabled?: boolean;
  defaultChecked?: boolean;
}

export const Checkbox = ({
  id,
  label,
  required,
  className,
  labelClassName,
  disabled = false,
  defaultChecked = false,
  ...props
}: Props) => {
  const key = randomKey();
  const newId = `${id}-${key}`;

  return (
    <label
      className={cn(
        "checkbox-item",
        disabled && "cursor-not-allowed",
        className
      )}
      htmlFor={newId}
    >
      <IconButton
        color="secondary"
        disabled={disabled}
        disableRipple={disabled}
        // tabIndex={-1}
        // onClick={() => {
        //   if (disabled) return;
        //   const input = document.getElementById(newId) as HTMLInputElement;
        //   input.click();
        // }}
      >
        <input
          type="checkbox"
          id={newId}
          disabled={disabled}
          {...props}
          defaultChecked={defaultChecked}
        />
      </IconButton>
      <span className={cn("checkbox-item-label", labelClassName)}>{label}</span>
    </label>
  );
};
