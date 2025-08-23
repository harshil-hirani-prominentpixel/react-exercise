import React from "react";
import { useCart } from "../context/CartContext";

const products = [
  { id: 1, name: "Laptop", price: 50000 },
  { id: 2, name: "Mobile", price: 20000 },
  { id: 3, name: "Headphones", price: 2000 },
];

const ProductList: React.FC = () => {
  const { dispatch } = useCart();

  return (
    <div>
      <h2>Products</h2>
      {products.map((product) => (
        <div key={product.id} style={{ marginBottom: "10px" }}>
          <span>
            {product.name} - ₹{product.price}
          </span>
          <button
            onClick={() => dispatch({ type: "ADD_TO_CART", payload: product })}
            style={{ marginLeft: "10px" }}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
