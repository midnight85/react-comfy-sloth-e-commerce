import {
  SET_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  switch (action.type) {
    case SET_PRODUCTS: {
      return {
        ...state,
        filteredProducts: [...action.payload],
      };
    }
    case SET_GRIDVIEW: {
      return {...state, gridView: true};
    }
    case SET_LISTVIEW: {
      return {...state, gridView: false};
    }
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default filter_reducer;
