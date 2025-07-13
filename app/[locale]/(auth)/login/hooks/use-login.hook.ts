import { login } from "@/server-actions";
import { withCallbacks } from "@/utils";
import { useActionState, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const useLogin = (callbackUrl: string = "/") => {
  const { control, handleSubmit, register } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginSubmit = withCallbacks(login, {
    onSuccess: (res: any) => {
      if (res?.api_token) {
        localStorage.setItem("token", res.api_token);
        /*   console.log("✅ تم حفظ التوكن:", res.api_token); */
      }

      toast.success("تم تسجيل الدخول بنجاح");
      // router.push(callbackUrl); // ✅ التحويل بعد النجاح
      // window.location.reload();
      window.location.href = callbackUrl;
    },
    onError: (error) => {
      toast.error(error.error?.message || "حدث خطأ أثناء تسجيل الدخول");
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

  return { control, handleSubmit, register, onSubmit, isPending };
};
