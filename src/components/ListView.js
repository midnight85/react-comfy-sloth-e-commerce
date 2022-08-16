import React from "react";
import styled from "styled-components";
import {formatPrice} from "../utils/helpers";
import {Link} from "react-router-dom";
const ListView = ({filteredProducts}) => {
  return (
    <Wrapper>
      {filteredProducts?.map((product) => {
        const {id, name, image, price, description} = product;
        return (
          <article key={product.id}>
            <img src={image} alt={name} />
            <div>
              <h4>{name}</h4>
              <h5 className="price">{formatPrice(price)}</h5>
              <p>{description.substring(0, 150)}...</p>
              <Link to={`/products/${id}`} className="btn">
                Details
              </Link>
            </div>
          </article>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  row-gap: 3rem;
  article {
    display: grid;
    @media (min-width: 576px) {
      grid-template-columns: 1fr 1.5fr;
      gap: 10px;
    }
    @media (min-width: 992px) {
      grid-template-columns: minmax(300px, 1fr) 2fr;
      column-gap: 2rem;
      align-items: center;
    }
  }
  img {
    width: 100%;
    display: block;
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: var(--radius);
    margin-bottom: 1rem;
  }
  h4 {
    margin-bottom: 0.5rem;
  }
  .price {
    color: var(--clr-primary-6);
    margin-bottom: 0.75rem;
  }
  p {
    max-width: 45em;
    margin-bottom: 1rem;
  }
  .btn {
    font-size: 0.5rem;
    padding: 0.25rem 0.5rem;
  }
`;

export default ListView;
