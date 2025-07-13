'use client';

import React, { useEffect, useState } from 'react';
import TrackingCardComponent from './TrackingCard-component';
import { getStatistics } from '@/shared-apis'; // غيّر المسار حسب مكان API
/* import { FaBell, FaShoppingCart, FaCheckCircle, FaCalendarAlt } from 'react-icons/fa'; */

const DashboardTrackingSection = () => {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const fetchStats = async () => {
      const res = await getStatistics();
      setStats(res?.data);
    };

    fetchStats();
  }, []);

  if (!stats) return <p>...جاري التحميل</p>;

  return (
    <div className="row g-4">
      <div className="col-md-6 col-lg-3">
        <TrackingCardComponent
    /*       icon={<FaShoppingCart />}  */
          icon={""} 
          value={stats.carts}
          label="السلة"
          colorClass="text-primary"
          bgClass="bg-primary-subtle"
        />
      </div>

      <div className="col-md-6 col-lg-3">
        <TrackingCardComponent
/*           icon={<FaBell />} */
icon={""} 
          value={stats.notifications}
          label="الإشعارات"
          colorClass="text-warning"
          bgClass="bg-warning-subtle"
        />
      </div>

      <div className="col-md-6 col-lg-3">
        <TrackingCardComponent
/*           icon={<FaCalendarAlt />} */
icon={""} 
          value={stats.upcoming_enrollments}
          label="الدورات القادمة"
          colorClass="text-info"
          bgClass="bg-info-subtle"
        />
      </div>

      <div className="col-md-6 col-lg-3">
        <TrackingCardComponent
      /*     icon={<FaCheckCircle />} */
      icon={""} 
          value={stats.completed_enrollments}
          label="الدورات المكتملة"
          colorClass="text-success"
          bgClass="bg-success-subtle"
        />
      </div>
    </div>
  );
};

export default DashboardTrackingSection;
