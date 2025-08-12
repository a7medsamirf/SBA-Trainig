import Image from 'next/image';
import { Setting } from "@/models";
import { useTranslations } from 'next-intl';

const LoginSettingComponent = () => {
  const t = useTranslations('trans');
  return (
    <>

          <Image
            src="/images/login-bg.svg"
            alt="login"
            fill
            className="login-bg"
            style={{ objectFit: "cover" }}
            priority
          />
          <div className="login-overlay position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center text-white text-center">
            <h2 className="fw-bold mb-3 w-75">   {t('loginSetting.title')} </h2>
            <p className="lead">{t('loginSetting.description')}</p>
          </div>
    </>
  )
}

export default LoginSettingComponent;