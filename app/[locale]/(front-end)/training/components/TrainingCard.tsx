"use client";
import React from "react";
import "./TrainingCard.scss";
import ReusableTrainingCard from "@/components/common/Reusable-TrainingCard";
import { Course } from "@/models";
import { slugify } from "@/utils/slugify"; 


interface TrainingCardComponentProps {
  courses: Course[]; // مصفوفة مباشرة من الكورسات
}
const generateSlug = (name: string) => name.toLowerCase().replace(/\s+/g, "-");

const TrainingCardComponent: React.FC<TrainingCardComponentProps> = ({
  courses,
}) => {

  return (
    <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
            {courses.map((course) => {
              const slug = slugify(course.name);
              return (
                <div className="col" key={course.id}>
                  <ReusableTrainingCard
                    id={course.id}
                    slug={generateSlug(course.name)}
                    category={course.category_name}
                    title={course.name}
                    image={course.image ? course.image : "/images/empty-img.png"}
                    price={course.price}
                    duration={course.duration}
                    startDate={course.start_date}
                    trainer={course.instructor_name}
                    isFavorited={course.is_favorited}
                    canReserve={course.can_reserve}
                    className=""
                  />
                </div>
              );
            })}

    </div>
  );
};

export default TrainingCardComponent;
