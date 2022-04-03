// import components
import Input from '../components/UI/Input';
import JobPost from '../components/JobPost';

// import styles
import './jobPosts.scoped.scss';

// dummy array
const dummy = [...Array(9)];

const JobPosts = () => {
  return (
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
          <JobPost key={index} />
        ))}
      </div>
    </div>
  );
};

export default JobPosts;
