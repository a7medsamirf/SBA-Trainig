import { HTMLProps, memo } from "react";
import "./button.scss";
import { Spinner } from "../index";
import { cn } from "@/utils";

type ButtonColor =
  | "secondary"
  | "primary"
  | "third"
  | "white"
  | "orange"
  | "red"
  | "blue"
  | "green"
  | "gray"
  | "nafath";

interface Props extends HTMLProps<HTMLButtonElement> {
  type?: "button" | "submit" | "reset" | undefined;
  outline?: boolean;
  variant?: ButtonColor;
  color?: ButtonColor;
  className?: string;
  isLoading?: boolean;
  disabled?: boolean;
  isBlock?: boolean;
}

export const Button: React.FC<Props> = memo(
  ({
    type = "button",
    variant = "secondary",
    color,
    outline,
    className,
    isLoading,
    disabled,
    children,
    ...props
  }) => {
    return (
      <button
        {...props}
        className={cn(
          `button button-${variant}${outline ? "-outline" : ""}`,
          color && `button-color-${color}`,
          className
        )}
        type={type}
        disabled={isLoading || disabled}
      >
        {isLoading && <Spinner size={20} stroke={2} color="white" />}
        {children}
      </button>
    );
  }
);
