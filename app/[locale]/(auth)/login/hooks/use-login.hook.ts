import { login } from "@/server-actions";
import { withCallbacks } from "@/utils";
import { useActionState, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth.context";
import { useRouter } from "@/i18n/routing";

export const useLogin = (callbackUrl: string = "/") => {
  const { setData } = useAuth();

  const router = useRouter();

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginSubmit = withCallbacks(login, {
    onSuccess: (res: any) => {
      console.log("🚀 ~ useLogin ~ res:", res);
      toast.success("تم تسجيل الدخول بنجاح");
      window.location.href = callbackUrl;
    },
    onError: (error: any) => {
      console.log("🚀 ~ useLogin ~ error:", error);
      if (error?.error?.verified_case) {
        toast.error(
          error?.error?.error?.message || "حدث خطأ أثناء تسجيل الدخول من فضلك قم بتفعيل البريد الالكتروني"
        );

        const email = getValues("email");
        const password = getValues("password");
        setData({
          email,
          password,
          verified_case: error?.error?.verified_case,
        });
        router.push("/otp");
      } else {
        toast.error(
          error?.error?.error?.message || "حدث خطأ أثناء تسجيل الدخول"
        );
      }
    },
  });

  const [isPending, startTransition] = useTransition();

  // @ts-ignore
  const [, loginAsync] = useActionState(loginSubmit, undefined);

  const onSubmit = async (data: any) => {
    startTransition(() => {
      // @ts-ignore
      loginAsync(data);
    });
  };

  return {
    control,
    handleSubmit,
    register,
    onSubmit,
    isPending,
    errors,
    loginAsync,
  };
};
