"use client";

import React, { useState, useTransition } from "react";
import SvgDelete from "@/components/icons/svg/delete";
import { removeFromCartApi } from "@/server-actions";
import { toast } from "react-hot-toast";
import { Modal, Button } from "react-bootstrap";
import { useTranslations } from "next-intl";

const RemoveFromCartComponent = ({
  courseId,
  onRemoved,
}: {
  courseId: number;
  onRemoved?: () => void;
}) => {
  const t = useTranslations("trans.cart");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleRemove = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = () => {
    startTransition(async () => {
      try {
        const res = await removeFromCartApi(courseId);
        if (res?.status === 200) {
          toast.success(t("course-removed"));
          onRemoved?.();
        } else {
          toast.error(t("remove-error"));
        }
      } catch (error) {
        toast.error(t("connection-error"));
      } finally {
        setShowConfirmModal(false);
      }
    });
  };

  return (
    <>
      <button
        className="btn Remove-FromCart d-flex align-items-center p-0"
        onClick={handleRemove}
        disabled={isPending}
        type="button"
      >
        <SvgDelete width={30} />
        {isPending ? (
          <span className="ms-2 spinner-border spinner-border-sm" role="status" aria-hidden="true" />
        ) : null}
        {isPending ? t("removing") : t("remove-from-cart")}
      </button>

      {/* Confirm Delete Modal */}
      <Modal
        show={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title className="h5 color-gray-900" id="contained-modal-title-vcenter">
            {t("confirm-remove-title")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <p>{t("confirm-remove-message")}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)} disabled={isPending}>
            {t("cancel")}
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete} disabled={isPending}>
            {isPending ? t("removing") : t("confirm-remove")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RemoveFromCartComponent;
