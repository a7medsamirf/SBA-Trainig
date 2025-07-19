import { resendOtp } from "@/server-actions";
import { withCallbacks } from "@/utils";
import { useActionState, useTransition } from "react";
import toast from "react-hot-toast";

export const useResendOtp = (resetTimer: () => void) => {
  const resendOtpSubmit = withCallbacks(resendOtp, {
    onSuccess: (result) => {
      result.message && toast.success(result.message);
      resetTimer();
    },
    onError: (error) => {
      error.error?.message && toast.error(error.error?.message);
    },
  });

  const [isPending, startTransition] = useTransition();

  const [_, resendOtpAction] = useActionState(
    // @ts-ignore
    resendOtpSubmit,
    undefined
  );

  const resendOtpHandler = (email: string) => {
    startTransition(() => {
      // @ts-ignore
      resendOtpAction({ email });
    });
  };

  return {
    resendOtpHandler,
    isPending,
  };
};
