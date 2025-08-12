import "./course-details.scss";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { Metadata } from "next";
import { getTranslations , getLocale } from "next-intl/server";
import { MapPin, TriangleAlert, Users } from "lucide-react";
import { getCourseById } from "@/shared-apis/Courses/get-courses-detail.api";
import { getSimilarCourses } from "@/shared-apis/Courses/get-similar-courses.api";
import { CourseData } from "@/models/Courses/courses-detail.model";
import UpsCard from "@/components/sections/ups/components/upsCard-component";
import { NewsletterSection } from "@/components/sections/newsletter/newsletter-section";
import RelatedCoursesComponent from "../components/RelatedCourses-component";
import SvgTimer from "@/components/icons/svg/timer";
import SvgCalendar2 from "@/components/icons/svg/calendar-2";
import Svgexport15 from "@/components/icons/svg/svgexport-15";
import SvgSvgexport16181 from "@/components/icons/svg/svgexport-16-18-1";
import CourseTabSections from "../components/CourseTab-sections";
import { SearchParamProps } from "@/models/search-params.model";
import ShareButtons from "@/components/common/SocialShare";
import AddToCartButtonComponent from "../components/AddToCartButton-component";
import CourseSubscribeClient from "../components/CourseSubscribeClient";
import { getCurrentUser } from "@/shared-apis/auth/get-current-user.api";
import {
  getCoursePayRequests,
  getEducationDegree,
  getLanguageLevels,
} from "@/shared-apis";


export async function generateMetadata({
  params,
}: SearchParamProps): Promise<Metadata> {
  const id = ((await params) as any)?.slug.split("-")[0]; 
  const course = await getCourseById(id);
  return {
    title: course?.data?.name || "تفاصيل الدورة",
  };
}

export default async function CourseDetailsPage({ params }: SearchParamProps) {
  const locale = await getLocale();
  const isArabic = locale.startsWith("ar");
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

  const isPastDate = new Date(course.start_date) < new Date();
  const t = await getTranslations("trans.training");

  if (!course) {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-12 d-grid justify-content-center align-items-center p-50">
            <h2 className="mb-20">{t("course-not-found")}</h2>
            <Link href="/training" className="w-auto btn btn-custom-primary">
              {t("back-to-courses")}
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
          <div className="row align-items-center">
            <div className="col-lg-5">
              <div className="mb-4 course-image rounded image-box">
              <span className="label bg-brand-2"> {t("course")}</span>
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
                    <div className="mb-3 col-md-8">
                      <div className="info-card">
                        <div className="gap-1 price-info d-flex">
                          <h3 className="color-brand-3">
                            {course.price}
                          </h3>
                          <Image
                            src="../../images/template/Saudi_Riyal.svg"
                            alt={""}
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: "25px", height: "auto" }}
                            className="price-img-Saudi"
                          />
                        </div>

                        <div className="gap-3 mt-3 d-flex justify-content-between">
                          <div className="gap-3 d-flex flex-column w-50">
                            <div className="gap-2 d-flex align-items-center">
                              <SvgTimer width={18} height={18} />
                              <span className="color-gray-900">
                                {course.duration}
                              </span>
                            </div>
                            <div className="gap-2 d-flex align-items-center">
                              <SvgCalendar2
                                color="#76A441"
                                width={20}
                                height={20}
                              />
                              <span className="color-gray-900">
                              {new Date(course.start_date).toLocaleDateString(locale, {
                                    weekday: "long",
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                    numberingSystem: isArabic ? "arab" : "latn",
                                  })}
                              </span>
                            </div>
                            <div className="gap-2 d-flex align-items-center">
                              <Svgexport15 width={18} height={18} />
                              <span className="color-gray-900">
                                {course.instructor?.name}
                              </span>
                            </div>
                          </div>
                          <div className="gap-3 d-flex flex-column">
                            <div className="gap-2 d-flex">
                              <MapPin
                                size={25}
                                strokeWidth={2}
                                color="#76A441"
                              />

                              <div className="d-grid">
                                <span className="mb-3 color-gray-900">
                                <a
                                   href={`https://www.google.com/maps?q=${course.place.latitude},${course.place.longitude}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary d-inline-block mt-1" >
                                  {course.place?.name}
                                  </a>
                             </span>

                                <span className="color-gray-900">
                                <a
                                   href={`https://www.google.com/maps?q=${course.place.latitude},${course.place.longitude}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary d-inline-block mt-1" >
                                  {course.place?.address}
                                  </a>
                               
                                </span>
                              </div>
                            </div>
                     
                         <div className="gap-2 d-flex">
                              <Users
                                size={18}
                                strokeWidth={2}
                                color="#76A441"
                              />
                              <div className="gap-2 mb-3 align-items-center d-grid">
                                  <div className="color-gray-900">
                                      {t("seats")} : {course.max_students} /
                                      <span
                                        className={`mx-1 ${
                                          Number(course.remaining_seats) > 0 ? "text-success" : "text-danger"
                                        }`}
                                      >
                                        {course.remaining_seats}
                                      {Number(course.remaining_seats) <= 0 && ` ${t("no-seats")}`}
                                      </span>
                                    </div>
                            
                              </div>
                            </div>
                          </div>
                        </div>
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
                {course?.last_pay_request?.status === 3 && (
                  <div className="mb-3 text-center w-fit">
                    <div
                      className="gap-3 mb-3 text-danger d-flex align-items-center"
                      role="alert"
                    >
                      <TriangleAlert />
                      <div> {t("request-rejected")} </div>
                    </div>

                    <p>{course?.last_pay_request?.rejected_reason}</p>
                  </div>
                )}
                {!isPastDate && (
                  <div className="d-flex gap-3 enrollment-card">
                {course?.last_pay_request?.status === 2 && (
                          <div className="d-flex  text-success text-center mb-4">
                            <span className="me-2">   {t("request-approved")} </span>
                              <SvgSvgexport16181 width={20} height={20} />
                          </div>
                          )} 
                    {(course?.last_pay_request?.status === 1 ||
                      course?.last_pay_request?.status === 3 ||
                      !course?.last_pay_request) && (
                      <CourseSubscribeClient
                        courseId={course.id.toString()}
                        languageLevels={languageLevels}
                        educationDegrees={educationDegrees}
                        status={course?.last_pay_request?.status}
                        user={user}
                        slug={slug}
                        course={course} 
                      />
                    )}
                    {course?.last_pay_request?.status === 2 && (
                      <AddToCartButtonComponent
                        courseId={course.id}
                        user={user}
                        slug={slug}
                        languageLevels={languageLevels}
                        educationDegrees={educationDegrees}
                      />
                    )}

                    {course?.last_pay_request?.status === 3 && (
                      <Link
                        href="/contact"
                        className="btn btn-buy btn-custom-primary btn-primary"
                      >
                        {t("contact-support")}
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mb-10 pt-30">
            <CourseTabSections courseId={id} />
          </div>

          <div className="mb-60 You-may-like mt-50">
            <div className="box">
              <h4 className="title color-brand-3"> {t("you-may-also-like")} </h4>
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
