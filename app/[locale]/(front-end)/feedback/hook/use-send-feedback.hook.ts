import { sendFeedback } from "@/server-actions/feedback/feedback.action";
import { withCallbacks } from "@/utils";
import { useActionState, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FeedbackQuestionData } from "@/models/feedback.model";
import { useRouter } from "@/i18n/routing";

interface UseSendFeedbackProps {
  feedbackData?: {
    data: FeedbackQuestionData[];
  };
}

export const useSendFeedback = (props?: UseSendFeedbackProps) => {
  const { control, register, handleSubmit, reset } = useForm();

  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const feedbackSubmit = withCallbacks(sendFeedback, {
    onSuccess: () => {
      toast.success("تم إرسال التقييم بنجاح");
      router.push("/courses");
    },
    onError: (error) => {
      toast.error(error?.message || "حدث خطأ أثناء إرسال التقييم");
    },
  });

  //   @ts-ignore
  const [, sendFeedbackAction] = useActionState(feedbackSubmit, null);

  const transformFormDataToApiFormat = (formData: any) => {
    const answers: any[] = [];

    if (!props?.feedbackData?.data) {
      return { answers };
    }

    // Iterate through each question to build the answer format
    props.feedbackData.data.forEach((question) => {
      const fieldName = `course_question_id_${question.course_question_id}`;
      const fieldValue = formData[fieldName];

      // Skip if no value provided
      if (
        fieldValue === undefined ||
        fieldValue === null ||
        fieldValue === ""
      ) {
        return;
      }

      let answerValue;

      // Transform based on question type
      switch (question.type.name) {
        case "text":
          answerValue = fieldValue; // String value
          break;
        case "select":
          // For select, convert to array format
          answerValue = Array.isArray(fieldValue) ? fieldValue : [fieldValue];
          break;
        case "rating":
          // For rating, convert to number
          answerValue = Array.isArray(fieldValue) ? fieldValue[0] : fieldValue;
          break;
        default:
          answerValue = fieldValue;
      }

      answers.push({
        course_question_id: question.course_question_id,
        answer: {
          type: question.type.name,
          value: answerValue,
        },
      });
    });

    return { answers };
  };

  const onSubmit = (data: any) => {
    console.log("🚀 ~ Raw form data:", data);

    const transformedData = transformFormDataToApiFormat(data);
    console.log("🚀 ~ Transformed data:", transformedData);

    startTransition(() => {
      // @ts-ignore
      sendFeedbackAction(transformedData);
    });
  };

  return {
    control,
    register,
    onSubmit,
    handleSubmit,
    isPending,
    reset,
  };
};
