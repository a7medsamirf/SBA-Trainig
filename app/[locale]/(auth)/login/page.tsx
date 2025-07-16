import './login.scss';
import { LoginFormComponent } from './components/LoginForm-component';
import LoginSettingComponent from './components/LoginSetting-component';

const Login = () => {


  return (
    <div className="login-container">
      <div className="row g-0 min-vh-100">
        <div className="col-12 col-lg-6 d-flex justify-content-center">
          <LoginFormComponent />
        </div> 

        <div className="col-lg-6 d-none d-lg-block position-relative">
          <LoginSettingComponent />
        </div>
      </div>

    </div>
  );
};

export default Login;

