import React from "react";
import { newPassword } from "@/server-actions";
import { withCallbacks } from "@/utils";
import { useActionState, useTransition } from "react";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const useChangePassword = (user: any, onHide: () => void) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // New password submission
  const [isPendingPassword, startTransitionPassword] = useTransition();

  const changePasswordSubmit = withCallbacks(newPassword, {
    onSuccess: (result) => {
      result.message && toast.success(result.message);
      onHide();
      reset({
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
      });
    },
    onError: (error) => {
      error.error?.message && toast.error(error.error?.message);
    },
  });

  // @ts-ignore
  const [, changePasswordAction] = useActionState(
    changePasswordSubmit,
    undefined
  );

  const changePasswordHandler = (
    data: FieldValues,
    event?: React.BaseSyntheticEvent
  ) => {
    // Prevent form submission from bubbling up to parent form
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    startTransitionPassword(() => {
      // @ts-ignore
      changePasswordAction(data);
    });
  };

  return {
    register,
    handleSubmit,
    changePasswordHandler,
    isPendingPassword,
    errors,
  };
};

export default useChangePassword;


