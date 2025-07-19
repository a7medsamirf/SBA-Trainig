// app/(dashboard)/dashboard/page.tsx
import { getStatistics, getCourseEnrollments } from "@/shared-apis";
import TrackingCardComponent from "./components/TrackingCard-component";
import SvgStatisticsbook from "@/components/icons/profile/statisticsbook";
import DashboardClientPage from "./components/DashboardClientPage";
import { SearchParamProps } from "@/models";

const DashboardPage = async ({ searchParams }: SearchParamProps) => {
  const stats = await getStatistics();
  const search =
  typeof searchParams === "object" && searchParams !== null && "search" in searchParams
    ? (searchParams.search as string) || ""
    : "";

      const [upcomingRes, ongoingRes, completedRes] = await Promise.all([
        getCourseEnrollments({ status: 1, keyword: search }),
        getCourseEnrollments({ status: 2, keyword: search }),
        getCourseEnrollments({ status: 3, keyword: search }),
      ]);

      const upcoming = Array.isArray(upcomingRes?.data) ? upcomingRes.data : [];
      const ongoing = Array.isArray(ongoingRes?.data) ? ongoingRes.data : [];
      const completed = Array.isArray(completedRes?.data) ? completedRes.data : [];

  const cards = [
    {
      value: stats?.total_enrollments || 0,
      label: "عدد الدورات",
      colorClass: "text-success",
      bgClass: "bg-success bg-opacity-10",
      iconColor: "#76A441",
    },
    {
      value: stats?.current_enrollments || 0,
      label: "الدورات الحالية",
      colorClass: "text-warning",
      bgClass: "bg-warning bg-opacity-10",
      iconColor: "#DD8C23",
    },
    {
      value: stats?.completed_enrollments || 0,
      label: "الدورات المكتملة",
      colorClass: "text-primary",
      bgClass: "bg-primary bg-opacity-10",
      iconColor: "#425A8B",
    },
    // {
    //   value: stats?.upcoming_enrollments || 0,
    //   label: "الدورات القادمة",
    //   colorClass: "text-info",
    //   bgClass: "bg-info bg-opacity-10",
    //   iconColor: "#17A2B8",
    // },
  ];

  return (
    <div className="p-5 mx-auto container-fluid">
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <h4 className="fw-bold color-gray-900">لوحة المتابعة</h4>
      </div>

      <div className="mb-4 row g-4 justify-content-center">
        {cards.map((card, idx) => (
          <div className="col-12 col-md-6 col-lg-4" key={idx}>
            <TrackingCardComponent
              icon={<SvgStatisticsbook color={card.iconColor} />}
              value={card.value}
              label={card.label}
              colorClass={card.colorClass}
              bgClass={card.bgClass}
            />
          </div>
        ))}
      </div>

      <DashboardClientPage  upcoming={upcoming}  ongoing={ongoing}  completed={completed} />

    </div>
  );
};

export default DashboardPage;
