import { useRef, useState, useEffect } from 'react';

// import react router
import { useNavigate } from 'react-router-dom';

// import styles
import './loginForm.scoped.scss';

// import components
import Button from '../UI/Button';
import Input from '../UI/Input';

// import services
import {
  ValidateEmail,
  ValidatePassword,
  ValidateUser,
} from '../../services/auth';

// import context
import { UseAuth } from '../../store/AuthProvider';

// import custom hooks
import useLocalStorageState from '../../hooks/useLocalStorageState';

const LoginForm = () => {
  const { updateAuth } = UseAuth(); // update auth state in context

  const navigate = useNavigate(); // initialize navigate hook

  // use local storage custom hook to save user data in local storage
  const [token, setToken] = useLocalStorageState('accessToken', '');
  const [user, setUser] = useLocalStorageState('user', '');

  const emailRef = useRef(); // use useRef to store the input values

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [errorMsg, setErrorMsg] = useState(''); // general error state

  // set focus on email input on load
  useEffect(() => {
    emailRef.current.focus();
  }, []);

  // clear email error message on input change
  useEffect(() => {
    setEmailError('');
    setErrorMsg('');
  }, [email]);

  // clear password error message on input change
  useEffect(() => {
    setPasswordError('');
    setErrorMsg('');
  }, [password]);

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    ValidateEmail(email) ? setEmailError('') : setEmailError('Invalid email');
    ValidatePassword(password)
      ? setPasswordError('')
      : setPasswordError(
          `Your password must have minimum eight characters, at least one letter, one number and one special character`
        );

    // if there are no errors, proceed with login
    if (!emailError && !passwordError) {
      ValidateUser(email, password)
        .then(({ data }) => {
          setToken(data.token.accessToken); // save access token in local storage
          setUser(data.user); // save user data in local storage
          updateAuth(true); // update auth state in context
          navigate('/jobs'); // navigate to jobs page
        })
        .catch(({ response }) => {
          const { data } = response;
          setErrorMsg(data.message);
        });
    }
  };

  return (
    <form className='login-form' onSubmit={handleSubmit}>
      <div className='inputs-container'>
        <Input
          type='email'
          inputId='email'
          placeholder='Email'
          labelText='Enter your email:'
          autoComplete='off'
          required
          hasError={emailError}
          refValue={emailRef}
          value={email}
          // validate email on blur to show error message
          onBlur={() => {
            ValidateEmail(email)
              ? setEmailError('')
              : setEmailError('Invalid email');
          }}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <div className='error-msg'>{emailError}</div>}
        <Input
          type='password'
          inputId='password'
          placeholder='Password'
          labelText='Enter your password:'
          required
          hasError={passwordError}
          value={password}
          // validate password on blur to show error message
          onBlur={() => {
            ValidatePassword(password)
              ? setPasswordError('')
              : setPasswordError(
                  `Your password must have minimum eight characters, at least one letter, one number and one special character`
                );
          }}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && <div className='error-msg'>{passwordError}</div>}
      </div>
      <div className='submit-container'>
        <Button type='submit'>Login</Button>
      </div>
      {errorMsg && <div className='error-msg'>{errorMsg}</div>}
    </form>
  );
};

export default LoginForm;
