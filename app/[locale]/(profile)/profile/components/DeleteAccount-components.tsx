"use client";

import { useRouter } from "@/i18n/routing";
import { deleteAccount } from "@/server-actions";
import React, { useState, useTransition } from "react";
import { Modal, Button } from "react-bootstrap";
import { useTranslations } from "next-intl";

const DeleteAccountComponents = () => {
  const [isPending, startTransition] = useTransition();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const router = useRouter();
  const t = useTranslations("trans.profile");

  const handleConfirmDelete = () => {
    startTransition(async () => {
      await deleteAccount();
      setShowConfirmModal(false);
      router.replace("/login");
    });
  };

  return (
    <div className="my-5 delete-account-container">
      <h5 className="mb-3 text-black fw-bold">{t("delete-account.title")}</h5>
      <p className="mb-4 text-muted">
        {t("delete-account.description")}
      </p>

      <button
        className="px-5 btn btn-danger btn-lg"
        type="button"
        onClick={() => setShowConfirmModal(true)}
        disabled={isPending}
      >
        {isPending && (
          <span
            className="ms-2 spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          />
        )}
        {t("delete-account.delete-button")}
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
            {t("delete-account.confirm-title")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <p>{t("delete-account.confirm-message")}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)} disabled={isPending}>
            {t("delete-account.cancel-button")}
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete} disabled={isPending}>
            {isPending ? t("delete-account.deleting") : t("delete-account.confirm-button")}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeleteAccountComponents;
