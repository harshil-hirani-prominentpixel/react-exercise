import React, { useReducer, ReactNode } from "react";
import CartContext, { CartItem } from "./cart-context";

type CartState = {
  items: CartItem[];
  totalAmount: number;
};

type CartAction =
  | { type: "ADD"; item: CartItem }
  | { type: "REMOVE"; id: string };

const defaultCartState: CartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  if (action.type === "ADD") {
    const updatedItems = state.items.concat(action.item);
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    // TODO: implement logic (right now just returns state unchanged)
    return {
      ...state,
    };
  }

  return defaultCartState;
};

type CartProviderProps = {
  children: ReactNode;
};

const CartProvider: React.FC<CartProviderProps> = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item: CartItem) => {
    dispatchCartAction({ type: "ADD", item });
  };

  const removeItemFromCartHandler = (id: string) => {
    dispatchCartAction({ type: "REMOVE", id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
