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
  allProducts: [],
  filteredProducts: [],
  gridView: true,
  sort: "name-a",
  filters: {
    searchQuery: "",
    company: "all",
    category: "all",
    color: "all",
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    shipping: false,
  },
};

const FilterContext = React.createContext();

export const FilterProvider = ({children}) => {
  const {products} = useProductsContext();
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    setProducts();
  }, [products]);

  useEffect(() => {
    dispatch({type: FILTER_PRODUCTS});
    dispatch({type: SORT_PRODUCTS});
  }, [products, state.sort, state.filters]);

  const setProducts = () => {
    dispatch({type: SET_PRODUCTS, payload: products});
  };
  const setGridView = () => {
    dispatch({type: SET_GRIDVIEW});
  };
  const setListView = () => {
    dispatch({type: SET_LISTVIEW});
  };
  const setSort = (e) => {
    const value = e.target.value;
    dispatch({type: UPDATE_SORT, payload: value});
  };
  const updateFilters = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "category") value = e.target.textContent;
    if (name === "color") value = e.target.dataset.color;
    if (name === "price") value = +value;
    if (name === "shipping") value = e.target.checked;

    dispatch({type: UPDATE_FILTERS, payload: {name, value}});
  };
  const clearFilters = () => {
    dispatch({type: CLEAR_FILTERS, payload: products});
  };

  const value = {
    ...state,
    setProducts,
    setGridView,
    setListView,
    setSort,
    updateFilters,
    clearFilters,
  };
  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};
