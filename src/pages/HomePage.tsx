import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import { Box, Button, Paper } from '@mui/material';
// import './HomePage.css';

const HomePage = () => {
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div className="home-container">
      <Paper elevation={6} className="form-wrapper">
        {showSignup ? <SignupForm /> : <LoginForm />}
        <Box mt={2} textAlign="center">
          <Button onClick={() => setShowSignup(!showSignup)}>
            {showSignup ? 'Already have an account? Login' : 'New user? Signup'}
          </Button>
        </Box>
      </Paper>
    </div>
  );
};

export default HomePage;
