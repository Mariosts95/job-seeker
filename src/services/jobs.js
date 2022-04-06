import axios from 'axios';

// fetch jobs with axios
const getJobs = async (accessToken, page = 1, size = 5, q) => {
  return await axios.get(`${import.meta.env.VITE_API_BASE_PATH}/job-posts`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: { page, sizePerPage: size, q },
  });
};

// fetch job with axios
const getJob = async (accessToken, id) => {
  return await axios.get(
    `${import.meta.env.VITE_API_BASE_PATH}/job-posts/${id}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

export { getJobs, getJob };
