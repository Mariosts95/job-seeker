// import styles
import './button.scoped.scss';

const Button = ({ type, onClick, children }) => {
  return (
    <button type={type} onClick={onClick} className='button'>
      {children}
    </button>
  );
};

export default Button;
