// app/(dashboard)/dashboard/page.tsx
import { getStatistics, getCourseEnrollments } from "@/shared-apis";
import TrackingCardComponent from "./components/TrackingCard-component";
import SvgStatisticsbook from "@/components/icons/profile/statisticsbook";
import DashboardClientPage from "./components/DashboardClientPage";
import { SearchParamProps } from "@/models";
import { getTranslations } from "next-intl/server";

const DashboardPage = async ({ searchParams }: SearchParamProps) => {
  const t = await getTranslations("trans.dashboard");
  const stats = await getStatistics();
  const search =
  typeof searchParams === "object" && searchParams !== null && "search" in searchParams
    ? (searchParams.search as string) || ""
    : "";

      const [upcomingRes, ongoingRes, completedRes] = await Promise.all([
        getCourseEnrollments({ status: "upcoming", keyword: search }),
        getCourseEnrollments({ status: "ongoing", keyword: search }),
        getCourseEnrollments({ status: "completed", keyword: search }),
      ]);

      const upcoming = Array.isArray(upcomingRes?.data) ? upcomingRes.data : [];
      const ongoing = Array.isArray(ongoingRes?.data) ? ongoingRes.data : [];
      const completed = Array.isArray(completedRes?.data) ? completedRes.data : [];
 
  const cards = [
    {
      value: stats?.total_enrollments || 0,
      label: t("total-enrollments"),
      colorClass: "text-success",
      bgClass: "bg-success bg-opacity-10",
      iconColor: "#76A441",
    },
    {
      value: stats?.current_enrollments || 0,
      label: t("current-enrollments"),
      colorClass: "text-warning",
      bgClass: "bg-warning bg-opacity-10",
      iconColor: "#DD8C23",
    },
    {
      value: stats?.completed_enrollments || 0,
      label: t("completed-enrollments"),
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
        <h4 className="fw-bold color-gray-900"> {t("dashboard-title")}  </h4>
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
