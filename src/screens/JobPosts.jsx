import { useState } from 'react';

// import components
import Input from '../components/UI/Input';
import JobPost from '../components/JobPost';
import Modal from '../components/Modal';

// import styles
import './jobPosts.scoped.scss';

// dummy array
const dummy = [...Array(9)];

const JobPosts = () => {
  // modal state
  const [jobModalIsOpen, setJobModalIsOpen] = useState(false);

  // open modal handler
  const openJobModal = () => {
    setJobModalIsOpen(true);
  };

  // close modal handler
  const closeJobModal = () => {
    setJobModalIsOpen(false);
  };

  return (
    <>
      <Modal isOpen={jobModalIsOpen} onClose={closeJobModal} />

      <div className='job-posts-container page-container'>
        <div className='top-section'>
          <div className='user-info'>
            <p>Hello,</p>
            <p className='user-email'>email@example.com</p>
          </div>

          <div className='search-container'>
            <Input
              labelText='Search for a job'
              inputId='search-input'
              placeholder='Enter keyword'
            />
          </div>

          <h2 className='main-header-1 results-title'>
            Showing 5 of 50 job posts
          </h2>
        </div>

        <div className='job-posts'>
          {dummy.map((_, index) => (
            <JobPost key={index} buttonClickHandler={openJobModal} />
          ))}
        </div>
      </div>
    </>
  );
};

export default JobPosts;
