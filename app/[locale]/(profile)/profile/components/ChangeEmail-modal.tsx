"use client";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useConfirmOtp } from "../hooks/change-email.hook";

export default function EnterEmailModal({
  show,
  onHide,
  onSendOtp,
  isSendingOtp,
  errors,
}: {
  show: boolean;
  onHide: () => void;
  onSendOtp: (data: { email: string }) => void;
  isSendingOtp: boolean;
  errors: { email?: string };
}) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSendOtp({ email });
  };

  return (
    <Modal show={show} onHide={onHide} centered backdrop="static" contentClassName="p-3">
       <Modal.Header closeButton>
        <Modal.Title className="fw-bold change-password-modal-title h5">تغيير البريد الإلكتروني</Modal.Title>
      </Modal.Header>

      <Modal.Body>
      <div className="text-end" style={{ marginBottom: "30px" }}>
          <div className="mb-2 change-password-modal-title fw-bold">
          برجاء أدخال البريد الالكتروني الجديد
          </div>
          <div
            className="text-muted change-password-modal-description"
            style={{ fontSize: "1rem" }}
          >
        من فضلك أعد كتابة بريد الكتروني جديد ويجب أن يكون مختلف عن أي بريد الكتروني قديمة
          </div>
        </div>
        <form onSubmit={handleSubmit} id="send-otp-form">
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="البريد الإلكتروني الجديد"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            />
            <label htmlFor="email">البريد الإلكتروني الجديد</label>
            {errors.email && <p className="text-danger mt-1">{errors.email}</p>}
          </div>

          <div className="d-flex justify-content-between gap-4">
          <button
              className="btn btn-outline-primary btn-sm"
              type="button"
              onClick={onHide}
              style={{ width: "170px" }}
            >
              إلغاء
            </button>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSendingOtp}
              form="send-otp-form"
            >
              {isSendingOtp ? "جاري الإرسال..." : "إرسال كود التحقق"}
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
