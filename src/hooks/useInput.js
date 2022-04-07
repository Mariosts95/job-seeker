import { useState, useEffect } from 'react';

const useInput = (validate, errorMsg) => {
  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isDirty, setIsDirty] = useState(false); // set to true when user starts typing

  const isValid = validate(value);
  const hasError = isDirty && !isValid;

  useEffect(() => {
    hasError ? setErrorMessage(errorMsg) : setErrorMessage('');
  }, [hasError]);

  // update the value and set error message if user has typed and there is an error
  const changeHandler = (e) => {
    setValue(e.target.value.trim());
    setIsDirty(false);
  };

  const blurHandler = () => {
    setIsDirty(true);
  };

  // reset the value and error message
  const reset = () => {
    setValue('');
    setErrorMessage('');
  };

  return {
    value,
    errorMessage,
    hasError,
    isValid,
    changeHandler,
    blurHandler,
    reset,
  };
};

export default useInput;
