"use client";

import React, { useState } from "react";
import SvgDelete from "@/components/icons/svg/delete";
import { removeFromCartApi } from "@/server-actions";
import { toast } from "react-hot-toast";

const RemoveFromCartComponent = ({
  courseId,
  onRemoved,
}: {
  courseId: number;
  onRemoved?: () => void;
}) => {
  const [loading, setLoading] = useState(false);

  const handleRemove = async () => {
    
    const confirmDelete = window.confirm("هل أنت متأكد من إزالة الدورة من السلة؟");
    if (!confirmDelete) return;

    setLoading(true);
    try {
      const res = await removeFromCartApi(courseId);
     /*  console.log("🔄 API Response:", res); */
      if (res?.status === 200) {
        toast.success("تمت إزالة الدورة من السلة");
        onRemoved?.(); // لتحديث قائمة السلة
      } else {
        toast.error("حدث خطأ أثناء الحذف");
      }
    } catch (error) {
      toast.error("فشل الاتصال بالخادم");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="btn Remove-FromCart d-flex align-items-center p-0"
      onClick={handleRemove}
      disabled={loading}
    >
      <SvgDelete width={30} />
      {loading ? "جاري الحذف..." : "إزالة من السلة"}
    </button>
  );
};

export default RemoveFromCartComponent;
