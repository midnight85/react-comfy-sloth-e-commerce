import React, {useEffect, useContext, useReducer} from "react";
import reducer from "../reducers/cart_reducer";
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from "../actions";

const initialState = {
  cart: [],
  totalItems: 0,
  totalAmount: 0,
  shippingFee: 499,
};

const CartContext = React.createContext();

export const CartProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (id, product, color, amount) => {
    dispatch({type: ADD_TO_CART, payload: {id, product, color, amount}});
  };
  const value = {...state, addToCart};
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
// make sure use
export const useCartContext = () => {
  return useContext(CartContext);
};
