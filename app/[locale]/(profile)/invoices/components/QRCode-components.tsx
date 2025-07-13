"use client";

import React from "react";
import { Modal } from "react-bootstrap";

interface QRCodeModalProps {
  show: boolean;
  qrUrl: string;
  handleClose: () => void;
}

const QRCodeModalComponent = ({ show, qrUrl, handleClose }: QRCodeModalProps) => {
  return (
    <Modal show={show} onHide={handleClose} size="sm" centered>
      <Modal.Header closeButton>
        <Modal.Title  className="fs-6">رمز الاستجابة السريعة</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center d-flex justify-content-center align-items-center">
        <img
          src={qrUrl}
          alt="QR Code"
          style={{ width: "100%", maxWidth: 300 }}
        />
      </Modal.Body>
    </Modal>
  );
};

export default QRCodeModalComponent;