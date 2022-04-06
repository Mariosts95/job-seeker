import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

// import components
import Button from '../UI/Button';
import Input from '../UI/Input';
import JobPost from '../JobPost';

// import custom hooks
import useLocalStorageState from '../../hooks/useLocalStorageState';

// import services
import { getJob } from '../../services/jobs';

// import styles
import './modal.scoped.scss';

const Modal = ({ isOpen, onClose, jobId }) => {
  const [job, setJob] = useState();

  // get access token from local storage
  const [token, _] = useLocalStorageState('accessToken', '');

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';

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
      <div className='modal-backdrop' onClick={onClose}></div>
      <div className='modal-container'>
        <div className='modal-header flex'>
          <p>Apply for the Job</p>
          <span className='close-modal bold' onClick={onClose}>
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
            />
            <Input
              labelText='Can someone refer you?'
              placeholder='Enter his/her email'
            />
          </div>

          <div className='send-application-container'>
            <Button>Send application</Button>
          </div>
        </div>
      </div>
    </>,
    document.getElementById('job-modal')
  );
};

export default Modal;
