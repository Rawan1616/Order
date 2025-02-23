import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Box, List, ListItem, ListItemText } from '@mui/material';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://10.191.243.51:5000/api/orders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        alert('Error fetching orders, please try again.');
      }
    };

    fetchOrders();
  }, []);

  return (
    <Container maxWidth="md">
      <Box mt={4} p={3} boxShadow={3} borderRadius={2} bgcolor="white">
        <Typography variant="h4" component="h2" gutterBottom>
          Order History
        </Typography>
        <List>
          {orders.map((order) => (
            <ListItem key={order.id}>
              <ListItemText
                primary={`Order ID: ${order.id}`}
                secondary={`Date: ${order.date} - Total: ${order.total}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default OrderHistory;