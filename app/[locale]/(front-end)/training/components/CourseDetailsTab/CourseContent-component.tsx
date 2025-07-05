import React from "react";
import { CourseContent } from "@/models/Courses/courses-detail.model";
import "./CourseContent-component.scss";
import SvgVideoFrame from '@/components/icons/svg/video-frame';

interface Props {
  sections: CourseContent[];
}

const CourseContentComponent = ({ sections }: Props) => {
  const totalLectures = sections.reduce((acc, cur) => acc + cur.sessions.length, 0);
  const totalDuration = Math.round(
    sections.reduce((acc, cur) => acc + cur.sessions_duration, 0) / 60
  );

  return (
    <div className="course-accordion-wrapper">
      <div className="d-flex align-items-center mb-2 course-accordion-header">
      <span className="course-accordion-meta">{sections.length} أقسام .</span>
        <span className="course-accordion-meta">
          {totalLectures} محاضرة . {totalDuration} ساعة
        </span>
     
      </div>

      <div className="accordion course-content-accordion" id="courseAccordion">
        {sections.map((section, idx) => (
          <div className="accordion-item" key={section.id}>
            <h2 className="accordion-header" id={`heading${idx}`}>
              <button
                className={`accordion-button ${idx === 0 ? "" : "collapsed"}`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse${idx}`}
                aria-expanded={idx === 0 ? "true" : "false"}
                aria-controls={`collapse${idx}`}
              >
                <div className="d-flex flex-column w-100 align-items-start">
                  <span className="fw-bold section-title">{section.name}</span>
                  <span className="text-muted section-duration small">
                  <strong className="text-secandary">  {section.sessions.length} محاضرة .  </strong> 
                  <small>{section.sessions_duration} دقيقة</small>
                  </span>
                </div>
              </button>
            </h2>

            <div
              id={`collapse${idx}`}
              className={`accordion-collapse collapse${idx === 0 ? " show" : ""}`}
              aria-labelledby={`heading${idx}`}
              data-bs-parent="#courseAccordion"
            >
              <div className="accordion-body">
                {section.sessions.length > 0 ? (
                  <ul className="list-unstyled lectures-list">
                    {section.sessions.map((session, lidx) => (
                      <li
                        key={session.id}
                        className="lecture-item mb-2"
                      >
                        <span className="lecture-index mb-5">
                          {lidx + 1}. {session.name}
                        </span>
                        <span className="lecture-duration d-flex text-muted small">
                        <SvgVideoFrame width={20} height={20} style={{ marginLeft: 4, verticalAlign: 'middle' }} />

                          {session.duration} دقيقة

                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="lecture-placeholder-list">
                    <div className="lecture-placeholder" />
                    <div className="lecture-placeholder" />
                    <div className="lecture-placeholder" />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseContentComponent;
