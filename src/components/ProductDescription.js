import React from "react";
import {formatPrice} from "../utils/helpers";
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from "../components";
import styled from "styled-components";

const ProductDescription = ({product}) => {
  const {id, name, price, description, stock, stars, reviews, company} =
    product;
  return (
    <Wrapper className="content">
      <h2>{name}</h2>
      <Stars stars={stars} reviews={reviews} />
      <h5 className="price">{formatPrice(price)}</h5>
      <p className="desc">{description}</p>
      <p className="info">
        <span>Available: </span>
        {stock > 0 ? "In stock" : "Out of stock"}
        {stock > 0 && stock <= 5 && (
          <i style={{color: "#fb5959"}}> Only {stock} left</i>
        )}
      </p>
      <p className="info">
        <span>ID: </span>
        {id}
      </p>
      <p className="info">
        <span>Brand: </span>
        {company}
      </p>
      <hr />
      {stock > 0 && <AddToCart product={product} />}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: flex;
    gap: 10px;
    span {
      font-weight: 700;
    }
  }
  @media (min-width: 992px) {
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default ProductDescription;
