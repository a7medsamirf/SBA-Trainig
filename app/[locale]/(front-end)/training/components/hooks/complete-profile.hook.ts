import { updateProfile } from "@/server-actions";
import { withCallbacks } from "@/utils";
import { useActionState, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const useCompleteProfile = (
  closeDialog: (() => void) | undefined,
  onConfirm: () => void,
  slug?: string
) => {
  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
  });

  const completeProfileSubmit = withCallbacks(updateProfile, {
    onSuccess: (result) => {
      result.message && toast.success(result.message);
      onConfirm?.();
      closeDialog?.();
    },
    onError: (error) => {
      error.error?.message && toast.error(error.error?.message);
    },
  });

  const [isPending, startTransition] = useTransition();

  const [_, completeProfileAction] = useActionState(
    // @ts-ignore
    completeProfileSubmit,
    undefined
  );

  const completeProfileHandler = (data: any) => {
    data.slug = slug;
    startTransition(() => {
      // @ts-ignore
      completeProfileAction(data);
    });
  };

  return {
    control,
    register,
    completeProfileHandler,
    handleSubmit,
    isPending,
    reset,
    isValid,
  };
};
