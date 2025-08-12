import React from "react";
import CourseContentComponent from "./CourseDetailsTab/CourseContent-component";
import CourseIncludesComponent from "./CourseDetailsTab/CourseIncludes-component";
import { getCourseClientById } from "@/shared-apis/Courses/get-client-courses-detail.api";
import { getTranslations } from "next-intl/server";

interface CourseTabSectionsProps {
  courseId: string | number;
}

const CourseTabSections = async ({ courseId }: CourseTabSectionsProps) => {
  const t = await getTranslations("trans.training");
  const data = await getCourseClientById(courseId);

  const hasCourseContent = data?.data?.contents?.length > 0;

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
            {t("course-description")}
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
            {t("final-objectives")}
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
            {t("attendance-requirements")}
          </a>
        </li>
        {hasCourseContent && (
          <li>
            <a
              href="#tab-Coursecontent"
              data-bs-toggle="tab"
              role="tab"
              aria-controls="tab-Coursecontent"
              aria-selected="false"
            >
              {t("course-content")}
            </a>
          </li>
        )}
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
            dangerouslySetInnerHTML={{
              __html: data?.data?.detail?.details || t("no-details"),
            }}
          />
        </div>

        <div
          className="tab-pane fade"
          id="tab-objectives"
          role="tabpanel"
          aria-labelledby="tab-objectives"
        >
          <div
            className="font-md color-gray-500"
            dangerouslySetInnerHTML={{
              __html: data?.data?.detail?.goal || t("no-objectives"),
            }}
          />
        </div>

        <div
          className="tab-pane fade"
          id="tab-requirements"
          role="tabpanel"
          aria-labelledby="tab-requirements"
        >
          <div className="mb-4 course-requirements">
            <div
              className="font-md color-gray-500"
              dangerouslySetInnerHTML={{
                __html:
                  data?.data?.detail?.attendance_requirement ||
                  t("no-requirements"),
              }}
            />
          </div>
        </div>

        {hasCourseContent && (
          <div
            className="tab-pane fade"
            id="tab-Coursecontent"
            role="tabpanel"
            aria-labelledby="tab-Coursecontent"
          >
            <div className="mb-4 course-requirements">
              <div className="row">
                <div className="col-lg-9">
                  <CourseContentComponent
                    sections={data?.data?.contents || []}
                  />
                </div>
                <div className="col-lg-3 mt-30">
                  <CourseIncludesComponent courseDetail={data?.data?.detail} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CourseTabSections;
