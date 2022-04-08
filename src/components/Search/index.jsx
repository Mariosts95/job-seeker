import { useEffect, useState } from 'react';

// import components
import Input from '../UI/Input';

// import custom hooks
import useInput from '../../hooks/useInput';
import useLocalStorageState from '../../hooks/useLocalStorageState';

// import context
import { UseJobs } from '../../store/JobsProvider';

const Search = () => {
  const [isTouched, setIsTouched] = useState(false);

  // access jobs state from context
  const { updateJobs, cleanJobs } = UseJobs();

  // get access token from local storage
  const [token, _] = useLocalStorageState('accessToken');

  // initialize custom input hook
  const { value: searchValue, changeHandler } = useInput(
    (value) => {
      value !== '';
    },
    '',
    false
  );

  // search handler
  useEffect(() => {
    // prevent search the first time the component is rendered
    if (!isTouched) return;

    // add type delay to prevent spamming
    const timer = setTimeout(() => {
      cleanJobs();
      searchValue !== ''
        ? updateJobs(token, 1, 5, searchValue)
        : updateJobs(token, 1, 5);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchValue]);

  return (
    <div className='search-container'>
      <Input
        labelText='Search for a job'
        inputId='search-input'
        placeholder='Enter keyword'
        id='search-input'
        value={searchValue}
        onChange={(e) => {
          setIsTouched(true);
          changeHandler(e);
        }}
      />
    </div>
  );
};

export default Search;
