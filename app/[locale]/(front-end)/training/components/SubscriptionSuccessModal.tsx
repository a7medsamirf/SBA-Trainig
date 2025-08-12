"use client";
import "../training.scss";
import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Image from "next/image";
import { CourseData } from "@/models/Courses/courses-detail.model";
import { Link } from "@/i18n/routing";
import SvgSvgexport16181 from "@/components/icons/svg/svgexport-16-18-1";
import SvgSaudiRiyal from "@/components/icons/svg/saudi-riyal";
import { useTranslations } from "next-intl";

interface SubscriptionSuccessModalProps {
  show: boolean;
  onHide: () => void;
  course: CourseData;
  slug: string;
}

const SubscriptionSuccessModal = ({
  show,
  onHide,
  course,
  slug,
}: SubscriptionSuccessModalProps) => {
  const t = useTranslations("trans.subscriptionSuccess");
  return (
    <Modal className="Subscription-Success" show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="border-0 pb-0">
      </Modal.Header>
      <Modal.Body className="pt-0">
        <div className="Modal-icon mb-4">
          <SvgSvgexport16181 width={100} height={100} />
        </div>
        <div className="text-center">
        <h5 className="mb-2 color-brand-3">{t("success-message")}</h5>
          <p className="mb-4 font-sm color-gray-500">{t("review-message")}</p>

        </div>

        <div className="mb-4 p-3 course-card rounded">
          <div className="d-flex align-items-center">
            <Image
              src={course.image ? course.image : "/images/empty-img.png"}
              alt={course.name}
              width={80}
              height={80}
              className="rounded me-3"
            />
            <div>
              <p className="mb-1 font-xs color-gray-500">{course.category_name}</p>
              <h6 className="mb-1 color-brand-3">{course.name}</h6>
              <div className="d-flex gap-1">
                  <span className="fw-bold text-color-primary">{course.price}</span>
                    <SvgSaudiRiyal width={12} />
                </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between py-3">
          <Link href="/" passHref>
            <Button variant="outline-primary" className="btn-outline-custom-primary">
            {t("back-home")}
            </Button>
          </Link>
          <Link href={`/course-request`} >
            <Button variant="primary" className="btn-custom-primary">
            {t("track-request")}
            </Button>
          </Link>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SubscriptionSuccessModal;