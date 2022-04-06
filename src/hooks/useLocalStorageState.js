import { useEffect, useState } from 'react';

// Detecting HTML5 Features - Dive Into HTML5 - https://bit.ly/3FGMbyH
function supportsLocalStorage() {
  try {
    return 'localStorage' in window && window.localStorage !== null;
  } catch (e) {
    return false;
  }
}

const useLocalStorageState = (key, initialValue) => {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [state, setState] = useState(() => {
    if (supportsLocalStorage()) {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    }

    return initialValue;
  });

  useEffect(() => {
    if (supportsLocalStorage()) {
      window.localStorage.setItem(key, JSON.stringify(state));
    }
  }, [key, state]);

  return [state, setState];
};

export default useLocalStorageState;
