import React from "react";
import CourseContentComponent from "./CourseDetailsTab/CourseContent-component";
import CourseIncludesComponent from "./CourseDetailsTab/CourseIncludes-component";
import { auth } from "@/auth";
import { getLocale } from "next-intl/server";
import { getCourseClientById } from "@/shared-apis/Courses/get-client-courses-detail.api";


interface CourseTabSectionsProps {
  courseId: string | number;
}

const CourseTabSections = async ({ courseId }: CourseTabSectionsProps) => {

  const session = await auth();
  const lang = await getLocale();
  const data = await getCourseClientById(courseId, session?.user);

  return (
    <>
      <ul className="nav nav-tabs nav-tabs-product" role="tablist">
        <li>
          <a
            className="active"
            href="#tab-description"
            data-bs-toggle="tab"
            role="tab"
            aria-controls="tab-description"
            aria-selected="true"
          >
            وصف الدورة
          </a>
        </li>
        <li>
          <a
            href="#tab-objectives"
            data-bs-toggle="tab"
            role="tab"
            aria-controls="tab-objectives"
            aria-selected="false"
          >
            أهداف الأداء النهائية
          </a>
        </li>
        <li>
          <a
            href="#tab-requirements"
            data-bs-toggle="tab"
            role="tab"
            aria-controls="tab-requirements"
            aria-selected="false"
          >
            متطلبات الحضور
          </a>
        </li>
        <li>
          <a
            href="#tab-Coursecontent"
            data-bs-toggle="tab"
            role="tab"
            aria-controls="tab-Coursecontent"
            aria-selected="false"
          >
            محتوى الدورة
          </a>
        </li>
      </ul>

      <div className="tab-content">
        <div
          className="tab-pane fade active show"
          id="tab-description"
          role="tabpanel"
          aria-labelledby="tab-description"
        >
        
          <div
              className="font-md color-gray-500"
              dangerouslySetInnerHTML={{ __html: data?.data?.detail?.details || "" }}
            >
              
            </div>
        </div>

        <div
          className="tab-pane fade"
          id="tab-objectives"
          role="tabpanel"
          aria-labelledby="tab-objectives"
        >
          <div
              className="font-md color-gray-500"
              dangerouslySetInnerHTML={{ __html: data?.data?.detail?.goal || "" }}
            >

            </div>
        </div>

        <div
          className="tab-pane fade"
          id="tab-requirements"
          role="tabpanel"
          aria-labelledby="tab-requirements"
        >
          <div className="course-requirements mb-4">
          <div
              className="font-md color-gray-500"
              dangerouslySetInnerHTML={{ __html: data?.data?.detail?.attendance_requirement || "لا توجد متطلبات" }}
            ></div>
          </div>
        </div>

        <div
          className="tab-pane fade"
          id="tab-Coursecontent"
          role="tabpanel"
          aria-labelledby="tab-Coursecontent"
        >
          <div className="course-requirements mb-4">
            <div className="row">
              <div className="col-lg-9">
                <CourseContentComponent sections={data?.data?.contents || []} />
              </div>
              <div className="col-lg-3 mt-30">
                <CourseIncludesComponent courseDetail={data?.data?.detail} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseTabSections;
