"use client";
import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import PersonCoursesCard from "./DashboardCoursesCard-component";
import DashboardSearchComponents from "./DashboardSearch-components";
import {  useTranslations } from "next-intl";
interface Props {
  upcoming: any[];
  ongoing: any[];
  completed: any[];
}

const DashboardClientPage = ({ upcoming, ongoing, completed }: Props) => {
  const [key, setKey] = useState("ongoing");
  const t = useTranslations("trans.dashboard");
  return (
    <div className="card border-0 custom-border-radius">
      <div className="card-header bg-white border-0 custom-border-radius p-4">
        <div className="profile-content-item-header">
          <h4 className="fw-bold color-gray-900"> {t("My-courses")} </h4>
        </div>
      </div>

      <div className="card-body p-4">
        <Tabs
          id="course-requests-tabs"
          activeKey={key}
          onSelect={(k) => setKey(k || "ongoing")}
          className="mb-4 nav nav-tabs nav-tabs-product d-inline-flex dashboard-tabs justify-content-center"
        >
    <Tab eventKey="ongoing" title={t("ongoing")}>
            <div className="row mb-4">
              <div className="col-lg-4">
                <DashboardSearchComponents />
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
                    <PersonCoursesCard
                      status="ongoing" 
                      id={item.course_id}
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
            <div className="row mb-4">
              <div className="col-lg-4">
                <DashboardSearchComponents />
              </div>
            </div>

            <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3">
              {upcoming.length === 0 ? (
                <p className="text-muted">{t("no-current-courses")}</p>
              ) : (
                upcoming.map((item) => (
                  <div
                  className="col mb-3"
                    key={`${item.course_id}-${item.qr_code}`}
                  >
                    <PersonCoursesCard
                      status="upcoming" 
                      id={item.course_id}
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
            <div className="row mb-4">
              <div className="col-lg-4">
                <DashboardSearchComponents />
              </div>
            </div>

            <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3">
              {completed.length === 0 ? (
                <p className="text-muted">{t("no-completed-courses")}</p>
              ) : (
                completed.map((item) => (
                  <div
                    className="col mb-3"
                    key={`${item.course_id}-${item.qr_code}`}
                  >
                    <PersonCoursesCard
                      status="completed" 
                      id={item.course_id}
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

export default DashboardClientPage;
