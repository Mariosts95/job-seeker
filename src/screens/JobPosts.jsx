import { useState, useEffect } from 'react';

// import components
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import JobPost from '../components/JobPost';
import Modal from '../components/Modal';
import Loader from '../components/UI/Loader';

// import styles
import './jobPosts.scoped.scss';

// import custom hooks
import useLocalStorageState from '../hooks/useLocalStorageState';

// import context
import { UseJobs } from '../store/JobsProvider';

const JobPosts = () => {
  // modal state
  const [jobModalIsOpen, setJobModalIsOpen] = useState(false);
  const [jobId, setJobId] = useState('');

  // jobs page
  const [currentPage, setCurrentPage] = useState(1);

  // read user email from local storage
  const [user, _] = useLocalStorageState('user', '');

  // access jobs state from context
  const { jobs, jobsLoading, updateJobs, totalJobs, totalPages } = UseJobs();

  // update jobs on mount
  useEffect(() => {
    updateJobs(currentPage);
  }, []);

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
      <Modal isOpen={jobModalIsOpen} jobId={jobId} onClose={closeJobModal} />

      <div className='job-posts-container page-container'>
        <div className='top-section'>
          <div className='user-info'>
            <p>Hello,</p>
            <p className='user-email'>{user?.email}</p>
          </div>

          <div className='search-container'>
            <Input
              labelText='Search for a job'
              inputId='search-input'
              placeholder='Enter keyword'
            />
          </div>

          <h2 className='main-header-1 results-title'>
            Showing {jobsLoading ? 0 : jobs.length} of {totalJobs} job posts
          </h2>
        </div>

        <div className='job-posts'>
          {jobsLoading && <Loader />}

          {!jobsLoading &&
            jobs.map((job) => (
              <JobPost
                key={job.id}
                address={job.address}
                companyName={job.companyName}
                jobTitle={job.title}
                createdAt={job.createdAt}
                validUntil={job.validUntil}
                buttonClickHandler={() => {
                  setJobId(job.id);
                  openJobModal();
                }}
              />
            ))}
          {currentPage < totalPages && (
            <Button
              onClick={() => {
                if (currentPage < totalPages) {
                  setCurrentPage(currentPage + 1);
                  updateJobs(currentPage + 1);
                }
              }}
            >
              Get more jobs
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default JobPosts;
