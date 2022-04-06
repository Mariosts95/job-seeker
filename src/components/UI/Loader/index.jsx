import BeatLoader from 'react-spinners/ClipLoader';

const Loader = () => {
  return (
    <BeatLoader
      color='#0c647'
      css={{ margin: '0 auto 30px', display: 'block' }}
      size={50}
    />
  );
};

export default Loader;
