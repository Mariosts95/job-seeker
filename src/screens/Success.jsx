// import components
import Button from '../components/UI/Button';

// import assets
import SuccessIcon from '/icons/success.svg';

// import styles
import './success.scoped.scss';

const Success = () => {
  return (
    <div className='page-container success-container'>
      <img className='success-icon' src={SuccessIcon} alt='success icon' />
      <p>Application successful</p>
      <h2 className='main-header-1 job-title'>Job Title Applied</h2>
      <Button>Back to job list</Button>
    </div>
  );
};

export default Success;
