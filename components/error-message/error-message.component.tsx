import "./error-message.scss";

export const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <span className="error-message">
      <span className="text-red-500">✗</span>
      {message}
    </span>
  );
};
