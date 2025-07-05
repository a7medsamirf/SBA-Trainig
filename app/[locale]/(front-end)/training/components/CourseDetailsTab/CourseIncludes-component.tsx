"use client";
import React from 'react';
import './CourseContent-component.scss';
// Example icon imports (replace with actual icons as needed)
import SvgVideoPlay from '../../../../../../components/icons/svg/video-play';
import SvgFlash from '../../../../../../components/icons/svg/flash';
import SvgDocumentText from '../../../../../../components/icons/svg/document-text';
import SvgBook from '../../../../../../components/icons/svg/book';
import SvgLaInfinity from '../../../../../../components/icons/svg/la-infinity';
import SvgQlementineCertificate from '../../../../../../components/icons/svg/qlementine-certificate';

import { CourseDetail } from "@/models";

interface CourseIncludesComponentProps {
  courseDetail: CourseDetail;
}

const CourseIncludesComponent: React.FC<CourseIncludesComponentProps> = ({ courseDetail }) => {
  const features = [
    {
      icon: <SvgVideoPlay />,
      text: `${courseDetail.duration || 0} ساعة من الفيديو`,
      ariaLabel: `مدة الدورة: ${courseDetail.duration || 0} ساعة من الفيديو`,
    },
    {
      icon: <SvgFlash />,
      text: `${courseDetail.exams || 0} اختبارًا`,
      ariaLabel: `عدد الاختبارات: ${courseDetail.exams || 0} اختبارًا`,
    },
    {
      icon: <SvgDocumentText />,
      text: `${courseDetail.support_files || 0} ملف دعم`,
      ariaLabel: `ملفات الدعم: ${courseDetail.support_files || 0} ملف دعم`,
    },
    {
      icon: <SvgBook />,
      text: `${courseDetail.articles || 0} مقالة`,
      ariaLabel: `عدد المقالات: ${courseDetail.articles || 0} مقالة`,
    },
    {
      icon: <SvgLaInfinity />,
      text: courseDetail.lifetime_access === '1' ? 'وصول كامل مدى الحياة' : 'صلاحية محددة',
      ariaLabel: courseDetail.lifetime_access === '1' ? 'الوصول: كامل مدى الحياة' : 'الوصول: صلاحية محددة',
    },
    {
      icon: <SvgQlementineCertificate />,
      text: courseDetail.certificate === '1' ? 'شهادة إتمام' : 'لا يوجد شهادة',
      ariaLabel: courseDetail.certificate === '1' ? 'الشهادة: متوفرة' : 'الشهادة: غير متوفرة',
    },
  ];

  return (
    <div className="card course-features-card p-4 rounded-4 shadow-none">
      <div className="card-body p-0">
        <h5 className="card-title fw-bold mb-4">هذه الدورة تشمل</h5>
        <ul className="list-unstyled m-0 p-0" role="list">
          {features.map((feature, index) => (
            <li 
              key={`feature-${index}`} 
              className="d-flex align-items-center mb-3 gap-2 feature-item"
              role="listitem"
            >
              <span 
                className="feature-icon d-flex align-items-center justify-content-center me-2" 
                style={{ width: 32, height: 32 }}
                aria-hidden="true"
              >
                {feature.icon}
              </span>
              <span 
                className="feature-text"
                aria-label={feature.ariaLabel}
              >
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CourseIncludesComponent;