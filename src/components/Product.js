import React from "react";
import { useState } from "react";
function Product(props)
{
    const [stock,setStock] = useState(localStorage.getItem("stock")||0);
    const addToCart=()=>{

    }
    return(
        <div>
            <h1>{props.name}</h1>
            <p>
                {props.description}
            </p>
            <label>Stock: {props.stock} </label>
            <label>Price: {props.price} $  </label>
            <button onClick={addToCart}>
                Add to cart 
            </button>
        </div>
    )
}
export default Product;
