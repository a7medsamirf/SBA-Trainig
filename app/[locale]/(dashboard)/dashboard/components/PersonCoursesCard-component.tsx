"use client";
import Image from "next/image";
import '../dashboard.scss';

// Sample course data array
const courseData = [
  {
    id: 1,
    image: "/images/courses/AIInProduction.jpg",
    category: "الصحافة التلفزيونية والإذاعية",
    name: "التقرير التلفزيوني الإبداعي",
    progress: 85
  },
  {
    id: 2,
    image: "/images/courses/ComprehensiveMediaSkills.jpg",
    category: "مهارات الإعلام الشاملة",
    name: "أساسيات الإنتاج الإعلامي",
    progress: 60
  },
  {
    id: 3,
    image: "/images/courses/ContentForDigitalMedia.jpg",
    category: "المحتوى الرقمي",
    name: "إنتاج المحتوى للوسائط الرقمية",
    progress: 45
  },
  {
    id: 4,
    image: "/images/courses/AIInProduction.jpg",
    category: "الذكاء الاصطناعي",
    name: "الذكاء الاصطناعي في الإنتاج",
    progress: 30
  },
  {
    id: 5,
    image: "/images/courses/ComprehensiveMediaSkills.jpg",
    category: "التصوير الصحفي",
    name: "أساسيات التصوير الصحفي",
    progress: 75
  },
  {
    id: 6,
    image: "/images/courses/ContentForDigitalMedia.jpg",
    category: "التحرير الإعلامي",
    name: "فن التحرير الإعلامي",
    progress: 90
  },
  {
    id: 7,
    image: "/images/courses/AIInProduction.jpg",
    category: "البث المباشر",
    name: "تقنيات البث المباشر",
    progress: 55
  },

];

export const PersonCoursesCardComponent = () => {
  return (
    <>
      <div className="row">
        {courseData.map((course) => (
          <div key={course.id} className="col-lg-3 col-md-6 col-sm-12 mb-4">
            <div className="current-course-card">
              <div className="course-details">
                <Image
                  src={course.image}
                  alt={course.name}
                  width={100}
                  height={100}
                />
                <div className="course-info mb-3">
                  <p className="course-category">{course.category}</p>
                  <h5 className="course-name">{course.name}</h5>
                  <div className="mt-2">
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: `${course.progress}%` }}
                        aria-valuenow={course.progress}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      ></div>
                    </div>
                    <p className="progress-text">{course.progress}% مكتمل</p>
                  </div>
                </div>
              </div>

              <div className="course-actions">
                <button className="btn btn-cart btn-outline-custom btn-sm">
                  عرض QR Code
                </button>
                <button className="btn btn-buy btn-custom-primary btn btn-primary btn-sm">
                  عرض التفاصيل
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

