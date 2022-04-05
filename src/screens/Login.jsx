import { useNavigate } from 'react-router-dom';

// import styles
import './login.scoped.scss';

// import components
import LoginForm from '../components/LoginForm/';

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className='login-page-container page-container'>
      <LoginForm
        onClick={() => {
          navigate('/jobs');
        }}
      />
    </div>
  );
};

export default Login;
