import { registerApi } from "@/server-actions";
import { withCallbacks } from "@/utils";
import { useActionState, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "@/i18n/routing";

export const useCompleteProfile = (
  closeDialog: (() => void) | undefined,
  onConfirm: () => void,
  slug?: string,
  firstStepData?: any 
) => {
  const router = useRouter();
  
  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      ...firstStepData, 
      language_level: "",
      educational_experience: "",
      educational_degree: "",
    },
  });

  const completeProfileSubmit = withCallbacks(registerApi, {
    onSuccess: (result) => {
      result.message && toast.success(result.message);
   /*    onConfirm?.(); */
      closeDialog?.();
      router.push("/otp");
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
    //  دمج البيانات من الفورم الأول مع البيانات الجديدة
    const completeData = {
      ...firstStepData, // البيانات من الفورم الأول
      ...data, // البيانات الجديدة من الفورم الثاني
      slug, // إضافة slug
    };
    
    startTransition(() => {
      // @ts-ignore
      completeProfileAction(completeData);
    });
  };

  // 👈 إضافة دالة لحفظ البيانات عند التخطي
  const handleSkip = async () => {
    const skipData = {
      ...firstStepData, // البيانات من الفورم الأول
      slug, // إضافة slug
    };
    
    startTransition(() => {
      // @ts-ignore
      completeProfileAction(skipData);
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
    handleSkip, //  إضافة handleSkip
  };
};