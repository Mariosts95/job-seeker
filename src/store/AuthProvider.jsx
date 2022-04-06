import { createContext, useContext, useState } from 'react';

const AuthContext = createContext({});

const UseAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  // check if user is authenticated
  const [isAuth, setIsAuth] = useState(false);

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
