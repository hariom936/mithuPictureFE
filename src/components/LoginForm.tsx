import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardContent, TextField, Typography, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      console.log('Sending login with:', { email, password });
      const response = await axios.post(API_ENDPOINTS.login, {
        email: email.trim(),
        password: parseInt(password.trim(), 10), // if backend expects number
      });
      if (response.data.responseCode === 200) {
        localStorage.setItem('token', response.data.data.user.token);
        navigate('/dashboard');
      }
    } catch (error: any) {
      console.error('Login failed:', error.response?.data || error.message);
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: `url('/bg.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Card sx={{ width: 400, p: 2, boxShadow: 5, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Login
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            type="password"
            label="Password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button fullWidth variant="contained" sx={{ mt: 2, py: 1.5 }} onClick={handleLogin}>
            Login
          </Button>
          <Typography align="center" sx={{ mt: 2 }}>
            New user?{' '}
            <MuiLink component={Link} to="/signup" underline="hover">
              Signup
            </MuiLink>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
