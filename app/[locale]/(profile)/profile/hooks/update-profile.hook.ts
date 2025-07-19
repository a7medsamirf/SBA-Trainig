import { updateProfileApi } from "@/server-actions";
import { withCallbacks } from "@/utils";
import { useActionState, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const useUpdateProfile = (user: any, handleCancel: () => void) => {
  const { control, handleSubmit, register } = useForm({
    defaultValues: {
      name: user?.name || "",
      english_name: user?.english_name || "",
      national_id: user?.national_id || "",
      email: user?.email || "",
      phone: user?.phone || "",
      nationality_id: user?.nationality?.id,
      gender: user?.gender?.id,
      age_category_id: user?.age_category?.id,
    },
  });

  const updateProfileSubmit = withCallbacks(updateProfileApi, {
    onSuccess: (res: any) => {
      toast.success("تم تحديث البيانات بنجاح");
      handleCancel();
    },
    onError: (error) => {
      toast.error(error.error?.message || "حدث خطأ أثناء تحديث البيانات");
    },
  });

  const [isPending, startTransition] = useTransition();

  // @ts-ignore
  const [, updateProfileAsync] = useActionState(updateProfileSubmit, undefined);

  const onSubmit = async (data: any) => {
    startTransition(() => {
      // @ts-ignore
      updateProfileAsync(data);
    });
  };

  return { control, handleSubmit, register, onSubmit, isPending };
};
