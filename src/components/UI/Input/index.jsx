// import styles
import './input.scoped.scss';

const Input = ({
  type = 'text',
  inputId,
  placeholder,
  labelText,
  autoComplete = 'off',
}) => {
  return (
    <div className='input'>
      {labelText && <label htmlFor={inputId}>{labelText}</label>}
      <input
        type={type}
        id={inputId}
        placeholder={placeholder}
        autoComplete={autoComplete}
      />
    </div>
  );
};

export default Input;
