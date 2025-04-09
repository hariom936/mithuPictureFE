import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import { Paper } from '@mui/material';
// import './HomePage.css';

const HomePage = () => {
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div className="home-container">
      <Paper elevation={6} className="form-wrapper">
        {showSignup ? <SignupForm /> : <LoginForm />}
      </Paper>
    </div>
  );
};

export default HomePage;
