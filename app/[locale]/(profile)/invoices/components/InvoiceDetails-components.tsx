"use client";
import "../invoice.scss"
import React from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import { ShowInvoiceResponseData } from "@/models";
import SvgSaudiRiyal from "@/components/icons/svg/saudi-riyal";
interface InvoiceDetailsProps {
  show: boolean;
  loading: boolean;
  invoice: ShowInvoiceResponseData | null;
  handleClose: () => void;
  openQrModal: (qrUrl: string) => void;
}

const InvoiceDetailsComponent = ({
  show,
  loading,
  invoice,
  handleClose,
  openQrModal,
}: InvoiceDetailsProps) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="fs-5">
          تفاصيل فاتورة #{invoice?.invoice_number ?? ""}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading || !invoice ? (
          <div className="text-center py-5">
            <Spinner animation="border" />
          </div>
        ) : (
          <>
            <h6 className="mb-3">الدورات ({invoice.enrollments_count})</h6>
            {invoice.enrollments?.map((course) => (
           <div key={course.id} className="favourite-card card custom-border shadow-none">
           <div className="favourite-card-image position-relative">
             {course.qr_code && (
               <img
                 src={course.qr_code}
                 alt="QR Code"
                 className="rounded-4 object-fit-cover w-100"
                 style={{ width: 100, cursor: "pointer", objectFit: "cover" }}
                 onClick={() => openQrModal(course.qr_code!)}
               />
             )}
           
           </div>
           <div className="d-flex flex-column justify-content-center flex-grow-1">
             <div className="text-secondary mb-2 small fw-medium">
          {/*     {category_name}  */}
             </div>
             <div className="fw-bold fs-5 mb-3 text-dark"> {course.course_name} </div>
             <div className="fw-bold fs-6 text-primary d-flex align-items-center gap-1">
               <span className="color-gray-900 d-flex mb-2">
                  {course.course_price}
                  <SvgSaudiRiyal width={20} hanging={25} />
                 </span>
           
             </div>
           </div>
           </div>
            ))}

            <div className="invoice-details">
              <div className="mb-3 d-flex justify-content-between">
                <div className="text-normal">رقم الفاتورة</div>
                <div className="text-medium">{invoice.invoice_number}</div>
              </div>
              <div className="mb-3 d-flex justify-content-between">
                <div className="text-normal"> تاريخ الاشتراك</div>
                <div className="text-medium"> {invoice.date}</div>
              </div>
              <div className="mb-3 d-flex justify-content-between">
                <div className="text-normal"> نوع الدفع </div>
                <div className="text-medium">{invoice.payment_method}</div>
              </div>
              {/*    <div className="mb-3 d-flex justify-content-between">
                <div className="text-normal">الحالة</div>
                <div className="text-medium"> {invoice.payment_status}</div>
              </div> */}
              <div className="mb-3 d-flex justify-content-between">
                <div className="text-normal">عدد الدورات</div>
                <div className="text-medium"> {invoice.enrollments_count}</div>
              </div>
              <div className="mb-3 d-flex justify-content-between">
                <div className="text-normal">سعر الدورات</div>
                <div className="text-medium d-flex">
                  {invoice.courses_price}
                  <SvgSaudiRiyal width={20} hanging={25} color="#202020"  />
                </div>
              </div>
              <div className="mb-3 d-flex justify-content-between">
                <div className="text-normal">الضريبة</div>
                <div className="text-medium d-flex">
                  {invoice.vat}
                  <SvgSaudiRiyal width={20} hanging={25} color="#202020" />
                </div>
              </div>
              <div className="Total d-flex justify-content-between">
                <div className="text-normal">الإجمالي </div>
                <div className="text-medium d-flex">
                  {invoice.total_paid}
                  <SvgSaudiRiyal width={20} hanging={25} />
                </div>
              </div>
            </div>

            <div className="text-end my-3">
              <Button
              className="d-block w-100"
                variant="outline-primary"
                onClick={() =>
                  invoice.invoice_url &&
                  window.open(invoice.invoice_url, "_blank")
                }
                disabled={!invoice.invoice_url}
              >
                تحميل الفاتورة PDF
              </Button>
            </div>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default InvoiceDetailsComponent;
