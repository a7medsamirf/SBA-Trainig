import React from 'react';

import { getPrivacyPolicy } from '@/shared-apis'; 

const PrivacyPage = async () => {
  const pageData = await getPrivacyPolicy(); 
  return (
    <div className="container privacy-policy my-5">
      <div className="row ">
        <div className="col-lg-8">
          <h4 className="fw-bold color-gray-900 mb-4">
            {pageData?.title || "سياسة الخصوصية"}
          </h4>
          <div
            className="text-primary mb-4 font-md"
            style={{ fontSize: "0.95rem" }}
            dangerouslySetInnerHTML={{ __html: pageData?.description || "" }}
          />
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
