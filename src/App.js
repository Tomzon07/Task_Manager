import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import NavBar from './components/NavBar';

const Dashboard = lazy(() => import('./components/Dashboard'));
const Tasks = lazy(() => import('./components/Tasks'));

const App = () => {
  return (
    <Router>
      <div>
        <NavBar />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes >
            <Route exact path="/" component={Dashboard} />
            <Route path="/tasks" component={Tasks} />
          </Routes >
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
