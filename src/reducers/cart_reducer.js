import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const {id, product, color, amount} = action.payload;
      const tempItem = state.cart.find((item) => item.id === id + color);
      if (tempItem) {
        const tempCart = state.cart.map((item) => {
          if (item.id === tempItem.id) {
            return {
              ...item,
              amount:
                item.amount + amount > item.maxAmount
                  ? item.maxAmount
                  : item.amount + amount,
            };
          } else {
            return item;
          }
        });

        return {...state, cart: tempCart};
      } else {
        const newItem = {
          id: id + color,
          name: product.name,
          color,
          amount,
          image: product.images[0].url,
          price: product.price,
          maxAmount: product.stock,
        };
        return {...state, cart: [...state.cart, newItem]};
      }
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default cart_reducer;
