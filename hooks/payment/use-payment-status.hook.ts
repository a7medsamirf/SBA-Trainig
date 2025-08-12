"use client";

import { getPaymentStatus } from "@/server-actions";
import { CheckEnrollmentAvailable } from "@/server-actions";
import { withCallbacks } from "@/utils";
import { useActionState, useTransition, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { CartDetailResponse } from "@/models";
import { useEnrollment } from "../enrollment/use-enrollment.hook";

export const usePaymentStatus = (
  checkoutId: string,
  paymentMethod: string,
  cart: CartDetailResponse["data"]
) => {
  const hasExecuted = useRef(false);
  const [isPending, startTransition] = useTransition();
  const { enrollmentAsync, enrollmentData } = useEnrollment();

  const paymentStatusSubmit = withCallbacks(getPaymentStatus, {
    onSuccess: async (res) => {
      const course_ids = cart?.carts?.map((cart) => cart.course?.id);
      toast.success(res?.message || "تم جلب حالة الدفع بنجاح");

      startTransition(() => {
        enrollmentAsync({ course_ids });
      });
    },
    onError: (error) => {
      console.log("🚀 ~ usePaymentStatus ~ error:", error);
      toast.error(error?.error?.message || "حدث خطأ أثناء جلب حالة الدفع");
    },
  });

  // @ts-ignore
  const [paymentStatusData, paymentStatusAsync] = useActionState(
    paymentStatusSubmit,
    undefined
  );

  const executePaymentStatus = async () => {
    if (hasExecuted.current) return;
    hasExecuted.current = true;

    const course_ids = cart?.carts?.map((c) => c.course?.id);
    console.log("🔍 Checking enrollment availability for:", course_ids);

    try {
      const check = await CheckEnrollmentAvailable({ course_ids });

      if (!check.succeeded) {
        console.log("⛔ Enrollment check failed:", check.error);
        const errorMessage =
          check.error?.message ||
          check.error?.error?.message ||
          "الكورس غير متاح للتسجيل حالياً";
        toast.error(errorMessage);
        return;
      }

      console.log("✅ Enrollment available, proceeding with payment status...");

      startTransition(() => {
        paymentStatusAsync({
          checkout_id: checkoutId,
          payment_method: paymentMethod,
        });
      });
    } catch (error) {
      console.log("⚠️ Unexpected error during enrollment check:", error);
      toast.error("حدث خطأ غير متوقع أثناء التحقق من إمكانية التسجيل");
    }
  };

  useEffect(() => {
    if (checkoutId && paymentMethod && !hasExecuted.current) {
      executePaymentStatus();
    }
  }, [checkoutId, paymentMethod]);

  return {
    paymentStatusData,
    isPending,
    executePaymentStatus,
  };
};
