import React from "react";
import classes from "./Cart.module.css";

type CartItem = {
  id: string;
  name: string;
  amount: number;
  price: number;
};

type CartProps = {

};

const Cart: React.FC<CartProps> = (props) => {
  const cartData: CartItem[] = [
    { id: "c1", name: "Harshil", amount: 2, price: 13.15 },
  ];

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartData.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );

  return (
    <div>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>35.62</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]}>Close</button>
        <button className={classes.button}>Order</button>
      </div>
    </div>
  );
};

export default Cart;
