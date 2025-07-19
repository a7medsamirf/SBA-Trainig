// app/(dashboard)/[locale]/course-requests/page.tsx
import { SearchParamProps } from "@/models";
import CourseRequestClientPage from "./components/CourseRequestClientPage";
import { getCoursePayRequests } from "@/shared-apis";

const CourseRequestPage = async ({ searchParams }: SearchParamProps) => {
  const search =
    typeof searchParams === "object" && searchParams !== null && "search" in searchParams
      ? (searchParams.search as string) || ""
      : "";

  const [pendingRes, approvedRes, declinedRes] = await Promise.all([
    getCoursePayRequests({ status: 1, keyword: search }),
    getCoursePayRequests({ status: 2, keyword: search }),
    getCoursePayRequests({ status: 3, keyword: search }),
  ]);

  const pending = Array.isArray(pendingRes?.data) ? pendingRes.data : [];
  const approved = Array.isArray(approvedRes?.data) ? approvedRes.data : [];
  const declined = Array.isArray(declinedRes?.data) ? declinedRes.data : [];

  return (
    <CourseRequestClientPage
      pending={pending}
      approved={approved}
      declined={declined}
    />
  );
};

export default CourseRequestPage;
