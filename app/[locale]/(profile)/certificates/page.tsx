import React from 'react'
import CertificatesCardComponents from './components/CertificatesCard-components'
import { getCertificates } from "@/shared-apis";
import { getTranslations } from 'next-intl/server';


export interface Certificate {
  id: number;
  certificate_url: string;
  course_name: string;
}
export default async function Certificatespage() {
  const certificatesResponse = await getCertificates();
  const certificatesData = certificatesResponse?.data || []; 
   const t = await getTranslations('trans.profile');
  return (
    <>
      <div className="border-0 card custom-border-radius">
        <div className="p-4 bg-white border-0 card-header custom-border-radius">
          <div className="profile-content-item-header">
            <h4 className="fw-bold color-gray-900">{t('certificates-title')}</h4>
          </div>
        </div>

        <div className="p-4 card-body">
          <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3">
            {certificatesData.length > 0 ? (
              certificatesData.map((certificate: Certificate) => (
                <div key={certificate.id} className="col">
                   <CertificatesCardComponents certificate={certificate} />
                </div>
              ))
            ) : (
              <div className="col-12">
                <p className="text-muted">{t('no-certificates')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}




