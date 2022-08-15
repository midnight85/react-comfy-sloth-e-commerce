import React, {useEffect, useContext, useReducer} from "react";
import reducer from "../reducers/filter_reducer";
import {
  SET_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";
import {useProductsContext} from "./products_context";

const initialState = {
  filteredProducts: [],
  gridView: true,
};

const FilterContext = React.createContext();

export const FilterProvider = ({children}) => {
  const {products} = useProductsContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  const setProducts = () => {
    dispatch({type: SET_PRODUCTS, payload: products});
  };
  const setGridView = () => {
    dispatch({type: SET_GRIDVIEW});
  };

  const setListView = () => {
    dispatch({type: SET_LISTVIEW});
  };
  useEffect(() => {
    setProducts();
  }, [products]);

  const value = {...state, setProducts, setGridView, setListView};
  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};
