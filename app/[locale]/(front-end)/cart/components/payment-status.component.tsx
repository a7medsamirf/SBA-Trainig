import { CartDetailResponse } from "@/models";
import { usePaymentStatus } from "@/hooks/payment/use-payment-status.hook";
import { Spinner, Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useLocale } from "next-intl";

export const PaymentStatus = ({
  id,
  cart,
  paymentMethod,
}: {
  id: string;
  cart: CartDetailResponse["data"];
  paymentMethod: string;
}) => {
  const { paymentStatusData, isPending } = usePaymentStatus(
    id,
    paymentMethod,
    cart
  );
  const [showModal, setShowModal] = useState(false);

  const lang = useLocale();

  // Show modal when payment status data is available or when loading
  useEffect(() => {
    if (isPending || paymentStatusData) {
      setShowModal(true);
    }
  }, [isPending, paymentStatusData]);

  const handleClose = () => {
    setShowModal(false);
    window.location.href = `/${lang}/cart`;
  };

  const getModalVariant = () => {
    if (isPending) return "primary";
    if (paymentStatusData?.succeeded) return "success";
    if (paymentStatusData?.succeeded === false) return "danger";
    return "primary";
  };

  const getModalTitle = () => {
    if (isPending) return "جاري جلب حالة الدفع...";
    if (paymentStatusData?.succeeded) return "حالة الدفع";
    if (paymentStatusData?.succeeded === false) return "خطأ في جلب حالة الدفع";
    return "حالة الدفع";
  };

  const renderModalBody = () => {
    if (isPending) {
      return (
        <div className="p-4 text-center">
          <Spinner className="me-2" size="sm" />
          <span>جاري جلب حالة الدفع...</span>
        </div>
      );
    }

    if (paymentStatusData?.succeeded) {
      return (
        <div>
          <div className="mb-3 alert alert-success">
            <p className="mb-0">
              {paymentStatusData?.message || "تم جلب حالة الدفع بنجاح"}
            </p>
          </div>
        </div>
      );
    }

    if (paymentStatusData?.succeeded === false) {
      return (
        <div className="alert alert-danger">
          <p className="mb-0">
            {paymentStatusData?.error?.message ||
              "حدث خطأ أثناء جلب حالة الدفع"}
          </p>
        </div>
      );
    }

    return <div>لا توجد بيانات متاحة</div>;
  };

  // Don't render anything if there's no data and not loading
  if (!isPending && !paymentStatusData) {
    return null;
  }

  return (
    <Modal show={showModal} onHide={handleClose} centered size="lg">
      <Modal.Header
        closeButton
        className={`text-white bg-${getModalVariant()}`}
      >
        <Modal.Title>{getModalTitle()}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{renderModalBody()}</Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          إغلاق
        </Button>
        {paymentStatusData?.succeeded && (
          <Button variant="primary" onClick={handleClose}>
            متابعة
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};
