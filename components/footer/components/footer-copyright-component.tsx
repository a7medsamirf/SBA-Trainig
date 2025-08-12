import React from 'react'
import { Link } from "@/i18n/routing";
import { useTranslations } from 'next-intl';

const FooterCopyright = () => {
  const t = useTranslations('trans.footer');
  
  return (
    <>
   <div className="container">
                  <div className="footer-bottom mt-20">
                      <div className="row d-flex justify-content-between">
                          <div className="col-lg-6 col-md-12">
                            <span className="color-gray-900 font-sm">{t('copyright')}</span>
                          </div>
                          <div className="col-lg-6 col-md-12">
                              <ul className="menu-bottom">
                                  <li><Link href="/terms" className="font-sm color-gray-900">{t('terms')}</Link></li>
                                  <li><Link href="/Privacy" className="font-sm color-gray-900">{t('privacy')}</Link></li>
                              </ul>
                          </div>
                      </div>
                  </div>
              </div>
    </>
  )
}

export default FooterCopyright