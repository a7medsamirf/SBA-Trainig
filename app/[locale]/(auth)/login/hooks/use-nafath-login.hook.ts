import { nafathLogin, sendNafathRequest } from "@/server-actions";
import { withCallbacks } from "@/utils";
import { useLocale } from "next-intl";
import { useActionState, useState, useTransition } from "react";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const useNafathLogin = () => {
  const lang = useLocale();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const [isVerifying, setIsVerifying] = useState(false);

  const [nafathData, setNafathData] = useState<any>(null);

  const [isPending, startTransition] = useTransition();

  const nafathSubmit = withCallbacks(sendNafathRequest, {
    onSuccess: (data) => {
      toast.success(data?.message || "تم إرسال الطلب بنجاح");
      setNafathData((prev: any) => ({ ...prev, ...data.data }));
      setIsVerifying(true);

      const nafathLoginData = {
        nafath_id: data?.nafath_id,
        trans_id: data?.data?.transId,
        random: data?.data?.random,
      };

      nafathLogin(nafathLoginData).then((res) => {
        if (res?.succeeded) {
          toast.success(res?.message || "تم تسجيل الدخول بنجاح");
          //   router.push("/");
          //   window.location.reload();
          window.location.href = `/${lang}`;
        } else {
          toast.error(res?.error?.message || "فشل تسجيل الدخول");
          setIsVerifying(false);
        }
      });
    },
    onError(result) {
      toast.error(result?.error?.message || "فشل إرسال الطلب");
      setIsVerifying(false);
    },
  });

  // @ts-ignore
  const [, nafathAction] = useActionState(nafathSubmit, undefined);

  const nafathHandler = (data: FieldValues) => {
    setNafathData((prev: any) => ({ ...prev, ...data }));
    startTransition(() => {
      // @ts-ignore
      nafathAction(data);
    });
  };

  return {
    nafathHandler,
    isPending,
    register,
    handleSubmit,
    setIsVerifying,
    isVerifying,
    errors,
    nafathData,
  };
};
