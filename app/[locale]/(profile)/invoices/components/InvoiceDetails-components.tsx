"use client";
import "../invoice.scss"
import React from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import { ShowInvoiceResponseData } from "@/models";
import Image from "next/image";
import SvgSaudiRiyal from "@/components/icons/svg/saudi-riyal";
import { Star } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { slugify } from "@/utils/slugify";

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
  const t = useTranslations("trans");

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="fs-5">
          {t("profile.invoices.invoice-details", { number: invoice?.invoice_number ?? "" })}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading || !invoice ? (
          <div className="text-center py-5">
            <Spinner animation="border" />
          </div>
        ) : (
          <>
            <h6 className="mb-3">{t("training.Courses")} ({invoice.enrollments_count})</h6>
            {invoice.enrollments?.map((course) => (
           <div key={course.id} className="card favourite custom-border mb-3 shadow-none">
            <div className="favourite-card shadow-none">
            <div className="favourite-card-image position-relative px-2">
           <Image
                src={course.course_image || "/images/empty-img.png"}
                alt={course.course_name}
                width={100}
                height={100}
              />

           {/*   {course.qr_code && (
               <img
                 src={course.qr_code}
                 alt="QR Code"
                 className="rounded-4 object-fit-cover w-100"
                 style={{ width: 100, cursor: "pointer", objectFit: "cover" }}
                 onClick={() => openQrModal(course.qr_code!)}
               />
             )} */}
           
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
         
           
              <div className="card-footer">
              <div className="course-actions">
                <a
                    onClick={() => openQrModal(course.qr_code!)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-cart btn-outline-custom d-block btn-sm"
                  >
                  {t("button.qr-code")}
                </a>
             {/*    <Link
                    href={courseUrl}
                    className="btn btn-buy btn-custom-primary btn-primary btn-sm"
                  >
                    {t("button.View-details")}
                  </Link> */}
                    
          </div>

              </div>

           </div>
            ))}

            <div className="invoice-details">
              <div className="mb-3 d-flex justify-content-between">
                <div className="text-normal">{t("profile.invoices.invoice-number-label")}</div>
                <div className="text-medium">{invoice.invoice_number}</div>
              </div>
              <div className="mb-3 d-flex justify-content-between">
                <div className="text-normal">{t("profile.invoices.subscription-date")}</div>
                <div className="text-medium"> {invoice.date}</div>
              </div>
              <div className="mb-3 d-flex justify-content-between">
                <div className="text-normal">{t("profile.invoices.payment-method")}</div>
                <div className="text-medium">{invoice.payment_method}</div>
              </div>
              {/*    <div className="mb-3 d-flex justify-content-between">
                <div className="text-normal">{t("profile.invoices.status")}</div>
                <div className="text-medium"> {invoice.payment_status}</div>
              </div> */}
              <div className="mb-3 d-flex justify-content-between">
                <div className="text-normal">{t("profile.invoices.courses-count")}</div>
                <div className="text-medium"> {invoice.enrollments_count}</div>
              </div>
              <div className="mb-3 d-flex justify-content-between">
                <div className="text-normal">{t("profile.invoices.courses-price")}</div>
                <div className="text-medium d-flex">
                  {invoice.courses_price}
                  <SvgSaudiRiyal width={20} hanging={25} color="#202020"  />
                </div>
              </div>
              <div className="mb-3 d-flex justify-content-between">
                <div className="text-normal">{t("profile.invoices.vat")}</div>
                <div className="text-medium d-flex">
                  {invoice.vat}
                  <SvgSaudiRiyal width={20} hanging={25} color="#202020" />
                </div>
              </div>
              <div className="Total d-flex justify-content-between">
                <div className="text-normal">{t("profile.invoices.total")}</div>
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
                {t("profile.invoices.download-pdf")}
              </Button>
            </div>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default InvoiceDetailsComponent;
