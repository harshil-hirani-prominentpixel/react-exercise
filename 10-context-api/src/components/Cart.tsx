import React from "react";
import { useCart } from "../context/CartContext";

const Cart: React.FC = () => {
  const { state, removeFromCart } = useCart();

  const total = state.items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className='cart'>
      <h1>Cart</h1>
      {state.items.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <ul>
          {state.items.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price}{" "}
              <button onClick={() => removeFromCart(item.id)}>❌</button>
            </li>
          ))}
        </ul>
      )}
      <h3>Total Bill: ${total}</h3>
    </div>
  );
};

export default Cart;
