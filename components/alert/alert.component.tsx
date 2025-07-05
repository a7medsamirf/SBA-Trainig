import styles from "./alert.module.scss";
import { cn } from "@/utils";
interface Props {
  type?: "error" | "warning" | "success";
  message: string;
  className?: string;
}

export const Alert: React.FC<Props> = ({
  type = "error",
  message,
  className,
}) => {
  return (
    <>
      <div className={cn(styles.alert, styles[`alert--${type}`], className)}>
        {type === "success" ? (
          <span className="text-green-500">✓</span>
        ) : type === "error" ? (
          <span className="text-red-500">✗</span>
        ) : (
          <span className="text-yellow-500">⚠</span>
        )}
        <p
          className={cn(
            styles.alert__message,
            type === "success" && styles["alert__message-success"]
          )}
        >
          {message}
        </p>
      </div>
    </>
  );
};
