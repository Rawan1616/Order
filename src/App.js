import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import SignUp from './components/SignUp';
import ProductsList from './components//ProductsList'; 
import PrivateRoute from './components/PrivateRoute'; 
import OrderHistory from './components/OrderHistory'; 
import AddProduct from './components/AddProduct';
import Cart from './components/Cart';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Home />} />
        <Route path="/products" element={<PrivateRoute component={ProductsList} />} />
        <Route path="/" element={<Home />} /> {/* Default route */}
        <Route path="/orders" element={<PrivateRoute component={OrderHistory} />} />
        <Route path="/cart" element={<PrivateRoute component={Cart} />} />
      </Routes>
    </Router>
  );
}

export default App;