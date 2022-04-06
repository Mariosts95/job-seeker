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
          <a href='/'>kariera.gr</a>
        </div>
        {isAuth && (
          <div className='logout'>
            <a href='/'>Logout</a>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
