import './course-details.scss';
import React from 'react';
import { Link } from "@/i18n/routing";
import Image from 'next/image';
import { Metadata } from 'next';
import { getCourseById } from '@/shared-apis/Courses/get-courses-detail.api';
import { getSimilarCourses } from "@/shared-apis/Courses/get-similar-courses.api";
import { CourseData } from "@/models/Courses/courses-detail.model";
import UpsCard from '@/components/sections/ups/components/upsCard-component';
import NewsletterSection from '@/components/sections/newsletter/newsletter-section';
import RelatedCoursesComponent from '../components/RelatedCourses-component';
import CourseTabSections from '../components/CourseTab-sections';
import { SearchParamProps } from '@/models/search-params.model';
import ShareButtons from '@/components/common/SocialShare';


// 👇 توليد Metadata للـ SEO
export async function generateMetadata({params,}: SearchParamProps): Promise<Metadata> {

  const id = (await params as any)?.slug.split("-")[0] // استخراج ID من slug
  const course = await getCourseById(id);
  return {
    title: course?.data?.name || "تفاصيل الدورة",
  };
}


export default async function CourseDetailsPage({  params, }: SearchParamProps) {

  const id = (await params as any)?.slug.split("-")[0]
  const newID = decodeURIComponent(id)
  console.log(newID);

  const similarCoursesResponse = await getSimilarCourses(newID);
  const coursesData = similarCoursesResponse || null;

  const coursesResponse = await getCourseById(newID);
  const course: CourseData = coursesResponse?.data || {};

  if (!course) {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-12 d-grid justify-content-center align-items-center p-50">
            <h2 className="mb-20">الدورة غير موجودة</h2>
            <Link href="/training" className="btn btn-custom-primary w-auto">
              العودة إلى الدورات
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="section-box mt-30">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="course-image mb-4">
                <Image
                  src={course.image ? course.image : "/images/empty-img.png"}
                  alt={course.name}
                  width={800}
                  height={400}
                  className="img-fluid rounded"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
            <div className="col-lg-7">
              <div className="course-details">
                <div className="course-header mb-4">
                  <span className="color-gray-900 mb-2">
                    {course.category_name}
                  </span>
                  <h1 className="color-gray-900 mb-3">{course.name}</h1>
                </div>

                <div className="course-info mb-4">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <div className="info-card">
                        <div className="price-info d-flex gap-1">
                          <h3 className="color-brand-3 mb-20">
                            {course.price}
                          </h3>
                          <Image
                            src="../../images/template/Saudi_Riyal.svg"
                            alt={""}
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: "4%", height: "auto" }}
                            className="price-img-Saudi"
                          />
                        </div>

                        <ul className="list list-dot" itemType="disc">
                          <li>مدة الدورة: {course.duration}</li>
                          <li>تاريخ البدء: {course.start_date}</li>
                          <li>السعر: {course.price}</li>
                          <li>الفئة: {course.category_name}</li>
                        </ul>
                        <div className="mt-20 d-flex gap-3 align-items-center">
                          <span className="color-gray-900">Share</span>
                          <ShareButtons post={{ slug: newID, title: course.name }} />


                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="course-sidebar mb-4">
                <div className="enrollment-card d-flex gap-3 ">
                  <Link
                    href={`/subscribe`}
                    className="btn btn-buy btn-custom-primary btn btn-primary"
                  >
                    اشترك الآن
                  </Link>
                  <Link
                    href="/cart"
                    className="btn btn-cart btn-outline-custom"
                  >
                    اضف الي السلة
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-30 mb-10">
            <CourseTabSections courseId={id} />
          </div>

          <div className="You-may-like mt-50 mb-60">
            <div className="box">
              <h4 className="title color-brand-3">قد يعجبك أيضًا</h4>
              <div className="slider mb-30">
                {coursesData && <RelatedCoursesComponent courses={coursesData} />}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-box mt-50 mb-60">
        <div className="container">
          <div className="row">
            <UpsCard className="UpsCard-border my-md-0 my-3" />
          </div>
        </div>
      </div>

      <NewsletterSection />
    </>
  );
};

