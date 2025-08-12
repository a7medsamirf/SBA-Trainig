import { subscribeCourse } from "@/server-actions/course.action";
import { withCallbacks } from "@/utils";
import { useActionState, useTransition } from "react";
import { toast } from "react-hot-toast";
import { useTranslations } from "next-intl";

export const useSubscribeCourse = (courseId: string, slug: string) => {
  const t = useTranslations("trans.subscription");

  const subscribeSubmit = withCallbacks(subscribeCourse, {
    onSuccess: (data) => {
      if (data.success === false) {
        toast.error(data.message || t("subscription-failed"));
      } else {
        toast.success(t("subscription-request-sent"));
      }
    },
    onError: (error) => {
      const message =
        error?.error?.message ||
        error?.error?.errors?.course_id?.[0] ||
      t("subscription-error");

      toast.error(message);
    },
  });

  const [, subscribeAction] = useActionState(subscribeSubmit, undefined);
  const [isPending, startTransition] = useTransition();

  const handleSubscribe = () => {
    startTransition(() => {
      subscribeAction({
        course_id: courseId,
        slug,
      });
    });
  };

  return {
    isPending,
    handleSubscribe,
  };
};
