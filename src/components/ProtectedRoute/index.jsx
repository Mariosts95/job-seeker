// import react router
import { Navigate } from 'react-router-dom';

// import context
import { UseAuth } from '../../store/AuthProvider';

const ProtectedRoute = ({ children }) => {
  const { isAuth } = UseAuth();

  return isAuth ? children : <Navigate to='/' />;
};

export default ProtectedRoute;
