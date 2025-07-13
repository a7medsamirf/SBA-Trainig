"use client";

import { addToCartApi } from "@/server-actions";
import { toast } from "react-hot-toast";
import { useCart } from "@/context/CartContext";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "@/i18n/routing";
import CompleteProfileModal from "./CompleteProfileModal";

const AddToCartButtonComponent = ({
  courseId,
  user,
  languageLevels,
  educationDegrees,
  slug,
}: {
  courseId: number;
  user: any;
  languageLevels: any;
  educationDegrees: any;
  slug?: string;
}) => {
  const router = useRouter();
  const { setCartCount } = useCart();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleAddToCart = async () => {
    if (!session) {
      toast("يرجى تسجيل الدخول أولاً");
      const currentPath = window.location.pathname;
      router.push(`/login?callbackUrl=${encodeURIComponent(currentPath)}`);
      return;
    }

    if (!courseId || isNaN(Number(courseId))) {
      toast.error("رقم الدورة غير صالح");
      return;
    }

    setLoading(true);
    try {
      const res = await addToCartApi({ course_id: Number(courseId) });
      if (res?.status === 200) {
        toast.success(res.message || "تمت الإضافة إلى السلة");
        setCartCount((prev) => prev + 1);
        router.push("/cart");
      } else if (res?.message === "Course is already in the cart.") {
        toast("الدورة مضافة بالفعل إلى السلة");
        router.push("/cart");
      } else {
        toast.error(res.message || "فشل في الإضافة للسلة");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCartClick = () => {
    if (user) {
      if (user?.can_join_in_courses) {
        handleAddToCart();
      } else {
        setShowProfileModal(true);
      }
    } else {
      toast("يرجى تسجيل الدخول أولاً");
      const currentPath = window.location.pathname;
      router.push(`/login?callbackUrl=${encodeURIComponent(currentPath)}`);
      return;
    }
  };

  return (
    <>
      <button
        onClick={handleAddToCartClick}
        className="btn btn-cart btn-outline-custom"
        disabled={loading || status === "loading"}
      >
        {status === "loading"
          ? "انتظر..."
          : loading
          ? "جاري الإضافة ..."
          : "اضف الي السلة"}
      </button>

      <CompleteProfileModal
        show={showProfileModal && !user?.can_join_in_courses}
        onHide={() => setShowProfileModal(false)}
        onConfirm={handleAddToCart}
        educationdegree={educationDegrees?.data}
        languagelevel={languageLevels?.data}
        slug={slug}
      />
    </>
  );
};

export default AddToCartButtonComponent;
