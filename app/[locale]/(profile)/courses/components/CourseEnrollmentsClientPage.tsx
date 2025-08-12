"use client";
import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import CoursesCardComponent from "./CoursesCard-component";
import CoursesSearchComponents from "./CoursesSearch-components";
import {  useTranslations } from "next-intl";

interface Props {
  upcoming: any[];
  ongoing: any[];
  completed: any[];
}

const CourseEnrollmentsClientPage = ({ upcoming, ongoing, completed }: Props) => {
  const [key, setKey] = useState("ongoing");
  const t = useTranslations("trans.dashboard");
  return (
    <div className="border-0 card custom-border-radius">
      <div className="p-4 bg-white border-0 card-header custom-border-radius">
        <div className="profile-content-item-header">
          <h4 className="fw-bold color-gray-900"> {t("My-courses")} </h4>
        </div>
      </div>

      <div className="p-4 card-body">
        <Tabs
          id="course-requests-tabs"
          activeKey={key}
          onSelect={(k) => setKey(k || "ongoing")}
          className="mb-4 nav nav-tabs nav-tabs-product d-inline-flex dashboard-tabs justify-content-center"
        >

          <Tab eventKey="ongoing" title={t("ongoing")}>
            <div className="row mb-4">
              <div className="col-lg-4">
                <CoursesSearchComponents />
              </div>
            </div>

            <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3">
              {ongoing.length === 0 ? (
                <p className="text-muted">{t("no-courses")}</p>
              ) : (
                ongoing.map((item) => (
                  <div
                   className="col mb-3"
                    key={`${item.course_id}-${item.qr_code}`}
                  >
                    <CoursesCardComponent
                      status="ongoing" 
                      course_id={item.course_id}
                      category_name={item.course_category}
                      name={item.course_name}
                      course_image={item.course_image}
                      attendance_percentage={item.attendance_percentage}
                      qr_code={item.qr_code}
                      certificate_url={item.certificate_url}
                    />
                  </div>
                ))
              )}
            </div>
          </Tab>

          <Tab eventKey="upcoming" title={t("upcoming")}>
            <div className="mb-4 row">
              <div className="col-lg-4">
                <CoursesSearchComponents />
              </div>
            </div>

            <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3">
              {upcoming.length === 0 ? (
                   <p className="text-muted">{t("no-current-courses")}</p>
              ) : (
                upcoming.map((item) => (
                  <div className="col mb-3" key={`${item.course_id}-${item.qr_code}`}>
                    <CoursesCardComponent
                      status="upcoming" 
                      course_id={item.course_id}
                      category_name={item.course_category}
                      name={item.course_name}
                      course_image={item.course_image}
                      attendance_percentage={item.attendance_percentage}
                      qr_code={item.qr_code}
                      certificate_url={item.certificate_url}
                    />
                  </div>
                ))
              )}
            </div>
          </Tab>

          <Tab eventKey="completed" title={t("completed")}>
            <div className="mb-4 row">
              <div className="col-lg-4">
                <CoursesSearchComponents />
              </div>
            </div>

            <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3">
              {completed.length === 0 ? (
            <p className="text-muted">{t("no-completed-courses")}</p>
              ) : (
                completed.map((item) => (
                  <div className="col mb-3" key={`${item.course_id}-${item.qr_code}`}>
                    <CoursesCardComponent
                      status="completed" 
                      course_id={item.course_id}
                      category_name={item.course_category}
                      name={item.course_name}
                      course_image={item.course_image}
                      attendance_percentage={item.attendance_percentage}
                      qr_code={item.qr_code}
                      certificate_url={item.certificate_url}
                    />
                  </div>
                ))
              )}
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default CourseEnrollmentsClientPage;