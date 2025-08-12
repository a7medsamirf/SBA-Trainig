"use client";
import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import  CoursesCardComponents from "./CoursesCard-component";
import CourseRequestSearchComponents from "./CourseRequestSearch-components";
import { useTranslations } from "next-intl";

interface Props {
  pending: any[];
  approved: any[];
  declined: any[];
}

const CourseRequestClientPage = ({ pending, approved, declined }: Props) => {
  const t = useTranslations("trans");
  const [key, setKey] = useState("pending");

  return (
      <div className="border-0 card custom-border-radius">
      <div className="p-4 bg-white border-0 card-header custom-border-radius">
        <div className="profile-content-item-header">
          <h4 className="fw-bold color-gray-900">{t("profile.course-request-title")}</h4>
        </div>
      </div>
      <div className="p-4 card-body">
   
        <Tabs
          id="course-requests-tabs"
          activeKey={key}
          onSelect={(k) => setKey(k || "pending")}
          className="mb-4 nav nav-tabs nav-tabs-product d-inline-flex dashboard-tabs justify-content-center"
        >
          <Tab eventKey="pending" title={t("profile.course-requests.pending")}>
            <div className="mb-4 row">
                <div className="col-lg-4">
                <CourseRequestSearchComponents />
                </div>
            </div>

            <div className="row">
              {pending.length === 0 ? (
                <p className="text-muted">{t("profile.course-requests.no-pending")}</p>
              ) : (
                pending.map((item) => (
                  <div className="col-md-4 mb-3" key={item.id}>
                    <CoursesCardComponents {...item.course} statusLabel="pending" number={item.number} />
                  </div>
                ))
              )}
            </div>
          </Tab>

          <Tab eventKey="approved" title={t("profile.course-requests.approved")}>
          <div className="mb-4 row">
                <div className="col-lg-4">
                <CourseRequestSearchComponents />
                </div>
            </div>
            <div className="row">
              {approved.length === 0 ? (
                <p className="text-muted">{t("profile.course-requests.no-approved")}</p>
              ) : (
                approved.map((item) => (
                  <div className="col-md-4 mb-3" key={item.id}>
                        <CoursesCardComponents {...item.course} statusLabel="approved" number={item.number} />
                  </div>
                ))
              )}
            </div>
          </Tab>

          <Tab eventKey="declined" title={t("profile.course-requests.declined")}>
          <div className="mb-4 row">
                <div className="col-lg-4">
                <CourseRequestSearchComponents />
                </div>
            </div>
            <div className="row">
              {declined.length === 0 ? (
                <p className="text-muted">{t("profile.course-requests.no-declined")}</p>
              ) : (
                declined.map((item) => (
                  <div className="col-md-4 mb-3" key={item.id}>
                     <CoursesCardComponents {...item.course} statusLabel="declined" number={item.number} />
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

export default CourseRequestClientPage;
