import React from "react";
import {useFilterContext} from "../context/filter_context";
import {BsFillGridFill, BsList} from "react-icons/bs";
import styled from "styled-components";
const Sort = () => {
  const {filteredProducts, gridView, setGridView, setListView, sort, setSort} =
    useFilterContext();
  return (
    <Wrapper>
      <div className="btn-container">
        <button
          type="button"
          className={gridView ? "active" : null}
          onClick={setGridView}
        >
          <BsFillGridFill />
        </button>
        <button
          type="button"
          className={!gridView ? "active" : null}
          onClick={setListView}
        >
          <BsList />
        </button>
      </div>
      <p>{filteredProducts.length} products found</p>
      <hr />
      <form>
        <label htmlFor="sort">sort by </label>
        <select
          name="sort"
          id="sort"
          className="sort-input"
          value={sort}
          onChange={setSort}
        >
          <option value="price-lowest">price (lowest first)</option>
          <option value="price-highest">price (highest first)</option>
          <option value="name-a">name (a-z)</option>
          <option value="name-z">name (z-a)</option>
        </select>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .btn-container {
    grid-area: btn-cont;
  }
  p {
    grid-area: ptext;
  }
  hr {
    grid-area: hr;
    width: 100%;
  }
  form {
    grid-area: select;
  }

  display: grid;
  /* grid-template-columns: auto auto 1fr auto; */
  grid-template-areas: "btn-cont ptext hr select";
  align-items: center;
  margin-bottom: 2rem;

  @media (max-width: 576px) {
    display: grid;
    grid-template-areas:
      "btn-cont select"
      "hr hr"
      "ptext ptext";
    row-gap: 0.75rem;
    .btn-container {
      width: 50px;
    }
    label {
      display: inline-block;
      margin-right: 0.5rem;
    }
  }
  @media (max-width: 425px) {
    grid-template-areas:
      "btn-cont"
      "select"
      "hr"
      "ptext";
    justify-items: start;
  }
  @media (min-width: 768px) {
  }
  p {
    text-transform: capitalize;
    margin-bottom: 0;
  }

  .btn-container {
    display: flex;
    column-gap: 0.5rem;
    button {
      background: transparent;
      border: 1px solid var(--clr-black);
      color: var(--clr-black);
      width: 1.5rem;
      border-radius: var(--radius);
      height: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      svg {
        font-size: 1rem;
      }
    }
    .active {
      background: var(--clr-black);
      color: var(--clr-white);
    }
  }

  .sort-input {
    border-color: transparent;
    font-size: 1rem;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
  }
  form {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  label {
    font-size: 1rem;
    text-transform: capitalize;
  }
  select {
    /* width: 100%; */
  }
`;

export default Sort;
