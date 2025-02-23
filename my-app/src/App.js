import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import SignUp from './Components/SignUp';
import ProductsList from './Components/ProductsList'; // Ensure this path is correct
import PrivateRoute from './Components/PrivateRoute'; // Ensure this path is correct
import OrderHistory from './Components/OrderHistory'; // Ensure this path is correct

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Home />} />
        <Route path="/products" element={<PrivateRoute component={ProductsList} />} />
        <Route path="/" element={<Home />} /> {/* Default route */}
        <Route path="/orders" element={<PrivateRoute component={OrderHistory} />} />
      </Routes>
    </Router>
  );
}

export default App;