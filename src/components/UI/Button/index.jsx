// import styles
import './button.scoped.scss';

const Button = ({ type, onClick, disabled = false, children }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className='button'
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
