import React from 'react';

import { getTerms } from '@/shared-apis'; 

const TermsPage = async () => {
  const pageData = await getTerms(); 
  return (
    <div className="container privacy-policy my-5">
      <div className="row ">
        <div className="col-lg-8">
          <h4 className="fw-bold color-gray-900 mb-4">
            {pageData?.title || "شروط الاستخدام"}
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

export default TermsPage;