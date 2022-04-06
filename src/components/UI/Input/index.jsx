// import styles
import './input.scoped.scss';

const Input = ({
  type = 'text',
  inputId,
  placeholder,
  labelText,
  refValue,
  value,
  onChange,
  required,
  hasError,
  autoComplete = 'off',
  onBlur,
}) => {
  return (
    <div className='input'>
      {labelText && <label htmlFor={inputId}>{labelText}</label>}
      <input
        className={`${hasError ? 'error' : ''}`}
        ref={refValue}
        type={type}
        id={inputId}
        placeholder={placeholder}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
      />
    </div>
  );
};

export default Input;
