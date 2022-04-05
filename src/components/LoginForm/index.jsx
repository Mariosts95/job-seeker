// import styles
import './loginForm.scoped.scss';

// import components
import Button from '../UI/Button';
import Input from '../UI/Input';

const LoginForm = ({ onClick }) => {
  return (
    <form className='login-form'>
      <div className='inputs-container'>
        <Input
          type='email'
          inputId='email'
          placeholder='Email'
          labelText='Enter your email:'
          autoComplete='off'
        />
        <Input
          type='password'
          inputId='password'
          placeholder='Password'
          labelText='Enter your password:'
        />
      </div>
      <div className='submit-container'>
        <Button
          type='submit'
          onClick={(e) => {
            e.preventDefault();
            console.log(document.getElementById('email').value);
            console.log(document.getElementById('password').value);
            onClick();
          }}
        >
          Login
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
