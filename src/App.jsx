import { lazy, Suspense } from 'react';

// import react router
import { Routes, Route } from 'react-router-dom';

// import views
import Login from './screens/Login';

// add lazy loading
const JobPosts = lazy(() => import('./screens/JobPosts'));
const Success = lazy(() => import('./screens/Success'));
const Error404 = lazy(() => import('./screens/Error404'));

// import components
import Header from './components/UI/Header';
import Loader from './components/UI/Loader';

// import styles
import './sass/index.scss';

// Context
import AuthProvider from './store/AuthProvider';
import JobsProvider from './store/JobsProvider';

const App = () => {
  return (
    <AuthProvider>
      <Header />
      <Routes>
        <Route path='/' index element={<Login />} />
        <Route
          path='jobs'
          element={
            <JobsProvider>
              <Suspense fallback={<Loader />}>
                <JobPosts />
              </Suspense>
            </JobsProvider>
          }
        >
          <Route
            path=':id'
            element={
              <Suspense fallback={<Loader />}>
                <JobPosts />
              </Suspense>
            }
          />
        </Route>
        <Route
          path='success'
          element={
            <Suspense fallback={<Loader />}>
              <Success />
            </Suspense>
          }
        />
        <Route
          path='*'
          element={
            <Suspense fallback={<Loader />}>
              <Error404 />
            </Suspense>
          }
        />
      </Routes>
    </AuthProvider>
  );
};

export default App;
