import "./spinner.scss";

export const Spinner = ({
  size = 24,
  stroke = 2,
  color = "white",
}: {
  size?: number;
  stroke?: number;
  color?:
    | "secondary"
    | "primary"
    | "third"
    | "white"
    | "orange"
    | "red"
    | "blue"
    | "green"
    | "gray";
}) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderWidth: stroke,
      }}
      className={`spinner-${color} rounded-full animate-spin`}
    />
  );
};
