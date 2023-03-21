import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import LoginPage from './LoginPage';
import SchedulePage from './SchedulePage';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
}));

const App = () => {
  const classes = useStyles();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className={classes.root}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/" element={isAuthenticated ? <SchedulePage /> : <Navigate to="/login" />} />
          <Route path="/schedule" element={<SchedulePage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
