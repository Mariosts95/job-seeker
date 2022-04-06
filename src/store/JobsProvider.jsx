import { createContext, useContext, useState } from 'react';

const JobsContext = createContext({});

const UseJobs = () => useContext(JobsContext);

// import custom hooks
import useLocalStorageState from '../hooks/useLocalStorageState';

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

  // get access token from local storage
  const [token, _] = useLocalStorageState('accessToken', '');

  // update jobs
  const updateJobs = (page) => {
    getJobs(token, page)
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

  return (
    <JobsContext.Provider
      value={{ jobs, totalJobs, totalPages, jobsLoading, updateJobs }}
    >
      {children}
    </JobsContext.Provider>
  );
};

export { UseJobs };

export default JobsProvider;
