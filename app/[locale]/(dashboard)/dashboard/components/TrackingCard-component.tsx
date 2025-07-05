import React from 'react'
import '../dashboard.scss';

interface TrackingCardProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  colorClass: string; 
  bgClass: string; 
}

const TrackingCardComponent: React.FC<TrackingCardProps> = ({ icon, value, label, colorClass, bgClass }) => {
  return (
    <div className="tracking-card-component card h-100">
      <div className="card-body p-4">
        <div className="flex-grow-1">
          <h6 className="mb-4">{label}</h6>
          <span className={`fw-bold ${colorClass}`}>{value}</span>
          <span className={`ms-1 ${colorClass}`}>دورة</span>
        </div>
        <div className={`icon-box rounded-3 d-flex align-items-center justify-content-center ${bgClass} icon-box`}
              style={{ width: 40, height: 40, background: 'var(--bs-light)' }}>
          {icon}
        </div>
      </div>
    </div>
  )
}

export default TrackingCardComponent