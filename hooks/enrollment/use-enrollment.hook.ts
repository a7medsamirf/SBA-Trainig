import { enrollment } from "@/server-actions/enrollment/enrollment.action";
import { withCallbacks } from "@/utils";
import { useActionState } from "react";
import toast from "react-hot-toast";

export const useEnrollment = () => {
  const enrollmentSubmit = withCallbacks(enrollment, {
    onSuccess: (res) => {
      console.log("🚀 ~ useEnrollment ~ res:", res);
      toast.success(res?.message || "تم التسجيل بنجاح");
    },
    onError: (error) => {
      console.log("🚀 ~ useEnrollment ~ error:", error);
      toast.error(error?.error?.message || "حدث خطأ أثناء التسجيل");
    },
  });

  const [enrollmentData, enrollmentAsync] = useActionState(
    enrollmentSubmit,
    undefined
  );

  return {
    enrollmentData,
    enrollmentAsync,
  };
};
