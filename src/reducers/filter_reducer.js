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
      let minPrice = Math.min(
        ...action.payload.map((item) => (item = item.price))
      );
      const maxPrice = action.payload.reduce((max, item) => {
        if (item.price >= max) {
          max = item.price;
        }
        return max;
      }, 0);
      return {
        ...state,
        allProducts: [...action.payload],
        filteredProducts: [...action.payload],
        filters: {...state.filters, maxPrice, minPrice, price: maxPrice},
      };
    }
    case SET_GRIDVIEW: {
      return {...state, gridView: true};
    }
    case SET_LISTVIEW: {
      return {...state, gridView: false};
    }
    case UPDATE_SORT: {
      return {...state, sort: action.payload};
    }
    case SORT_PRODUCTS: {
      switch (state.sort) {
        case "price-lowest": {
          return {
            ...state,
            filteredProducts: state.filteredProducts.sort(
              (a, b) => a.price - b.price
            ),
          };
        }
        case "price-highest": {
          return {
            ...state,
            filteredProducts: state.filteredProducts.sort(
              (a, b) => b.price - a.price
            ),
          };
        }
        case "name-a": {
          return {
            ...state,
            filteredProducts: state.filteredProducts.sort((a, b) =>
              a.name.localeCompare(b.name)
            ),
          };
        }
        case "name-z": {
          return {
            ...state,
            filteredProducts: state.filteredProducts.sort((a, b) =>
              b.name.localeCompare(a.name)
            ),
          };
        }
        default:
          return {...state};
      }
    }
    case UPDATE_FILTERS: {
      const {name, value} = action.payload;
      return {...state, filters: {...state.filters, [name]: value}};
    }
    case FILTER_PRODUCTS: {
      const {allProducts} = state;
      const {searchQuery, company, category, color, price, maxPrice, shipping} =
        state.filters;
      let tempProducts = [...allProducts];
      if (searchQuery) {
        tempProducts = tempProducts.filter((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      if (category !== "all") {
        tempProducts = tempProducts.filter(
          (item) => item.category === category
        );
      }
      if (company !== "all") {
        tempProducts = tempProducts.filter((item) => item.company === company);
      }
      if (color !== "all") {
        tempProducts = tempProducts.filter((item) =>
          item.colors.includes(color)
        );
      }
      if (price !== maxPrice) {
        tempProducts = tempProducts.filter((item) => item.price <= price);
      }
      if (shipping) {
        tempProducts = tempProducts.filter((item) => item.shipping);
      }
      return {...state, filteredProducts: tempProducts};
    }
    case CLEAR_FILTERS: {
      return {
        ...state,
        filters: {
          ...state.filters,
          searchQuery: "",
          company: "all",
          category: "all",
          color: "all",
          price: state.filters.maxPrice,
          shipping: false,
        },
      };
    }
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default filter_reducer;
