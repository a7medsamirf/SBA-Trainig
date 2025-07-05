"use client";
import { SwiperSlide } from "swiper/react";
import ReusableSwiper from "@/components/common/Reusable-Swiper";
import ReusableTrainingCard from "@/components/common/Reusable-TrainingCard";
import { Course  } from "@/models";
/* import { useParams } from 'next/navigation'; */
import { slugify } from "@/utils/slugify"; // 👈 استدعاء الدالة

interface ProductsCardComponentProps {
  courses: Course[];
}

const generateSlug = (name: string) => name.toLowerCase().replace(/\s+/g, '-');
const ProductsCardComponent: React.FC<ProductsCardComponentProps> = ({ courses }) => {
/*   const { locale } = useParams(); */
  return (
    <>
       <ReusableSwiper
            slidesPerView={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1920: { slidesPerView: 5 },
            }}
            autoplayDelay={2500}
            >
       {courses && courses.length > 0 && courses.map((course: Course) => {
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
    </>
  )
}

export default ProductsCardComponent