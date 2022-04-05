// import styles
import './Error404.scoped.scss';

// import assets
import ErrorIllustration from '/icons/404.svg';

const Error404 = () => {
  return (
    <div className='error-404-container page-container'>
      <img src={ErrorIllustration} alt='404 illustration' />
    </div>
  );
};

export default Error404;
