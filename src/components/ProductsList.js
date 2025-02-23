import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // ✅ Correct usage of useNavigate

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://10.191.243.51:5000/api/products");
        setProducts(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <Typography align="center">Loading...</Typography>;
  if (error) return <Typography color="error" align="center">Error: {error}</Typography>;

  const addToCart = (product) => {
    let items =localStorage.getItem("items"); // ✅ Parse localStorage
    items = items ? JSON.parse(items) : [];
    items.push(product);
    localStorage.setItem("items", JSON.stringify(items)); 
    alert(`${product.name} added to cart!`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Products
      </Typography>
      <Button 
        variant="contained" 
        color="secondary" 
        style={{ marginBottom: "20px" }} 
        onClick={() => navigate("/Cart")} 
      >
        Go to Cart
      </Button>
      <Grid container spacing={3} justifyContent="center">
        {products.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {product.description}
                </Typography>
                <Typography variant="body1" style={{ marginTop: "10px" }}>
                  Stock: {product.stock}
                </Typography>
                <Typography variant="body1">Price: ${product.price}</Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  fullWidth 
                  style={{ marginTop: "10px" }} 
                  onClick={() => addToCart(product)} // ✅ Pass product correctly
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ProductsList;
