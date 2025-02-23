import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box, AppBar, Toolbar } from '@mui/material';
import { Login as LoginIcon } from '@mui/icons-material';
// import './App.css';

const Home = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://10.191.243.51:5000/api/users/signin', { email, password }); // Ensure the correct API endpoint
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('items', JSON.parse(localStorage.getItem("items"))||[]);
      navigate('/products'); // Redirect to the products page
    } catch (error) {
      console.error('Error logging in:', error);
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
          Welcome to the Order Management System
        </Typography>
        <form onSubmit={handleLogin}>
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<LoginIcon />}
            fullWidth
            className="button"
          >
            Login
          </Button>
        </form>
        <Box mt={2} textAlign="center">
          <Typography variant="body1">
            Don't have an account? <Link to="/signup" className="link">Sign Up</Link>
          </Typography>
        </Box>
      </Box>
      <Box mt={4} textAlign="center" className="footer">
        <Typography variant="body2" color="textSecondary">
          © 2025 Order Management System
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;