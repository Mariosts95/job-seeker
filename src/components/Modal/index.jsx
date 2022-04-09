import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

// import react router
import { useNavigate } from 'react-router-dom';

// import components
import Button from '../UI/Button';
import Input from '../UI/Input';
import JobPost from '../JobPost';

// import custom hooks
import useLocalStorageState from '../../hooks/useLocalStorageState';
import useInput from '../../hooks/useInput';

// import services
import { getJob, applyJob } from '../../services/jobs';
import { ValidateEmail, ValidateNumber } from '../../services/auth';

// import context
import { UseAuth } from '../../store/AuthProvider';

// import styles
import './modal.scoped.scss';

const Modal = ({ isOpen, onClose, jobId }) => {
  // get the job's id to display
  const [job, setJob] = useState();

  // set apply error
  const [applyError, setApplyError] = useState('');

  const {
    value: yearsOfExperience,
    isValid: yearsOfExperienceIsValid,
    errorMessage: yearsOfExperienceError,
    hasError: yearsOfExperienceHasError,
    changeHandler: yearsOfExperienceChangeHandler,
    blurHandler: yearsOfExperienceBlurHandler,
    reset: yearsOfExperienceReset,
  } = useInput(ValidateNumber, 'Please enter years of experience');

  const {
    value: email,
    isValid: emailIsValid,
    errorMessage: emailError,
    hasError: emailHasError,
    changeHandler: emailChangeHandler,
    reset: emailReset,
  } = useInput(ValidateEmail, 'Invalid email');

  // get access token from local storage
  const [token, _] = useLocalStorageState('accessToken', '');

  // initialize navigate hook
  const navigate = useNavigate();

  // get auth state from context
  const { isAuth } = UseAuth();

  // handle job apply
  const jobApplyHandler = async () => {
    // check if user is authenticated
    if (!isAuth) return;

    // check if user has entered years of experience
    if (!yearsOfExperienceIsValid) return;

    // apply the job
    applyJob(token, jobId, +yearsOfExperience)
      .then(() => {
        navigate('/success', { state: { jobTitle: job.title } });
      })
      .catch(({ response }) => {
        setApplyError(
          response?.data?.message ||
            'Something went wrong, please try again later'
        );
      });
  };

  // close handler
  const closeHandler = () => {
    onClose();
    setApplyError('');
    yearsOfExperienceReset();
    emailReset();
  };

  useEffect(() => {
    if (!isAuth) return;

    // hide overflow on modal open
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';

    isAuth &&
      getJob(token, jobId)
        .then(({ data }) => {
          setJob(data);
        })
        .catch((error) => {
          console.log(error);
        });
  }, [isOpen]);

  if (!isOpen) return null;
  if (!job) return null;

  return createPortal(
    <>
      <div className='modal-backdrop' onClick={closeHandler}></div>
      <div className='modal-container'>
        <div className='modal-header flex'>
          <p>Apply for the Job</p>
          <span className='close-modal bold' onClick={closeHandler}>
            X
          </span>
        </div>
        <JobPost
          withButton={false}
          companyName={job.companyName}
          jobTitle={job.title}
          address={job.address}
          createdAt={job.createdAt}
          validUntil={job.validUntil}
        />

        <div className='modal-body'>
          <div dangerouslySetInnerHTML={{ __html: job.description }}></div>
          <div className='application-form'>
            <Input
              labelText='How many years of experience?'
              placeholder='Enter a number'
              required
              inputId='yearsOfExperience'
              autoComplete='off'
              hasError={yearsOfExperienceHasError}
              value={yearsOfExperience}
              onBlur={yearsOfExperienceBlurHandler}
              onChange={yearsOfExperienceChangeHandler}
            />
            {yearsOfExperienceHasError && (
              <div className='error-msg'>{yearsOfExperienceError}</div>
            )}
            <Input
              labelText='Can someone refer you?'
              placeholder='Enter his/her email'
              type='email'
              inputId='email'
              autoComplete='off'
              hasError={emailHasError}
              value={email}
              onChange={emailChangeHandler}
            />
            {emailHasError && <div className='error-msg'>{emailError}</div>}
          </div>

          {applyError && (
            <p className='error-msg text-center bold'>{applyError}</p>
          )}
          <div className='send-application-container'>
            <Button
              onClick={jobApplyHandler}
              disabled={!yearsOfExperienceIsValid}
            >
              Send application
            </Button>
          </div>
        </div>
      </div>
    </>,
    document.getElementById('job-modal')
  );
};

export default Modal;
