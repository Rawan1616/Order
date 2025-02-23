import { useEffect, useState } from "react";
import axios from "axios";
import Product from "./Product";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <Product name={product.name} description={product.description} stock={product.stock} price={product.price}/>
        ))}
      </ul>
    </div>
  );
};

export default ProductsList;
