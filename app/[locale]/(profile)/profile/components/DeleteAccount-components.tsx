"use client";

import { useRouter } from "@/i18n/routing";
import { deleteAccount } from "@/server-actions";
import React, { useState, useTransition } from "react";
import { Modal, Button } from "react-bootstrap";

const DeleteAccountComponents = () => {
  const [isPending, startTransition] = useTransition();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const router = useRouter();

  const handleConfirmDelete = () => {
    startTransition(async () => {
      await deleteAccount();
      setShowConfirmModal(false);
      router.replace("/login");
    });
  };

  return (
    <div className="my-5 delete-account-container">
      <h5 className="mb-3 text-black fw-bold">حذف الحساب</h5>
      <p className="mb-4 text-muted">
        قد تفقد جميع البيانات والمعلومات المخزنة في حسابك إذا قمت بالحذف، يرجى
        التأكد من نسخ أو حفظ أي معلومات هامة قبل حذف الحساب. حيث لا يمكن استرداد
        الحساب بعد الحذف
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
        حذف حسابي
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
            تأكيد حذف الحساب
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <p>هل أنت متأكد أنك تريد حذف الحساب؟ لا يمكن التراجع بعد ذلك.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)} disabled={isPending}>
            إلغاء
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete} disabled={isPending}>
            {isPending ? "... جاري الحذف" : "نعم، احذف الحساب"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeleteAccountComponents;
