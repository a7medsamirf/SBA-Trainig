"use client";

import { useTransition, useState } from "react";
import { useRouter } from "@/i18n/routing";
import SvgLogincurve from "@/components/icons/profile/logincurve";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { signOut } from "next-auth/react"; 

function MyVerticallyCenteredModal(props: {
  show: boolean;
  onHide: () => void;
  onConfirm: () => void;
  isPending: boolean;
}) {
  return (
    <Modal
  /*     {...props} */
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title className="h5 color-gray-900" id="contained-modal-title-vcenter">
          تأكيد تسجيل الخروج
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <p>هل انت موافق على تسجيل الخروج؟</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide} disabled={props.isPending}>
          الغاء
        </Button>
        <Button variant="danger" onClick={props.onConfirm} disabled={props.isPending}>
          {props.isPending ? "... جاري تسجيل الخروج" : "موافق"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

const LogoutButtonComponent = () => {
  const [isPending, startTransition] = useTransition();
  const [modalShow, setModalShow] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    startTransition(async () => {
      // ✅ استدعاء signOut من next-auth
      await signOut({
        redirect: false,
      });

      router.replace("/login");
    });
  };

  return (
    <>
      <div className="logout-section">
        <button onClick={() => setModalShow(true)} disabled={isPending}>
          <SvgLogincurve />
          <span>تسجيل الخروج</span>
        </button>
      </div>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        onConfirm={handleLogout}
        isPending={isPending}
      />
    </>
  );
};

export default LogoutButtonComponent;
