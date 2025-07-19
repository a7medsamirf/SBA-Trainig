"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, Tab } from "react-bootstrap";

const DashboardTabsComponents = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get("status")  || "upcoming"  ;

  const handleSelect = (key: string | null) => {
    if (!key) return;
    router.push(`?status=${key}`);
  };

  return (
    <Tabs
      defaultActiveKey={current}
      activeKey={current}
      onSelect={handleSelect}
      className="mb-4 nav nav-tabs nav-tabs-product d-inline-flex dashboard-tabs justify-content-center"

    >
      <Tab  tabClassName="text-dark fw-bold"  eventKey="ongoing" title="الحالية" />
      <Tab  tabClassName="text-dark fw-bold"  eventKey="completed" title="المكتملة" />
      <Tab  tabClassName="text-dark fw-bold"  eventKey="upcoming" title="القادمة" />
    </Tabs>
  );
};

export default DashboardTabsComponents;


