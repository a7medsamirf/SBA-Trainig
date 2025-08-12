"use client";

import { HyperPay } from "@/components";
import { useGenerateCheckoutId } from "@/hooks/payment/use-generate-checkout-id.hook";
import { CheckEnrollmentAvailable } from "@/server-actions"; 

import { Link } from "@/i18n/routing";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import Select from "react-select";
import { PaymentStatus } from "./payment-status.component";
import { CartDetailResponse } from "@/models";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

interface PaymentOption {
  label: string;
  value: string;
}

const hyperpayBrandsMap: Record<string, string> = {
  visa: "VISA",
  mastercard: "MASTER",
  mada: "MADA",
};

const paymentMethods: PaymentOption[] = [
  { label: "Visa", value: "visa" },
  { label: "Mastercard", value: "mastercard" },
  { label: "Mada", value: "mada" },
];

export const PaymentBtn = ({
  cartData,
}: {
  cartData: CartDetailResponse["data"];
}) => {
  const t = useTranslations("trans.cart");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [showPaymentMethod, setShowPaymentMethod] = useState<boolean>(false);
  const [isButtonClicked, setIsButtonClicked] = useState<boolean>(false);
  const [isCheckingEnrollment, setIsCheckingEnrollment] = useState<boolean>(false);
  const [showEnrollmentError, setShowEnrollmentError] = useState(false);

  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const currentPaymentMethod = searchParams.get("paymentMethod");

  const { onSubmit, isPending, checkoutId, isSuccess } =
    useGenerateCheckoutId();

  const handlePaymentMethod = async (option: PaymentOption | null) => {
    if (option) {
      setPaymentMethod(option.value);
      setShowPaymentMethod(false);

      await onSubmit({
        amount: cartData?.total_price,
        payment_method: option.value,
      });
    }
  };

const handleShowPaymentMethod = async () => {
  setIsCheckingEnrollment(true);

  try {
    // استخراج course_ids من cartData
    const courseIds = cartData?.carts?.map((item) => item.course.id) ?? [];

    if (courseIds.length === 0) {
      toast.error(t("course-data-error"));
      setIsCheckingEnrollment(false);
      return;
    }

    const res = await CheckEnrollmentAvailable({
      course_ids: courseIds,
    });

    const allAvailable = Array.isArray(res?.data)
      ? res.data.every((course: any) => course.is_enrollment_available)
      : false;

    if (!res?.succeeded || !allAvailable) {
      toast.error(t("enrollment-error"));
      setShowEnrollmentError(true);
      setIsCheckingEnrollment(false);
      return;
    }

    setShowEnrollmentError(false);
    setIsCheckingEnrollment(false);
    setIsButtonClicked(true);
    setShowPaymentMethod(true);
  } catch (error) {
    toast.error(t("checking-error"));
    setIsCheckingEnrollment(false);
  }
};


  return (
    <div className="flex flex-col gap-2">
      <div className="mt-4 mb-4 d-flex justify-content-between flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Link className="px-5 btn btn-cart btn-outline-custom" href="/training">
            {t("continue-browsing")}
          </Link>
          <div>
          {cartData?.carts?.length > 0 && (
            <div className="gap-2 d-flex align-items-center justify-content-end mb-3">
              <button
                className="px-5 btn btn-cart btn-primary btn-custom-primary"
                onClick={handleShowPaymentMethod}
                disabled={isPending || isCheckingEnrollment}
              >
                {t("complete-order")}
                {(isPending || isCheckingEnrollment) && (
                  <Spinner
                    size="sm"
                    animation="border"
                    role="status"
                    aria-hidden="true"
                    className="ms-2"
                  />
                )}
              </button>
            </div>
          )}
        {showEnrollmentError && (
              <div className="alert alert-danger text-danger mt-1" style={{ fontSize: "0.9rem" }}>
                {t("course-unavailable")}
              </div>
          )}

              <div>
      {showPaymentMethod && (
        <Select<PaymentOption>
          isDisabled={isPending}
          className="!w-[300px]"
          options={paymentMethods}
          onChange={handlePaymentMethod}
          value={paymentMethods.find(
            (method) => method.value === paymentMethod
          )}
        />
      )}
      </div>
          </div>

        </div>
      </div>

        {checkoutId && isSuccess && !showPaymentMethod && (
              <HyperPay
                checkoutId={checkoutId}
                currentChannel={[hyperpayBrandsMap[paymentMethod]]}
                paymentMethod={paymentMethod}
              />
            )}

      {id && (
        <PaymentStatus
          paymentMethod={paymentMethod || currentPaymentMethod || ""}
          id={id}
          cart={cartData}
        />
      )}
    </div>
  );
};
