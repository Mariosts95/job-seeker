// import react router
import { Link, useNavigate } from 'react-router-dom';

// import styles
import './header.scoped.scss';

// import context
import { UseAuth } from '../../../store/AuthProvider';

// import utils
import { LogoutUser } from '../../../utils/auth';

const Header = () => {
  const navigate = useNavigate();

  // access auth state from context
  const { isAuth, updateAuth } = UseAuth();

  return (
    <header className='main-header'>
      <div className='header-wrapper flex'>
        <div className='header-logo'>
          <Link to='/'>Job Seeker</Link>
        </div>
        {isAuth && (
          <div className='logout'>
            <Link
              to='#'
              onClick={(e) => {
                e.preventDefault();
                LogoutUser();
                updateAuth(false);
                navigate('/');
              }}
            >
              Logout
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
