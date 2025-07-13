import React from 'react';
import TrackingCardComponent from './components/TrackingCard-component';
import SvgBook from '@/components/icons/svg/book';
import { PersonCoursesCardComponent } from './components/PersonCoursesCard-component';
import DashboardSearchComponents from './components/DashboardSearch-components';
import "./dashboard.scss"
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
    <div className="p-5 mx-auto container-fluid">
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <h4 className="fw-bold color-gray-900">لوحة المتابعة</h4>
      </div>
      <div className="mb-4 row g-4 justify-content-center">
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
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <h4 className="fw-bold color-gray-900"> دوراتي الحضورية </h4>
      </div>

      <div className='row'>
        <div className='col-lg-3'>
        <ul className="mb-4 nav nav-tabs nav-tabs-product dashboard-tabs" role="tablist">
        <li>
        <a className="active w-50" href="#tab-description" data-bs-toggle="tab" role="tab" aria-controls="tab-description"
            aria-selected="true">
            وصف الدورة
        </a>
        </li>
        <li>
        <a className='w-50' href="#tab-objectives" data-bs-toggle="tab" role="tab" aria-controls="tab-objectives" aria-selected="false">
            أهداف الأداء النهائية
        </a>
        </li>
    
    </ul>
        </div>
      </div>
    
    <div className="tab-content">
        <div className="tab-pane fade active show" id="tab-description" role="tabpanel" aria-labelledby="tab-description">
    
        <div className='mb-4 row'>
            <div className='col-lg-3'>
                <DashboardSearchComponents />
            </div>
        </div>
          <PersonCoursesCardComponent />
        </div>
        
    
        <div className="tab-pane fade" id="tab-objectives" role="tabpanel" aria-labelledby="tab-objectives">
        <div className="font-md color-gray-500" >     أهداف الأداء النهائية</div>
    
        </div>
        </div>
    

    
    </div>
  );
};

export default DashboardPage;