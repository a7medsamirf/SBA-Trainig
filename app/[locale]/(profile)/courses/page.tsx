import { SearchParamProps } from "@/models";
import CourseEnrollmentsClientPage from "./components/CourseEnrollmentsClientPage";
import { getCourseEnrollments } from "@/shared-apis";

const CourseEnrollmentsPage = async ({ searchParams }: SearchParamProps) => {
  const search = ((await searchParams) as any).search || "";

  const [upcomingRes, ongoingRes, completedRes] = await Promise.all([
    getCourseEnrollments({ status: "upcoming", keyword: search }),
    getCourseEnrollments({ status: "ongoing", keyword: search }),
    getCourseEnrollments({ status: "completed", keyword: search }),
  ]);

  const upcoming = Array.isArray(upcomingRes?.data) ? upcomingRes.data : [];
  const ongoing = Array.isArray(ongoingRes?.data) ? ongoingRes.data : [];
  const completed = Array.isArray(completedRes?.data) ? completedRes.data : [];

  return (
    <CourseEnrollmentsClientPage upcoming={upcoming}  ongoing={ongoing}  completed={completed} />
  );
};

export default CourseEnrollmentsPage;
