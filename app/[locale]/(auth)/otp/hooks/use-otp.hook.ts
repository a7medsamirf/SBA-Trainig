import { useRouter } from "@/i18n/routing";
import { verifyOTP } from "@/server-actions";
import { withCallbacks } from "@/utils";
import { useActionState, useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth.context";

export const useOtp = () => {
  const { control, handleSubmit, setValue, trigger } = useForm({
    defaultValues: {
      otp: "",
    },
  });

  const { data: userData } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (!userData?.email) {
      router.push("/register");
    }
  }, [userData]);

  const otpSubmit = withCallbacks(verifyOTP, {
    onSuccess: () => {
      toast.success("تم التسجيل بنجاح");
      router.push("/login");
    },
    onError: (error) => {
      toast.error(error.error.message);
    },
  });

  const [isPending, startTransition] = useTransition();

  // @ts-ignore
  const [, otpAsync] = useActionState(otpSubmit, undefined);

  const onSubmit = async (data: any) => {
    data.identifier = userData.email;

    startTransition(() => {
      // @ts-ignore
      otpAsync(data);
    });
  };

  return { control, handleSubmit, setValue, trigger, onSubmit, isPending };
};
