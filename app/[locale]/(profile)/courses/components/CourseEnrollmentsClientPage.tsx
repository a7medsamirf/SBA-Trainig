"use client";
import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import CoursesCardComponent from "./CoursesCard-component";
import CoursesSearchComponents from "./CoursesSearch-components";

interface Props {
  upcoming: any[];
  completed: any[];
}

const CourseEnrollmentsClientPage = ({ upcoming, completed }: Props) => {
  const [key, setKey] = useState("upcoming");

  return (
    <div className="card border-0 custom-border-radius">
      <div className="card-header bg-white border-0 custom-border-radius p-4">
        <div className="profile-content-item-header">
          <h4 className="fw-bold color-gray-900">دوراتي الحضورية</h4>
        </div>
      </div>

      <div className="card-body p-4">
        <Tabs
          id="course-requests-tabs"
          activeKey={key}
          onSelect={(k) => setKey(k || "upcoming")}
          className="mb-4 nav nav-tabs nav-tabs-product d-inline-flex dashboard-tabs justify-content-center"
        >
          <Tab eventKey="upcoming" title="الحالية">
            <div className="row mb-4">
              <div className="col-lg-4">
                <CoursesSearchComponents />
              </div>
            </div>

            <div className="row">
              {upcoming.length === 0 ? (
                <p className="text-muted">لا توجد كورسات حالية.</p>
              ) : (
                upcoming.map((item) => (
                  <div className="col-md-4" key={`${item.course_id}-${item.qr_url}`}>
                    <CoursesCardComponent
                      category_name={item.course_category}
                      name={item.course_name}
                      image={item.course_image}
                      attendance_percentage={item.attendance_percentage}
                      qr_url={item.qr_url}
                      certificate_url={item.certificate_url}
                    />
                  </div>
                ))
              )}
            </div>
          </Tab>

          <Tab eventKey="completed" title="المكتملة">
            <div className="row mb-4">
              <div className="col-lg-4">
                <CoursesSearchComponents />
              </div>
            </div>

            <div className="row">
              {completed.length === 0 ? (
                <p className="text-muted">لا توجد كورسات مكتملة.</p>
              ) : (
                completed.map((item) => (
                  <div className="col-md-4" key={`${item.course_id}-${item.qr_url}`}>
                    <CoursesCardComponent
                      category_name={item.course_category}
                      name={item.course_name}
                      image={item.course_image}
                      attendance_percentage={item.attendance_percentage}
                      qr_url={item.qr_url}
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
