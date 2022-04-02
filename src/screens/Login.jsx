// import styles
import './login.scoped.scss';

// import components
import LoginForm from '../components/LoginForm/';

const Login = () => {
  return (
    <div className='page-container'>
      <div className='title'>
        <h1 className='main-header-1'>Login</h1>
      </div>
      <LoginForm />
    </div>
  );
};

export default Login;
