import { SearchParamProps } from "@/models";
import CourseEnrollmentsClientPage from "./components/CourseEnrollmentsClientPage";
import { getCourseEnrollments } from "@/shared-apis";

const CourseEnrollmentsPage = async ({ searchParams }: SearchParamProps) => {
  const search =
    typeof searchParams === "object" && searchParams !== null && "search" in searchParams
      ? (searchParams.search as string) || ""
      : "";

      const [upcomingRes, completedRes] = await Promise.all([
        getCourseEnrollments({ status: 2, keyword: search }),
        getCourseEnrollments({ status: 3, keyword: search }),
      ]);

      const upcoming = Array.isArray(upcomingRes?.data) ? upcomingRes.data : [];
      const completed = Array.isArray(completedRes?.data) ? completedRes.data : [];

  return (
    <CourseEnrollmentsClientPage upcoming={upcoming} completed={completed} />
  );
};

export default CourseEnrollmentsPage;
