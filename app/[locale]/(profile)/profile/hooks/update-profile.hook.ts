import { updateProfileApi } from "@/server-actions";
import { withCallbacks } from "@/utils";
import { useActionState, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation"; 
import { useSession } from "next-auth/react"; 


export const useUpdateProfile = (user: any, handleCancel: () => void) => {
  // State للصورة المختارة
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const router = useRouter();
  const { update } = useSession(); 
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: user?.name || "",
      english_name: user?.english_name || "",
      national_id: user?.national_id || "",
      email: user?.email || "",
      phone: user?.phone || "",
      dial_code: user?.dial_code || "",
      nationality_id: user?.nationality?.id,
      gender: user?.gender?.id,
      age_category_id: user?.age_category?.id,
    },
  });

  const updateProfileSubmit = withCallbacks(updateProfileApi, {
    onSuccess: (res: any) => {
      toast.success("تم تحديث البيانات بنجاح");
      router.refresh();
      
        // 👈 أضف هذا الجزء لتحديث الـ session
        update({
          user: {
            ...user,
            avatar: res.data.avatar, // تأكد أن res.data.avatar يحتوي على الرابط الجديد للصورة
          },
        });

      // إعادة تعيين الصورة المختارة
      setSelectedFile(null);
      
      // تحديث الـ form بالبيانات الجديدة إذا كانت متوفرة
      if (res.data) {
        reset({
          name: res.data.name || "",
          english_name: res.data.english_name || "",
          national_id: res.data.national_id || "",
          email: res.data.email || "",
          phone: res.data.phone || "",
          dial_code: res.data.dial_code || "",
          nationality_id: res.data.nationality?.id,
          gender: res.data.gender?.id,
          age_category_id: res.data.age_category?.id,
        });
      }
      
      handleCancel();
    },
    onError: (error) => {
      console.error("Update profile error:", error);
      
      // معالجة رسائل الخطأ المختلفة
      let errorMessage = "حدث خطأ أثناء تحديث البيانات";
      
      if (error.error?.message) {
        errorMessage = error.error.message;
      } else if (error.error?.errors) {
        // في حالة وجود أخطاء تحقق متعددة
        const firstError = Object.values(error.error.errors)[0];
        if (Array.isArray(firstError) && firstError.length > 0) {
          errorMessage = firstError[0];
        }
      }
      
      toast.error(errorMessage);
    },
  });

  const [isPending, startTransition] = useTransition();

  // @ts-ignore
  const [, updateProfileAsync] = useActionState(updateProfileSubmit, undefined);

  const onSubmit = async (data: any) => {
    startTransition(() => {
      // إنشاء FormData لإرسال البيانات مع الصورة
      const formData = new FormData();
      
      // إضافة البيانات العادية
      Object.keys(data).forEach(key => {
        const value = data[key];
        if (value !== null && value !== undefined && value !== '') {
          formData.append(key, value.toString());
        }
      });
      
      // إضافة الصورة إذا تم اختيارها
      if (selectedFile) {
        formData.append('avatar', selectedFile);
      }
      
      // طباعة البيانات للتأكد (يمكن حذفها في الإنتاج)
      console.log('Form data being sent:');
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }
      
      // @ts-ignore
      updateProfileAsync(formData);
    });
  };

  // معالج إلغاء التعديل
  const handleCancelEdit = () => {
    // إعادة تعيين الصورة المختارة
    setSelectedFile(null);
    
    // إعادة تعيين الـ form للقيم الأصلية
    reset({
      name: user?.name || "",
      english_name: user?.english_name || "",
      national_id: user?.national_id || "",
      email: user?.email || "",
      phone: user?.phone || "",
      dial_code: user?.dial_code || "",
      nationality_id: user?.nationality?.id,
      gender: user?.gender?.id,
      age_category_id: user?.age_category?.id,
    });
    
    handleCancel();
  };

  return { 
    control, 
    handleSubmit, 
    register, 
    onSubmit, 
    isPending, 
    errors,
    selectedFile,
    setSelectedFile,
    handleCancelEdit,
    reset
  };
};