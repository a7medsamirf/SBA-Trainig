import './login.scss';
import Image from 'next/image';
import { LoginFormComponent } from './components/LoginForm-component';

const Login = () => {


  return (
    <div className="login-container">
      <div className="row g-0 min-vh-100">
        {/* Right: Form */}
        <div className="col-12 col-lg-6 d-flex justify-content-center">
          
        <LoginFormComponent />
      
        </div>
        {/* Left: Image & Text */}
        <div className="col-lg-6 d-none d-lg-block position-relative">
          <Image
            src="/images/login-bg.svg"
            alt="login"
            fill
            className="login-bg"
            style={{ objectFit: "cover" }}
            priority
          />
          <div className="login-overlay position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center text-white text-center">
            <h2 className="fw-bold mb-3">اكتشف عالم الإعلام والبث</h2>
            <p className="lead">
              استعد لاكتساب مهارات احترافية في مجالات الإذاعة والتلفزيون، مع
              تدريبات معتمدة من أفضل الخبراء.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Login;


