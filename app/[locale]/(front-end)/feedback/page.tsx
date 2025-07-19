import React from 'react';
import "./feedback.scss";
import RatingFormComponent from './components/RatingForm-component';


const RatingPage = () => {
  return (
    <div className="rating-form-container container mt-5">
      <h4 className="fw-bold color-gray-900 py-10">تقييم الدورة</h4>
      <div className="card p-4 custom-border shadow-none">
        <div className="text-end text-primary p-4">شاركنا برأيك في هذه الدورة</div>
      <RatingFormComponent />
      </div>
    </div>
  );
};

export default RatingPage;


