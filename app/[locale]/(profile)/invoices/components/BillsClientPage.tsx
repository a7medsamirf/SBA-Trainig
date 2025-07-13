"use client";

import React from "react";
import BillsCartComponents from "./BillsCart-components";
import BillsSearchComponents from "./BillsSearch-components";
import { InvoiceItem } from "@/models";

export default function BillsClientPage({
  invoices,
}: {
  invoices: InvoiceItem[];
}) {
  return (
    <div className="border-0 card custom-border-radius">
      <div className="p-4 bg-white border-0 card-header custom-border-radius">
        <div className="profile-content-item-header">
          <h4 className="fw-bold color-gray-900"> الفواتير </h4>
        </div>
      </div>

      <div className="p-4 card-body">
        <div className="mb-4 bills-search">
          <div className="row">
            <div className="col-lg-4">
              <BillsSearchComponents />
            </div>
          </div>
        </div>
        <BillsCartComponents invoices={invoices} />

        {/* {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
          <div className="spinner-border" role="status" />
        </div>
        ) : error ? (
          <div className="py-5 text-center">
            <p className="text-muted">{error}</p>
          </div>
        ) : (
          <BillsCartComponents invoices={invoices} />
        )} */}
      </div>
    </div>
  );
}
