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
import useInput from '../../hooks/useInput';

const LoginForm = () => {
  const [formIsValid, setFormIsValid] = useState(false);
  const { updateAuth } = UseAuth(); // update auth state in context

  const navigate = useNavigate(); // initialize navigate hook

  // use local storage custom hook to save user data in local storage
  const [token, setToken] = useLocalStorageState('accessToken', '');
  const [user, setUser] = useLocalStorageState('user', '');

  const emailRef = useRef(); // use useRef to store the input values

  // set error messages
  const emailErrorMessage = 'Invalid email';
  const passwordErrorMessage =
    'Your password must have minimum eight characters, at least one letter, one number and one special character';

  // use useInput custom hook to handle input values
  const {
    value: email,
    isValid: emailIsValid,
    errorMessage: emailError,
    hasError: emailHasError,
    changeHandler: emailChangeHandler,
    blurHandler: emailBlurHandler,
    reset: emailReset,
  } = useInput(ValidateEmail, emailErrorMessage);

  const {
    value: password,
    isValid: passwordIsValid,
    errorMessage: passwordError,
    hasError: passwordHasError,
    changeHandler: passwordChangeHandler,
    blurHandler: passwordBlurHandler,
    reset: passwordReset,
  } = useInput(ValidatePassword, passwordErrorMessage);

  const [errorMsg, setErrorMsg] = useState(''); // general error state

  // set focus on email input on load
  useEffect(() => {
    emailRef.current.focus();
  }, []);

  // clean error messages on input change and set the validity of the form
  useEffect(() => {
    setErrorMsg('');
    if (emailIsValid && passwordIsValid) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [email, password]);

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // if there are no errors, proceed with login
    if (!formIsValid) return;
    ValidateUser(email, password)
      .then(({ data }) => {
        setToken(data.token.accessToken); // save access token in local storage
        setUser(data.user); // save user data in local storage
        updateAuth(true); // update auth state in context
        emailReset(); // reset email input
        passwordReset(); // reset password input
        navigate('/jobs'); // navigate to jobs page
      })
      .catch(({ response }) => {
        setErrorMsg(response?.data?.message);
      });
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
          hasError={emailHasError}
          refValue={emailRef}
          value={email}
          // validate email on blur to show error message
          onBlur={emailBlurHandler}
          onChange={emailChangeHandler}
        />
        {emailHasError && <div className='error-msg'>{emailError}</div>}
        <Input
          type='password'
          inputId='password'
          placeholder='Password'
          labelText='Enter your password:'
          required
          hasError={passwordHasError}
          value={password}
          // validate password on blur to show error message
          onBlur={passwordBlurHandler}
          onChange={passwordChangeHandler}
        />
        {passwordHasError && <div className='error-msg'>{passwordError}</div>}
      </div>
      <div className='submit-container'>
        <Button type='submit' disabled={!formIsValid}>
          Login
        </Button>
      </div>
      {errorMsg && <div className='error-msg'>{errorMsg}</div>}
    </form>
  );
};

export default LoginForm;
