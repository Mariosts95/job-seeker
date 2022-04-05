import { useRef, useState, useEffect } from 'react';

// import styles
import './loginForm.scoped.scss';

// import components
import Button from '../UI/Button';
import Input from '../UI/Input';

const LoginForm = ({ onClick }) => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // set focus on email input
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
    ValidateEmail(email);
    console.log(ValidateEmail(email));
    console.log(password);
    setEmailError('Email Error');
    setPasswordError('Password Error');
    setErrorMsg('Error Message');
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
          refValue={passwordRef}
          value={password}
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
