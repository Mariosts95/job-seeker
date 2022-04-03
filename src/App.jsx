// import views
import Login from './screens/Login';
import JobPosts from './screens/JobPosts';
import Success from './screens/Success';

// import components
import Header from './components/UI/Header';

// import styles
import './sass/index.scss';

const App = () => {
  return (
    <>
      <Header />
      {/* <Login /> */}
      {/* <JobPosts /> */}
      <Success />
    </>
  );
};

export default App;
