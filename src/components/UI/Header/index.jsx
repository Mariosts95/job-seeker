// import react router
import { Link } from 'react-router-dom';

// import styles
import './header.scoped.scss';

// import context
import { UseAuth } from '../../../store/AuthProvider';

const Header = () => {
  // access auth state from context
  const { isAuth } = UseAuth();

  return (
    <header className='main-header'>
      <div className='header-wrapper flex'>
        <div className='header-logo'>
          <Link to='/'>kariera.gr</Link>
        </div>
        {isAuth && (
          <div className='logout'>
            <Link to='/'>Logout</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
