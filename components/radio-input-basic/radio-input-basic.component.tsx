import { cn, randomKey } from "@/utils";
import styles from "./radio-input-basic.module.scss";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  className?: string;
  disabled?: boolean;
  defaultValue?: string;
  checked?: boolean;
  ref?: React.Ref<HTMLInputElement | null>;
}

export const RadioInputBasic = ({
  id,
  label,
  checked,
  className,
  defaultValue,
  disabled,
  ref,
  ...props
}: Props) => {
  const key = randomKey();
  const newId = `${id}-${key}`;

  return (
    <label
      htmlFor={newId}
      className={cn(
        styles.radio_item,
        disabled && "cursor-not-allowed",
        className
      )}
    >
      <input
        type="radio"
        id={newId}
        checked={checked}
        {...props}
        ref={ref}
        disabled={disabled}
      />

      <span className={styles.radio_item_label}>{label}</span>
    </label>
  );
};
