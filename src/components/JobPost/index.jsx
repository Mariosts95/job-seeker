// import components
import Button from '../UI/Button';

// import styles
import './jobPost.scoped.scss';

const JobPost = ({
  companyName,
  jobTitle,
  createdAt,
  validUntil,
  address,
  withButton = true,
  buttonClickHandler,
}) => {
  return (
    <div className='job-post-container flex'>
      <div className='image'>
        <img src='https://picsum.photos/110/100' alt='company-logo' />
      </div>

      <div className='header'>
        <p className='company-name bold'>Techbase</p>
        <h3 className='job-title bold'>Legacy Brand Analyst</h3>

        <div className='desktop'>
          <div className='info flex'>
            <div className='date-posted'>
              <p>Date posted</p>
              <p className='bold'>13 Apr</p>
            </div>
            <div className='apply-until'>
              <p>Apply until</p>
              <p className='bold'>23 May</p>
            </div>
            <div className='location'>
              <p>Location</p>
              <p className='bold'>Russia</p>
            </div>
          </div>
        </div>
      </div>

      <div className='mobile'>
        <div className='info  flex'>
          <div className='date-posted'>
            <p>Date posted</p>
            <p className='bold'>13 Apr</p>
          </div>
          <div className='apply-until'>
            <p>Apply until</p>
            <p className='bold'>23 May</p>
          </div>
          <div className='location'>
            <p>Location</p>
            <p className='bold'>Russia</p>
          </div>
        </div>
      </div>

      {withButton && (
        <div className='submit-container'>
          <Button onClick={buttonClickHandler}>Apply Now</Button>
        </div>
      )}
    </div>
  );
};

export default JobPost;
