"use client";

import { Button, Spinner } from "react-bootstrap";

import {
  FeedbackQuestionData,
  FeedbackApiResponse,
} from "@/models/feedback.model";
import { RadioGroup, Input, SelectInput } from "@/components";
import { useSendFeedback } from "../hook/use-send-feedback.hook";

interface FeedbackFormProps {
  feedbackData: FeedbackApiResponse;
  courseId?: string;
}

const RatingFormComponent: React.FC<FeedbackFormProps> = ({
  feedbackData,
  courseId,
}) => {
  const { control, handleSubmit, onSubmit, isPending } = useSendFeedback({
    feedbackData,
  });

  const renderQuestionByType = (
    question: FeedbackQuestionData,
    index: number
  ) => {
    const questionIndex = index + 1;

    switch (question.type.name) {
      case "rating":
        return (
          <RadioGroup
            key={question.id}
            control={control}
            label={`${questionIndex} - ${question.name}`}
            name={`course_question_id_${question.course_question_id}`}
            options={question.answers || []}
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option.id}
            required
            
            gridNumber={5}
          />
        );

      case "select":
        return (
          <SelectInput
            key={question.id}
            control={control}
            label={`${questionIndex} - ${question.name}`}
            name={`course_question_id_${question.course_question_id}`}
            className="select-input"
            labelClassName="!text-[#425A8B] !text-lg !font-medium"
            options={question.answers || []}
            getOptionLabel={(option: any) => option.name}
            getOptionValue={(option: any) => option.id}
            required
          />
        );

      case "text":
        return (
          <Input
            key={question.id}
            control={control}
            label={`${questionIndex} - ${question.name}`}
            name={`course_question_id_${question.course_question_id}`}
            type="textarea"
            floating={false}
            labelClassName="!text-[#425A8B] !text-lg !font-medium"
            required
          />
        );

      default:
        return (
          <div key={question.id} className="feedback-question-error">
            <p className="text-danger">
              نوع السؤال غير مدعوم: {question.type.name}
            </p>
          </div>
        );
    }
  };

  if (!feedbackData?.data || feedbackData.data.length === 0) {
    return (
      <div className="p-4 rating-form">
        <div className="text-center">
          <p className="text-muted">لا توجد أسئلة متاحة للتقييم</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 rating-form">
      <div className="mb-4 feedback-header">
        <p className="font-sm color-gray-700 mb-30">
          شاركنا رأيك في هذه الدورة التدريبية لمساعدتنا في التحسين المستمر
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="feedback-form">
        <div className="feedback-questions">
          {feedbackData.data.map((question, index) => (
            <div key={question.id} className="mb-4 feedback-question-wrapper">
              {renderQuestionByType(question, index)}
            </div>
          ))}
        </div>

        <div className="mt-4 feedback-actions">
          <Button
            disabled={isPending}
            variant="primary"
            type="submit"
            className="w-auto btn btn-buy btn-custom-primary"
          >
            {isPending ? "جاري الإرسال..." : "إرسال التقييم"}

            {isPending && (
              <Spinner size="sm" className="mx-1" variant="light" />
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RatingFormComponent;
