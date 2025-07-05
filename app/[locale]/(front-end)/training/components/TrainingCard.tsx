"use client";
import React from "react";
import "./TrainingCard.scss";
import ReusableTrainingCard from "@/components/common/Reusable-TrainingCard";
import { Course } from "@/models";
import { slugify } from "@/utils/slugify"; // 👈 استدعاء الدالة
/* import {  useLocale} from "next-intl";  */

interface TrainingCardComponentProps {
  courses: Course[]; // مصفوفة مباشرة من الكورسات
}

const TrainingCardComponent: React.FC<TrainingCardComponentProps> = ({ courses }) => {
/*   const locale = useLocale(); */
  return (
    <div className="row">
      {courses.map((course) => {
         const slug = slugify(course.name);
         return (
        <div className="col-lg-3" key={course.id}>
          <ReusableTrainingCard
            id={course.id}
            category={course.category_name}
            title={course.name}
            image={course.image ? course.image : "/images/empty-img.png"}
            price={course.price}
            duration={course.duration}
            startDate={course.start_date}
            trainer={course.instructor_name}
            courseUrl={`/training/${course.id}-${slug}`}
           /*  courseUrl={`${locale === "en" ? "en" : "ar"}/training/${course.id}-${slug}`} */
            className=""
          />
        </div>
           );
          })}
    </div>
  );
};

export default TrainingCardComponent;
