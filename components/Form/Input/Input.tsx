import { Path, FieldValues, UseFormRegister } from "react-hook-form";
import { Form } from "react-bootstrap";

type InputProps<TFieldValue extends FieldValues> = {
  label: string;
  name: Path<TFieldValue>;
  placeholder?: string;
  type?: string;
  register: UseFormRegister<TFieldValue>;
  error?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  formText?: string;
  success?: string;
  disabled?: boolean;
};

const Input = <TFieldValue extends FieldValues>({
  label,
  name,
  placeholder,
  type = "text",
  register,
  error,
  onBlur,
  formText,
  success,
  disabled,
}: InputProps<TFieldValue>) => {
  const onblurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    if (onBlur) {
      onBlur(e);
      register(name).onBlur(e);
    } else {
      register(name).onBlur(e);
    }
  };

  return (
    <div className="form-floating">
      <Form.Control
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name)}
        onBlur={onblurHandler}
        isInvalid={!!error}
        isValid={!!success}
        disabled={disabled}
      />
      <label htmlFor={name}>{label}</label>

      {/* عرض رسالة الخطأ تحت الـ form-floating */}
      {(error || success || formText) && (
        <div className="mt-1">
          {error && <div className="text-danger small">{error}</div>}
          {success && <div className="text-success small">{success}</div>}
          {formText && <Form.Text muted>{formText}</Form.Text>}
        </div>
      )}
    </div>
  );
};

export default Input;
