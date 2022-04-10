import { useState, useEffect } from 'react';

// import components
import JobPost from '../components/JobPost';
import Modal from '../components/Modal';
import Loader from '../components/UI/Loader';
import Search from '../components/Search';

// import styles
import './jobPosts.scoped.scss';

// import custom hooks
import useLocalStorageState from '../hooks/useLocalStorageState';

// import context
import { UseJobs } from '../store/JobsProvider';

const JobPosts = () => {
  // access jobs state from context
  const { jobs, jobsLoading, updateJobs, totalJobs, totalPages, cleanJobs } =
    UseJobs();

  // modal state
  const [jobModalIsOpen, setJobModalIsOpen] = useState(false);
  const [jobId, setJobId] = useState('');

  // jobs page
  const [currentPage, setCurrentPage] = useState(1);

  // read user email from local storage
  const [user, __] = useLocalStorageState('user');
  // get access token from local storage
  const [token, _] = useLocalStorageState('accessToken');

  // update jobs on mount
  useEffect(() => {
    cleanJobs(); // clean jobs from redirect
    updateJobs(token, currentPage); // get jobs
  }, []);

  // infinite scroll
  const handleScroll = (e) => {
    const bodyScrollableHeight = e.target.documentElement.scrollHeight; // body scrollable height
    const windowBottom =
      window.innerHeight + e.target.documentElement.scrollTop; // window height + scroll from top
    // if window bottom is equal to body height
    if (windowBottom >= bodyScrollableHeight) {
      // !BUG if scroll way to fast at the last page it fetches data before React updates state
      // overflow safe guard
      if (currentPage < totalPages) {
        updateJobs(token, currentPage + 1);
        setCurrentPage((prevPage) => prevPage + 1);
      }
    }
  };

  // infinite scroll listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

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
      <Modal
        isOpen={jobModalIsOpen}
        jobId={jobId}
        onClose={() => {
          setJobId('');
          closeJobModal();
        }}
      />

      <div className='job-posts-container page-container'>
        <div className='top-section'>
          <div className='user-info'>
            <p>Hello,</p>
            <p className='user-email'>{user?.email}</p>
          </div>

          <Search />

          <h2 className='main-header-1 results-title'>
            Showing {jobsLoading ? 0 : jobs?.length} of {totalJobs} job posts
          </h2>
        </div>

        <div className='job-posts'>
          {(jobsLoading || jobs?.length === 0) && <Loader />}

          {!jobsLoading &&
            jobs?.length !== 0 &&
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
          {currentPage < totalPages && <Loader />}
        </div>
      </div>
    </>
  );
};

export default JobPosts;
