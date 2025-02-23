import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, AppBar, Toolbar } from '@mui/material';
import { PersonAdd as PersonAddIcon } from '@mui/icons-material';

const SignUp = () => {
  let counter=1;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://10.191.243.51:5000/api/users/signup', {name, email, password,address });
        console.log('Response:', response); // Log the response for debugging
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('Id',counter++)
        navigate('/login');
    } catch (error) {
        console.error('Error logging in:', error.response ? error.response.data : error.message); 
        alert('Invalid credentials, please try again.');
    }
};

  return (
    <Container maxWidth="sm">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" className="header">
            Order Management System
          </Typography>
        </Toolbar>
      </AppBar>
      <Box mt={4} p={3} boxShadow={3} borderRadius={2} bgcolor="white">
        <Typography variant="h4" component="h2" gutterBottom>
          Sign Up
        </Typography>
        <form onSubmit={handleSignUp}>
          <TextField
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<PersonAddIcon />}
            fullWidth
            className="button"
          >
            Sign Up
          </Button>
        </form>
      </Box>
      <Box mt={4} textAlign="center" className="footer">
        <Typography variant="body2" color="textSecondary">
          © 2025 Order Management System
        </Typography>
      </Box>
    </Container>
  );
};

export default SignUp;