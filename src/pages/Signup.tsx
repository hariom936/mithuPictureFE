import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';
import { API_ENDPOINTS } from '../config/api';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post(API_ENDPOINTS.signup, {
        ...formData,
        phone: parseInt(formData.phone),
        password: parseInt(formData.password),
      });

      if (response.status === 200 || response.data.responseCode === 201 || response.data.success) {
        navigate('/');
      }
    } catch (error: any) {
      console.error('Signup failed:', error.response?.data || error.message);
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
      <Card sx={{ width: 450, p: 3, boxShadow: 5, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Signup
          </Typography>
          {['first_name', 'last_name', 'email', 'phone', 'password'].map((field) => (
            <TextField
              key={field}
              fullWidth
              name={field}
              label={field.replace('_', ' ').toUpperCase()}
              type={field === 'password' ? 'password' : 'text'}
              variant="outlined"
              margin="normal"
              value={(formData as any)[field]}
              onChange={handleChange}
            />
          ))}
          <Button fullWidth variant="contained" sx={{ mt: 2, py: 1.5 }} onClick={handleSignup}>
            Create Account
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Signup;
