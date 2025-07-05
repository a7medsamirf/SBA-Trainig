import React from 'react';
import TrackingCardComponent from './components/TrackingCard-component';
import SvgBook from '@/components/icons/svg/book';
import { PersonCoursesCardComponent } from './components/PersonCoursesCard-component';

const cards = [
  {
    value: 35,
    label: 'عدد الدورات',
    colorClass: 'text-success',
    bgClass: 'bg-success bg-opacity-10',
    iconColor: '#76A441',
  },
  {
    value: 35,
    label: 'عدد الدورات',
    colorClass: 'text-warning',
    bgClass: 'bg-warning bg-opacity-10',
    iconColor: '#DD8C23',
  },
  {
    value: 35,
    label: 'عدد الدورات',
    colorClass: 'text-primary',
    bgClass: 'bg-primary bg-opacity-10',
    iconColor: '#425A8B',
  },
];

const DashboardPage = () => {
  return (
    <div className="container-fluid mx-auto p-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold color-gray-900">لوحة المتابعة</h4>
      </div>
      <div className="row g-4 justify-content-center mb-4">
        {cards.map((card, idx) => (
          <div className="col-12 col-md-6 col-lg-4" key={idx}>
            <TrackingCardComponent
              icon={<SvgBook color={card.iconColor} />}
              value={card.value}
              label={card.label}
              colorClass={card.colorClass}
              bgClass={card.bgClass}
            />
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold color-gray-900"> دوراتي الحضورية </h4>
      </div>
      <PersonCoursesCardComponent />
    </div>
  );
};

export default DashboardPage;