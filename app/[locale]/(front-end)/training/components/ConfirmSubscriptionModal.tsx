import { Modal, Button } from "react-bootstrap";
import { useTranslations } from "next-intl";

interface ConfirmSubscriptionModalProps {
  show: boolean;
  onHide: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

export default function ConfirmSubscriptionModal({
  show,
  onHide,
  onConfirm,
  isLoading,
}: ConfirmSubscriptionModalProps) {
  const t = useTranslations("trans.subscription");
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
      <Modal.Title>{t("confirm-subscription")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <p>{t("are-you-sure-subscribe")}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onHide}>
        {t("cancel")}
        </Button>
        <Button variant="primary" onClick={onConfirm} disabled={isLoading}>
          {isLoading ? (
            <span className="spinner-border spinner-border-sm ms-2"></span>
          ) : null}
           {t("confirm-subscription")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}