'use client';
import { SwiperSlide } from "swiper/react";
import ReusableSwiper from "@/components/common/Reusable-Swiper";
import ReusableTrainingCard from "@/components/common/Reusable-TrainingCard";
import { SimilarCoursesResponse, Course } from "@/models";
import { slugify } from "@/utils/slugify";

interface RelatedCoursesComponentProps {
  courses: SimilarCoursesResponse;
}

const generateSlug = (name: string) => name.toLowerCase().replace(/\s+/g, '-');
const RelatedCoursesComponent: React.FC<RelatedCoursesComponentProps> = ({ courses }) => {
  const hasCourses = courses?.data && courses.data.length > 0;

  return (
    <>
      {hasCourses ? (
        <ReusableSwiper
          slidesPerView={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1920: { slidesPerView: 5 },
          }}
          autoplayDelay={2500}
        >
          {courses.data.map((course: Course) => {
            const slug = slugify(course.name);
            return (
              <SwiperSlide key={course.id}>
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
                />
              </SwiperSlide>
            );
          })}
        </ReusableSwiper>
      ) : (
        <p className="text-center color-gray-900 p-4">لا توجد دورات مشابهة حاليًا</p>
      )}
    </>
  );
}

export default RelatedCoursesComponent;
