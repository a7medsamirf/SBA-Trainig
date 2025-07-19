import { useRouter } from "@/i18n/routing";
import { registerApi } from "@/server-actions";
import { withCallbacks } from "@/utils";
import { useActionState, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth.context";

export const useRegister = () => {
  const { setData, data } = useAuth();

  const { control, handleSubmit, register, watch } = useForm({
    defaultValues: {
      ...data,
    },
  });

  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setshowPasswordConfirmation] =
    useState(false);

  const [agreeTerms, agreePrivacy] = watch(["agreeTerms", "agreePrivacy"]);

  const [isPending, startTransition] = useTransition();

  const registerSubmit = withCallbacks(registerApi, {
    onSuccess: () => {
      toast.success("تم التسجيل بنجاح");
      router.push("/otp");
    },
    onError: (error) => {
      toast.error(error.error.message);
    },
  });

  const [, registerAsync] = useActionState(registerSubmit, undefined);

  const onSubmit = async (data: any) => {
    setData(data);

    startTransition(() => {
      registerAsync(data);
    });
  };

  return {
    control,
    handleSubmit,
    register,
    watch,
    showPassword,
    setShowPassword,
    isPending,
    onSubmit,
    agreeTerms,
    agreePrivacy,
    showPasswordConfirmation,
    setshowPasswordConfirmation,
  };
};
