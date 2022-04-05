// import styles
import './header.scoped.scss';

const Header = () => {
  return (
    <header className='main-header'>
      <div className='header-wrapper flex'>
        <div className='header-logo'>
          <a href='/'>kariera.gr</a>
        </div>
        <div className='logout'>
          <a href='/'>Logout</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
