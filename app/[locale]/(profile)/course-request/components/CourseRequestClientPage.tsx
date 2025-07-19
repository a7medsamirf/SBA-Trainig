"use client";
import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import  CoursesCardComponents from "./CoursesCard-component";
import CourseRequestSearchComponents from "./CourseRequestSearch-components";

interface Props {
  pending: any[];
  approved: any[];
  declined: any[];
}

const CourseRequestClientPage = ({ pending, approved, declined }: Props) => {
  
  const [key, setKey] = useState("pending");

  return (
      <div className="card border-0 custom-border-radius">
      <div className="card-header bg-white border-0 custom-border-radius p-4">
        <div className="profile-content-item-header">
          <h4 className="fw-bold color-gray-900"> طلباتي</h4>
        </div>
      </div>
      <div className="card-body p-4">
   
        <Tabs
          id="course-requests-tabs"
          activeKey={key}
          onSelect={(k) => setKey(k || "pending")}
          className="mb-4 nav nav-tabs nav-tabs-product d-inline-flex dashboard-tabs justify-content-center"
        >
          <Tab eventKey="pending" title="قيد الانتظار">
            <div className="row mb-4">
                <div className="col-lg-4">
                <CourseRequestSearchComponents />
                </div>
            </div>

            <div className="row">
              {pending.length === 0 ? (
                <p className="text-muted">لا توجد طلبات معلقة.</p>
              ) : (
                pending.map((item) => (
                  <div className="col-md-4" key={item.id}>
                    <CoursesCardComponents {...item.course} statusLabel="pending" />
                  </div>
                ))
              )}
            </div>
          </Tab>

          <Tab eventKey="approved" title="تم الموافقة">
          <div className="row mb-4">
                <div className="col-lg-4">
                <CourseRequestSearchComponents />
                </div>
            </div>
            <div className="row">
              {approved.length === 0 ? (
                <p className="text-muted">لا توجد طلبات مقبولة.</p>
              ) : (
                approved.map((item) => (
                  <div className="col-md-4" key={item.id}>
                        <CoursesCardComponents {...item.course} statusLabel="approved" />
                  </div>
                ))
              )}
            </div>
          </Tab>

          <Tab eventKey="declined" title="تم الرفض">
          <div className="row mb-4">
                <div className="col-lg-4">
                <CourseRequestSearchComponents />
                </div>
            </div>
            <div className="row">
              {declined.length === 0 ? (
                <p className="text-muted">لا توجد طلبات مرفوضة.</p>
              ) : (
                declined.map((item) => (
                  <div className="col-md-4" key={item.id}>
                     <CoursesCardComponents {...item.course} statusLabel="declined" />
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
