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
    <div className='job-post-container grid'>
      <div className='image'>
        <img src='https://picsum.photos/110/70' alt='company-logo' />
      </div>

      <div className='header'>
        <p className='company-name bold'>{companyName}</p>
        <h3 className='job-title bold'>{jobTitle}</h3>
      </div>

      <div className='info flex'>
        <div className='date-posted'>
          <p>Date posted</p>
          <p className='bold'>{`${new Date(+createdAt).toLocaleDateString(
            'en-GB',
            { day: 'numeric', month: 'short' }
          )}`}</p>
        </div>
        <div className='apply-until'>
          <p>Apply until</p>
          <p className='bold'>{`${new Date(+validUntil).toLocaleDateString(
            'en-GB',
            { day: 'numeric', month: 'short' }
          )}`}</p>
        </div>
        <div className='location'>
          <p>Location</p>
          <p className='bold'>{address}</p>
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
