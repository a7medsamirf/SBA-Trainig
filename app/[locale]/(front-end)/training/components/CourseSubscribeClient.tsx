"use client";
import React, { useMemo, useState } from "react";
import CompleteProfileModal from "./CompleteProfileModal";
import toast from "react-hot-toast";
import { useRouter } from "@/i18n/routing";
import { useSubscribeCourse } from "./hooks/subscribe-course.hook";
import { cn } from "@/utils";
import { TriangleAlert } from "lucide-react";
import SubscriptionSuccessModal from "./SubscriptionSuccessModal";
import { CourseData } from "@/models/Courses/courses-detail.model";
import ConfirmSubscriptionModal from "./ConfirmSubscriptionModal";
import { useTranslations } from "next-intl";
export default function CourseSubscribeClient({
  courseId,
  languageLevels,
  educationDegrees,
  user,
  status,
  slug,
  course,
}: {
  courseId: string;
  languageLevels: any;
  educationDegrees: any;
  user: any;
  status: 1 | 2 | 3 | undefined;
  slug: string;
  course: CourseData;
}) {
  const t = useTranslations("trans.courseStatus");
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSeatsAlert, setShowSeatsAlert] = useState(false); // ⚠️ تنبيه على الصفحة

  const { isPending: isSubscribing, handleSubscribe } = useSubscribeCourse(courseId, slug);
  const router = useRouter();

  const handleProfileConfirm = async () => {
    await handleSubscribe();
    setShowProfileModal(false);
    setShowSuccessModal(true);
  };

  const handleSubscribeClick = async () => {
    setShowSeatsAlert(false);

    if (!user) {
      toast("يرجى تسجيل الدخول أولاً");
      const currentPath = window.location.pathname;
      router.push(`/login?callbackUrl=${encodeURIComponent(currentPath)}`);
      return;
    }

    if (Number(course.remaining_seats) <= 0) {
      setShowSeatsAlert(true); 
      return;
    }

    if (user?.can_join_in_courses) {
      setShowConfirmModal(true);
    } else {
      setShowProfileModal(true);
    }
  };

  const handleConfirmSubscription = async () => {
    try {
      await handleSubscribe();
      setShowConfirmModal(false);
      setShowSuccessModal(true);
      status = 2; 
    } catch (error) {
      setShowConfirmModal(false);
      toast.error("حدث خطأ أثناء الاشتراك في الدورة");
    }
  };

  const title = useMemo(() => {
    if (!status) return t("request-subscription");
    if (status === 1) return t("request-under-review");
    if (status === 2) return t("enrolled");
    if (status === 3) return t("resubmit-request");
  }, [status, t]);

  return (
    <>
      {status === 1 && !showSuccessModal ? (
        <div className="gap-3 text-warning d-flex align-items-center my-3" role="alert">
          <TriangleAlert />
          <div>{t("request-under-review")}</div>
        </div>
      ) : status === 2 ? (
        <div className="gap-3 text-success d-flex align-items-center my-3" role="alert">
          <TriangleAlert color="#76A441" />
          <div>{t("enrolled")}</div>
        </div>
      ) : (
        <>
          {showSeatsAlert && (
            <div className="alert alert-danger d-flex align-items-center gap-2 my-3" role="alert">
              <TriangleAlert size={18} />
              <div>{t("no-seats-available")}</div>
            </div>
          )}
          <button
            type="button"
            className={cn("btn btn-buy btn-custom-primary btn-primary")}
            onClick={handleSubscribeClick}
            disabled={isSubscribing || Number(course.remaining_seats) <= 0}
          >
            {title}
            {isSubscribing && (
              <span className="spinner-border spinner-border-sm ms-2"></span>
            )}
          </button>
        </>
      )}

      <ConfirmSubscriptionModal
        show={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmSubscription}
        isLoading={isSubscribing}
      />

      <SubscriptionSuccessModal
        show={showSuccessModal}
        onHide={() => setShowSuccessModal(false)}
        course={course}
        slug={slug}
      />

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
