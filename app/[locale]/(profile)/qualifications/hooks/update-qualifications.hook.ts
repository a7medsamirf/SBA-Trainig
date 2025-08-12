"use client";

import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { toast } from "react-hot-toast";
import { updateQualificationsApi } from "@/server-actions";

export interface QualificationsFormData {
  language_level?: number;
  educational_experience?: string;
  educational_degree?: number;
}

export const useUpdateQualifications = (user: any) => {
  const [isSubmitting, startTransition] = useTransition();
  const [isEdit, setIsEdit] = useState(false);

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<QualificationsFormData>({
    defaultValues: {
      language_level: user?.language_level?.id,
      educational_experience: user?.educational_experience || "",
      educational_degree: user?.educational_degree?.id,
    },
  });

  const onSubmit = (data: QualificationsFormData) => {
    startTransition(() => {
      updateQualificationsApi(undefined, data)
        .then((res) => {
          if (res?.succeeded || res?.status === 200) {
            toast.success("✅ تم تحديث المؤهلات بنجاح");
            setIsEdit(false);

            reset({
              language_level: res.data.language_level?.id,
              educational_experience: res.data.educational_experience,
              educational_degree: res.data.educational_degree?.id,
            });
          } else {
            toast.error(res?.message || "❌ حدث خطأ أثناء التحديث");
          }
        })
        .catch(() => {
          toast.error("❌ حدث خطأ أثناء الاتصال بالسيرفر");
        });
    });
  };

  const handleCancel = () => {
    setIsEdit(false);
  };

  return {
    control,
    register,
    handleSubmit,
    onSubmit,
    handleCancel,
    isEdit,
    setIsEdit,
    isSubmitting,
    errors,
  };
};
