import { createContext, useContext, useState } from 'react';

const JobsContext = createContext({});

const UseJobs = () => useContext(JobsContext);

// import services
import { getJobs } from '../services/jobs';

const JobsProvider = ({ children }) => {
  // save jobs in state
  const [jobs, setJobs] = useState([]);
  // save jobs in state
  const [totalJobs, setTotalJobs] = useState(0);
  // save total pages in state
  const [totalPages, setTotalPages] = useState(0);
  // loading state
  const [jobsLoading, setJobsLoading] = useState(true);

  // update jobs
  const updateJobs = (token, page, size, q) => {
    getJobs(token, page, size, q)
      .then(({ data }) => {
        setJobs((prevJobs) => [...prevJobs, ...data.items]);
        setTotalJobs(data.totalCount);
        setTotalPages(data.totalPages);
        setJobsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // clean jobs
  const cleanJobs = () => {
    setJobs([]);
    setTotalJobs(0);
    setTotalPages(0);
    setJobsLoading(true);
  };

  return (
    <JobsContext.Provider
      value={{
        jobs,
        totalJobs,
        totalPages,
        jobsLoading,
        updateJobs,
        cleanJobs,
      }}
    >
      {children}
    </JobsContext.Provider>
  );
};

export { UseJobs };

export default JobsProvider;
