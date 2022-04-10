import { createContext, useContext, useState, useEffect } from 'react';

// jwt decoder
import jwt_decode from 'jwt-decode';

// import custom hooks
import useLocalStorageState from '../hooks/useLocalStorageState';

const AuthContext = createContext({}); // create context

const UseAuth = () => useContext(AuthContext); // initialize context

// check if access token has expired
const isTokenExpired = (token) => {
  const currentTime = Math.floor(new Date().getTime() / 1000); // get current time in seconds
  const { exp } = jwt_decode(token); // get expiration time from jwt
  return currentTime > exp ? true : false; // check if current time is greater than expiration time
};

// clean auth items from local storage
const cleanAuth = () => {
  localStorage.removeItem('accessToken'); // remove access token from local storage
  localStorage.removeItem('user'); // remove user from local storage
};

const AuthProvider = ({ children }) => {
  // check if user is authenticated
  const [isAuth, setIsAuth] = useState(false);

  // get access token from local storage
  const [token, _] = useLocalStorageState('accessToken', '');

  // check if user is authenticated on mount
  useEffect(() => {
    if (token) {
      // check if access token has expired
      if (isTokenExpired(token)) {
        cleanAuth(); // clean auth items from local storage
        setIsAuth(false); // set isAuth to false
      } else {
        setIsAuth(true); // set isAuth to true
      }
    }
  }, []);

  // update auth state in context
  const updateAuth = (value) => {
    setIsAuth(value);
  };

  return (
    <AuthContext.Provider value={{ isAuth, updateAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { UseAuth };

export default AuthProvider;
