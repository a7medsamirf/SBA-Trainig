import { DialogProvider } from "@/context";
import { Dialogs } from "../index";

export const DialogLayoutProvider = async ({
  children,
  ...props
}: {
  children: React.ReactNode;
}) => {
  const otherProps = {
    ...props,
  };

  return (
    <DialogProvider>
      <Dialogs {...otherProps} />
      {children}
    </DialogProvider>
  );
};
