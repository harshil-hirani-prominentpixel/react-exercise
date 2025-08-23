import React from "react";
import { useCart } from "../context/CartContext";

const Cart: React.FC = () => {
  const { state, dispatch } = useCart();

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Cart</h2>
      {state.cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <ul>
          {state.cart.map((item) => (
            <li key={item.id}>
              {item.name} - ₹{item.price}
              <button
                onClick={() =>
                  dispatch({ type: "REMOVE_FROM_CART", payload: item.id })
                }
                style={{ marginLeft: "10px" }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      <h3>Total: ₹{state.cart.reduce((acc, item) => acc + item.price, 0)}</h3>
    </div>
  );
};

export default Cart;
