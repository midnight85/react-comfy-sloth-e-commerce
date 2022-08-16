import React from "react";
import styled from "styled-components";
import {useFilterContext} from "../context/filter_context";
import {getUniqueValues, formatPrice} from "../utils/helpers";
import {FaCheck} from "react-icons/fa";
import {useProductsContext} from "../context/products_context";

const Filters = () => {
  const {
    filters: {
      searchQuery,
      company,
      category,
      color,
      price,
      minPrice,
      maxPrice,
      shipping,
    },
    updateFilters,
    clearFilters,
  } = useFilterContext();
  const {products} = useProductsContext();
  const categories = getUniqueValues(products, "category");
  const companies = getUniqueValues(products, "company");
  const colors = getUniqueValues(products, "colors", true);
  return (
    <Wrapper>
      <div className="content">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-control">
            <input
              type="text"
              name="searchQuery"
              placeholder="search"
              className="search-input"
              value={searchQuery}
              onChange={updateFilters}
            />
          </div>
          <div className="form-control">
            <h5>Category</h5>
            <div>
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  name="category"
                  className={
                    category.toLowerCase() === item.toLowerCase()
                      ? "active"
                      : null
                  }
                  onClick={updateFilters}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="form-control">
            <h5>company</h5>
            <select name="company" value={company} onChange={updateFilters}>
              {companies.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="form-control">
            <h5>colors</h5>
            <div className="colors">
              {colors.map((item) => (
                <button
                  key={item}
                  className={
                    item === color
                      ? `active ${item === "all" ? "all-btn" : "color-btn"}`
                      : `${item === "all" ? "all-btn" : "color-btn"}`
                  }
                  name="color"
                  data-color={item}
                  onClick={updateFilters}
                  style={{background: item}}
                >
                  {item === "all" ? "all" : item === color && <FaCheck />}
                </button>
              ))}
            </div>
          </div>
          <div className="form-control">
            <h5>price</h5>
            <p className="price">{formatPrice(price)}</p>
            <input
              type="range"
              name="price"
              onChange={updateFilters}
              min={minPrice}
              max={maxPrice}
              value={price}
            />
          </div>
          <div className="form-control shipping">
            <label htmlFor="shipping">free shipping</label>
            <input
              type="checkbox"
              name="shipping"
              id="shipping"
              onChange={updateFilters}
              checked={shipping}
            />
          </div>
        </form>
        <button className="clear-btn" onClick={clearFilters}>
          clear filters
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
    input {
      width: 100%;
    }
    select {
      width: 100%;
    }
    * {
      font-size: 16px;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.7;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.7rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.8rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
    input {
      width: 20px;
      height: 20px;
    }
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;

export default Filters;
