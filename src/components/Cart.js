import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";

function Cart() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const storedItems = localStorage.getItem("items");
        if (storedItems) {
            try {
                setProducts(JSON.parse(storedItems));
            } catch (error) {
                console.error("Error parsing cart items:", error);
                setProducts([]);
            }
        }
    }, []);

    const removeFromCart = (item) => {
        const updatedProducts = products.filter((product) => product.productId !== item.productId);
        setProducts(updatedProducts);
        localStorage.setItem("items", JSON.stringify(updatedProducts));
    };

    return (
        <div style={{ padding: "20px" }}>
            <Typography variant="h4" gutterBottom>
                Shopping Cart
            </Typography>
            <Grid container spacing={3}>
                {products.length > 0 ? (
                    products.map((item, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card sx={{ maxWidth: 345, padding: 2 }}>
                                <CardContent>
                                    <Typography variant="h6">{item.name}</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {item.description}
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ marginTop: 1 }}>
                                        Price: ${item.price}
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        sx={{ marginTop: 2 }}
                                        onClick={() => removeFromCart(item)}
                                    >
                                        Remove
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Typography variant="h6" sx={{ marginTop: 2 }}>
                        Your cart is empty.
                    </Typography>
                )}
            </Grid>
            {products.length > 0 && (
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: 3 }}
                    fullWidth
                >
                    Check Out
                </Button>
            )}
        </div>
    );
}

export default Cart;
