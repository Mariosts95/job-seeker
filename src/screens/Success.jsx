// import React
import { useEffect, useState } from 'react';

// import react router
import { useNavigate, useLocation } from 'react-router-dom';

// import components
import Button from '../components/UI/Button';

// import assets
import SuccessIcon from '/icons/success.svg';

// import styles
import './success.scoped.scss';

const Success = () => {
  // redirect counter
  const [countdown, setCountdown] = useState(5);
  // initialize navigate hook
  const navigate = useNavigate();

  // get jobs name from modal
  const { state } = useLocation();
  const { jobTitle } = state;

  // redirect to home page after 5 seconds
  useEffect(() => {
    const redirectCountdown = setTimeout(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
      countdown === 0 && navigate('/jobs');
    }, 1 * 1000);

    return () => {
      clearTimeout(redirectCountdown);
    };
  }, [countdown]);

  return (
    <div className='page-container success-container'>
      <img className='success-icon' src={SuccessIcon} alt='success icon' />
      <p>Application successful</p>
      <h2 className='main-header-1 job-title'>{jobTitle}</h2>
      <p className='redirect-msg'>
        You we'll be redirected back automatically in {countdown}...
      </p>
      <Button
        onClick={() => {
          navigate('/jobs');
        }}
      >
        Back to job list
      </Button>
    </div>
  );
};

export default Success;
