import React from "react";
import classes from "./CartItem.module.css";

type CartItemProps = {
  name: string;
  amount: number;
  price: number;
  onRemove: () => void;
  onAdd: () => void;
};

const CartItem: React.FC<CartItemProps> = ({
  name,
  amount,
  price,
  onRemove,
  onAdd,
}) => {
  const formattedPrice = `₹${price.toFixed(2)}`;

  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{formattedPrice}</span>
          <span className={classes.amount}>x {amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={onRemove}>−</button>
        <button onClick={onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
