import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
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
    }
    case CLEAR_CART: {
      return {...state, cart: []};
    }
    case COUNT_CART_TOTALS: {
      let {totalItems, totalAmount} = state.cart.reduce(
        (total, item) => {
          total.totalItems += item.amount;
          total.totalAmount += item.amount * item.price;
          return total;
        },
        {
          totalItems: 0,
          totalAmount: 0,
        }
      );
      return {...state, totalItems, totalAmount};
    }
    case REMOVE_CART_ITEM: {
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    }
    case TOGGLE_CART_ITEM_AMOUNT: {
      const {id, value} = action.payload;
      const tempCart = state.cart.map((item) => {
        if (item.id === id) {
          return {...item, amount: value};
        } else {
          return item;
        }
      });
      return {...state, cart: tempCart};
    }
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default cart_reducer;
