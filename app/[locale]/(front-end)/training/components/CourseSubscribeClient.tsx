"use client";
import React, { useState } from "react";
import CompleteProfileModal from "./CompleteProfileModal";
import toast from "react-hot-toast";
import { useRouter } from "@/i18n/routing";

export default function CourseSubscribeClient({
  courseId,
  languageLevels,
  educationDegrees,
  user,
  slug,
}: {
  courseId: string;
  languageLevels: any;
  educationDegrees: any;
  user: any;

  slug: string;
}) {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const router = useRouter();

  const handleProfileConfirm = async () => {
    setIsPending(true);
    setTimeout(() => {
      setIsPending(false);
      setShowProfileModal(false);
    }, 1000);
  };

  const handleSubscribe = () => {
    console.log("subscribe");
  };

  const handleSubscribeClick = () => {
    if (user) {
      if (user?.can_join_in_courses) {
        handleSubscribe();
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
        type="button"
        className="btn btn-buy btn-custom-primary btn-primary"
        onClick={handleSubscribeClick}
      >
    طلب الاشتراك في الدورة
      </button>
      <CompleteProfileModal
        show={showProfileModal && !user?.can_join_in_courses}
        onHide={() => setShowProfileModal(false)}
        onConfirm={handleProfileConfirm}
        educationdegree={educationDegrees?.data}
        languagelevel={languageLevels?.data}
        slug={slug}
      />
    </>
  );
}
