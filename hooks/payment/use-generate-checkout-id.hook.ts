"use client";

import { generateCheckoutId } from "@/server-actions/payment/payment.action";
import { withCallbacks } from "@/utils";
import { useActionState, useState, useTransition } from "react";
import toast from "react-hot-toast";

export const useGenerateCheckoutId = () => {
  const [checkoutId, setCheckoutId] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false); 

  const generateCheckoutSubmit = withCallbacks(generateCheckoutId, {
    onSuccess: (res) => {
      setIsSuccess(true);
      setCheckoutId(res?.data?.checkout_id);
      toast.success(res?.message);
    },
    onError: (error) => {
      setIsSuccess(false);
      toast.error(error.error.message);
    },
  });

  // @ts-ignore
  const [, generateCheckoutAsync] = useActionState(
    generateCheckoutSubmit,
    undefined
  );

  const [isPending, startTransition] = useTransition();

  const onSubmit = async (data: any) => {
    setIsSuccess(false);
    setCheckoutId("");
    startTransition(() => {
      generateCheckoutAsync(data);
    });
  };

  return { onSubmit, isPending, checkoutId, isSuccess };
};
