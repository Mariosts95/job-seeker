// import react router
import { Routes, Route } from 'react-router-dom';

// import views
import Login from './screens/Login';
import JobPosts from './screens/JobPosts';
import Success from './screens/Success';
import Error404 from './screens/Error404';

// import components
import Header from './components/UI/Header';

// import styles
import './sass/index.scss';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' index element={<Login />} />
        <Route path='/jobs' element={<JobPosts />} />
        <Route path='/success' element={<Success />} />
        <Route path='*' element={<Error404 />} />
      </Routes>
    </>
  );
};

export default App;
