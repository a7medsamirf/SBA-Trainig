import React, { useState } from "react";
import { InvoiceItem, ShowInvoiceResponseData } from "@/models";
import SvgDocumentTextV2 from "@/components/icons/profile/document-text-v2";
import SvgSaudiRiyal from "@/components/icons/svg/saudi-riyal";
import InvoiceDetailsComponent from "./InvoiceDetails-components";
import QRCodeModalComponent from "./QRCode-components";
import { getInvoiceDetails } from "@/shared-apis";

interface BillsCartProps {
  invoices: InvoiceItem[];
}

const BillsCartComponents = ({ invoices }: BillsCartProps) => {
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [qrUrl, setQrUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [selectedInvoice, setSelectedInvoice] =
    useState<ShowInvoiceResponseData | null>(null);

  const handleCloseInvoiceModal = () => {
    setShowInvoiceModal(false);
    setSelectedInvoice(null);
  };

  const handleShowDetails = async (uuid: string) => {
    setShowInvoiceModal(true);
    setLoading(true);
    const data = await getInvoiceDetails(uuid);
    if (data) setSelectedInvoice(data);
    setLoading(false);
  };

  const handleOpenQrModal = (qr: string) => {
    setQrUrl(qr);
    setShowQrModal(true);
  };

  const handleCloseQrModal = () => {
    setQrUrl("");
    setShowQrModal(false);
  };

  if (invoices.length === 0)
    return <p className="py-5 text-center">لا توجد فواتير حالياً</p>;

  return (
    <>
      <div className="invoice-card">
        {invoices.map((invoice) => (
          <div
            key={invoice.id}
            className="m-2 mb-3 shadow-none bills-invoice-card card custom-border"
          >
            <div className="p-3 card-body">
              <div className="flex-row-reverse mb-3 d-flex justify-content-between align-items-center">
                <button
                  className="gap-2 px-4 btn btn-primary btn-sm"
                  onClick={() => handleShowDetails(invoice.uuid)}
                >
                  عرض التفاصيل
                </button>

                <div className="flex-row-reverse gap-2 d-flex align-items-center">
                  <span className="fw-bold">
                    فاتورة #{invoice.invoice_number}
                  </span>
                  <div
                    className="rounded-circle bg-light d-flex align-items-center justify-content-center"
                    style={{ width: 40, height: 40 }}
                  >
                    <SvgDocumentTextV2 width={20} hanging={20} />
                  </div>
                </div>
              </div>

              <div className="pt-3 mt-2 text-center row d-flex justify-content-around border-top g-0">
                <div className="gap-5 col-lg-4 col-md-12 d-flex align-items-center justify-content-start border-end">
                  <div className="text-muted small">عدد الدورات</div>
                  <div className="fw-bold">{invoice.enrollments_count}</div>
                </div>
                <div className="gap-5 col-lg-4 col-md-12 d-flex align-items-center justify-content-center border-end">
                  <div className="text-muted small">تاريخ الاشتراك</div>
                  <div className="fw-bold">{invoice.date}</div>
                </div>
                <div className="gap-5 col-lg-4 col-md-12 d-flex align-items-center justify-content-end">
                  <div className="text-muted small">المبلغ الإجمالي</div>
                  <div className="gap-1 d-flex align-items-center justify-content-center fw-bold">
                    <span className="color-gray-900">{invoice.total_paid}</span>
                    <span className="text-primary" style={{ fontSize: "18px" }}>
                      <SvgSaudiRiyal />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <InvoiceDetailsComponent
        show={showInvoiceModal}
        loading={loading}
        invoice={selectedInvoice}
        handleClose={handleCloseInvoiceModal}
        openQrModal={handleOpenQrModal}
      />

      <QRCodeModalComponent
        show={showQrModal}
        qrUrl={qrUrl}
        handleClose={handleCloseQrModal}
      />
    </>
  );
};

export default BillsCartComponents;
