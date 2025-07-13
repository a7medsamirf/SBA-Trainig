import { toggleCourseFavorite } from "@/server-actions/favorite/add-course-favorite.action";
import { withCallbacks } from "@/utils";
import { useActionState, useTransition } from "react";
import toast from "react-hot-toast";

export const useAddCourseFavorite = () => {
  const addCourseFavoriteSubmit = withCallbacks(toggleCourseFavorite, {
    onSuccess: (result) => {
      result.message && toast.success(result.message);
    },
    onError: (error) => {
      error.error?.message && toast.error(error.error?.message);
    },
  });

  const [isPending, startTransition] = useTransition();

  const [_, addCourseFavoriteAction] = useActionState(
    // @ts-ignore
    addCourseFavoriteSubmit,
    undefined
  );

  const addCourseFavoriteHandler = (courseId: number) => {
    startTransition(() => {
      // @ts-ignore
      addCourseFavoriteAction({ course_id: courseId });
    });
  };

  return {
    addCourseFavoriteHandler,
    isPending,
  };
};
