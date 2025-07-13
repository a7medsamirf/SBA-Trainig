import "./course-details.scss";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { Metadata } from "next";
import { getCourseById } from "@/shared-apis/Courses/get-courses-detail.api";
import { getSimilarCourses } from "@/shared-apis/Courses/get-similar-courses.api";
import { CourseData } from "@/models/Courses/courses-detail.model";
import UpsCard from "@/components/sections/ups/components/upsCard-component";
import { NewsletterSection } from "@/components/sections/newsletter/newsletter-section";
import RelatedCoursesComponent from "../components/RelatedCourses-component";
import CourseTabSections from "../components/CourseTab-sections";
import { SearchParamProps } from "@/models/search-params.model";
import ShareButtons from "@/components/common/SocialShare";
import AddToCartButtonComponent from "../components/AddToCartButton-component";
import CourseSubscribeClient from "../components/CourseSubscribeClient";
import { getCurrentUser } from "@/shared-apis/auth/get-current-user.api";
import { getEducationDegree, getLanguageLevels } from "@/shared-apis";

// 👇 توليد Metadata للـ SEO
export async function generateMetadata({
  params,
}: SearchParamProps): Promise<Metadata> {
  const id = ((await params) as any)?.slug.split("-")[0]; // استخراج ID من slug
  const course = await getCourseById(id);
  return {
    title: course?.data?.name || "تفاصيل الدورة",
  };
}

export default async function CourseDetailsPage({ params }: SearchParamProps) {
  const slug = ((await params) as any)?.slug;
  const id = slug.split("-")[0];
  const newID = decodeURIComponent(id);

  const similarCoursesResponse = await getSimilarCourses(newID);
  const coursesData = similarCoursesResponse || null;

  const coursesResponse = await getCourseById(newID);

  const user = await getCurrentUser();

  const languageLevels = await getLanguageLevels();

  const educationDegrees = await getEducationDegree();

  const course: CourseData = coursesResponse?.data || {};

  if (!course) {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-12 d-grid justify-content-center align-items-center p-50">
            <h2 className="mb-20">الدورة غير موجودة</h2>
            <Link href="/training" className="w-auto btn btn-custom-primary">
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
              <div className="mb-4 course-image">
                <Image
                  src={course.image ? course.image : "/images/empty-img.png"}
                  alt={course.name}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "100%" }}
                  className="w-100 card-img-top"
                />
              </div>
            </div>
            <div className="col-lg-7">
              <div className="course-details">
                <div className="mb-4 course-header">
                  <span className="mb-2 color-gray-900">
                    {course.category_name}
                  </span>
                  <h1 className="mb-3 color-gray-900">{course.name}</h1>
                </div>

                <div className="mb-4 course-info">
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <div className="info-card">
                        <div className="gap-1 price-info d-flex">
                          <h3 className="mb-20 color-brand-3">
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
                          <li>
                            تاريخ البدء: {course.start_date.split("T")[0]}
                          </li>
                          <li>السعر: {course.price}</li>
                          <li>الفئة: {course.category_name}</li>
                        </ul>
                        <div className="gap-3 mt-20 d-flex align-items-center">
                          <span className="color-gray-900">Share</span>
                          <ShareButtons
                            post={{ slug: newID, title: course.name }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-4 course-sidebar">
                <div className="gap-3 enrollment-card d-flex">
                  <CourseSubscribeClient
                    courseId={course.id.toString()}
                    languageLevels={languageLevels}
                    educationDegrees={educationDegrees}
                    user={user}
                    slug={slug}
                  />
                  <AddToCartButtonComponent
                    courseId={course.id}
                    user={user}
                    slug={slug}
                    languageLevels={languageLevels}
                    educationDegrees={educationDegrees}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mb-10 pt-30">
            <CourseTabSections courseId={id} />
          </div>

          <div className="mb-60 You-may-like mt-50">
            <div className="box">
              <h4 className="title color-brand-3">قد يعجبك أيضًا</h4>
              <div className="slider mb-30">
                {coursesData && (
                  <RelatedCoursesComponent courses={coursesData} />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mb-60 section-box mt-50">
        <div className="container">
          <div className="row">
            <UpsCard className="my-3 UpsCard-border my-md-0" />
          </div>
        </div>
      </div>

      <NewsletterSection />
    </>
  );
}
