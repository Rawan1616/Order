import React, { useState } from "react";
import axios from "axios";
import {v4 as uuidv4 } from "uuid"

function AddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") setName(value);
    else if (name === "description") setDescription(value);
    else if (name === "stock") setStock(value);
    else if (name === "price") setPrice(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      id: uuidv4(),
      name,
      description,
      price: parseFloat(price),
      stock: parseInt(stock),
    };

    try {
      const response = await axios.post(
        "http://10.191.243.51:5000/api/products",
        productData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer YOUR_ACCESS_TOKEN`, 
          },
        }
      );

      setMessage("Product added successfully!");
      console.log("Response:", response.data);
      setName("");
      setDescription("");
      setStock(0);
      setPrice(0);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 403) {
          setMessage("Unauthorized! Please check your token.");
        } else if (error.response.status === 400) {
          setMessage("Bad request! Please check your input.");
        } else {
          setMessage("An error occurred while adding the product.");
        }
      } else {
        setMessage("Server not reachable.");
      }
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Product Name" value={name} onChange={handleChange} required />
        <input type="text" name="description" placeholder="Product Description" value={description} onChange={handleChange} required />
        <input type="number" name="stock" placeholder="Stock Quantity" value={stock} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" value={price} onChange={handleChange} required />
        <button type="submit">Add Product</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AddProduct;
