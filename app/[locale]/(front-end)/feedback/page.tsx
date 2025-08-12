import React from "react";
import "./feedback.scss";
import RatingFormComponent from "./components/RatingForm-component";
import { SearchParamProps } from "@/models";
import { getCourseFeedback } from "@/shared-apis";

// Import shared types
import { FeedbackApiResponse } from "@/models/feedback.model";

export default async function page({ searchParams }: SearchParamProps) {
  const course_id = ((await searchParams) as any).course_id as any;

  const feedbackData = (await getCourseFeedback(
    course_id
  )) as FeedbackApiResponse;

  return (
    <div className="container mt-5 rating-form-container">
      <h4 className="py-10 fw-bold color-gray-900">تقييم الدورة</h4>
      <div className="p-4 shadow-none card custom-border">
        <RatingFormComponent
          feedbackData={feedbackData}
          courseId={course_id?.toString()}
        />
      </div>
    </div>
  );
}