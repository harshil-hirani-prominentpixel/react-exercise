import React, { createContext, useContext, useReducer, ReactNode } from "react";

type Item = {
  id: number;
  name: string;
  price: number;
};

type CartState = {
  items: Item[];
};

type CartAction =
  | { type: "ADD"; payload: Item }
  | { type: "REMOVE"; payload: number };

const initialState: CartState = {
  items: [],
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD":
      return { ...state, items: [...state.items, action.payload] };
    case "REMOVE":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
}

type CartContextType = {
  state: CartState;
  addToCart: (item: Item) => void;
  removeFromCart: (id: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (item: Item) => dispatch({ type: "ADD", payload: item });
  const removeFromCart = (id: number) =>
    dispatch({ type: "REMOVE", payload: id });

  return (
    <CartContext.Provider value={{ state, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
};
