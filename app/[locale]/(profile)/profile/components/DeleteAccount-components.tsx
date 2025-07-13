"use client";

import React from "react";

const DeleteAccountComponents = () => {
  return (
    <div className="delete-account-container my-5">
      <h5 className="fw-bold text-black mb-3">حذف الحساب</h5>
      <p className="text-muted mb-4">
        قد تفقد جميع البيانات والمعلومات المخزنة في حسابك إذا قمت بالحذف، يرجى التأكد من نسخ أو حفظ أي معلومات هامة قبل حذف الحساب. حيث لا يمكن استرداد الحساب بعد الحذف
      </p>
      <div className="">
        <button className="btn btn-danger btn-lg px-5" type="button">
          حذف حسابي
        </button>
      </div>
    </div>
  );
};

export default DeleteAccountComponents;