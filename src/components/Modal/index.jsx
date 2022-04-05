import { useEffect } from 'react';
import { createPortal } from 'react-dom';

// import components
import Button from '../UI/Button';
import Input from '../UI/Input';
import JobPost from '../JobPost';

// import styles
import './modal.scoped.scss';

const Modal = ({ isOpen, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  if (!isOpen) return null;

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
        <JobPost withButton={false} />

        <div className='modal-body'>
          <div className='modal-section'>
            <h4 className='modal-section-title bold'>Job details</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Augue in
              diam eu in eget. Rhoncus mauris aenean malesuada lacus, morbi
              cras. Massa nullam amet proin blandit diam cursus. Mattis sit sed
              enim phasellus mattis nulla. Vitae pharetra, at aenean sit
              viverra. Dolor cursus vitae.
            </p>
          </div>
          <div className='modal-section'>
            <h4 className='modal-section-title bold'>Requirements</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Augue in
              diam eu in eget. Rhoncus mauris aenean malesuada lacus, morbi
              cras. Massa nullam amet proin blandit diam cursus. Mattis sit sed
              enim phasellus mattis nulla. Vitae pharetra, at aenean sit
              viverra. Dolor cursus vitae.
            </p>
          </div>

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
