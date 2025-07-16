"use client";
import { Tab, Tabs } from "react-bootstrap";
import CoursesSearchComponents from "./components/CoursesSearch-components";
import { CoursesCardComponent } from "./components/CoursesCard-component";

const CoursesPage = () => {
  return (
    <div className="card border-0 custom-border-radius">
      <div className="card-header bg-white border-0 custom-border-radius p-4">
        <div className="profile-content-item-header">
          <h4 className="fw-bold color-gray-900">دوراتي الحضورية</h4>
        </div>
      </div>
      <div className="card-body p-4">
        <Tabs
          defaultActiveKey="current"
          id="courses-tabs"
          className="mb-4 nav nav-tabs nav-tabs-product d-inline-flex dashboard-tabs justify-content-center"
          variant="tabs"
        >
          <Tab
            eventKey="current"
            title="الحالية"
            tabClassName="text-dark fw-bold" 
          >
            <div className="mb-4 row">
              <div className="col-lg-3">
                <CoursesSearchComponents />
              </div>
            </div>
            <CoursesCardComponent />
          </Tab>

          <Tab
            eventKey="completed"
            title="المكتملة"
            tabClassName="text-dark fw-bold"
          >
            <div className="font-md color-gray-500">أهداف الأداء النهائية</div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default CoursesPage;
