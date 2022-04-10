import { useEffect } from 'react';

// import react routes
import { useNavigate } from 'react-router-dom';

// import styles
import './login.scoped.scss';

// import components
import LoginForm from '../components/LoginForm/';

// import context
import { UseAuth } from '../store/AuthProvider';

const Login = () => {
  const { isAuth } = UseAuth(); // get access to auth state in context

  const navigate = useNavigate(); // use navigate hook

  // check if logged in and redirect to jobs
  useEffect(() => {
    // TODO fix this
    // !Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
    // redirect timeout to prevent memory leak
    const timer = setTimeout(() => {
      if (isAuth) navigate('/jobs');
    }, 10);

    // clean up
    return () => {
      clearTimeout(timer);
    };
  }, [isAuth]);

  return (
    <div className='login-page-container page-container'>
      <LoginForm />
    </div>
  );
};

export default Login;
