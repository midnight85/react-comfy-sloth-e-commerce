import React from "react";
import styled from "styled-components";
import {Filters, ProductList, Sort, PageHero} from "../components";
import {useProductsContext} from "../context/products_context";

const ProductsPage = () => {
  return (
    <>
      <PageHero title="products" />
      <Wrapper>
        <div className="products section-center">
          <Filters />
          <div>
            <Sort />
            <ProductList />
          </div>
        </div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  .products {
    display: grid;
    grid-template-columns: minmax(288px, 1fr);
    gap: 3rem 1.5rem;
    margin: 4rem auto;
  }
  @media (min-width: 768px) {
    .products {
      grid-template-columns: 200px 1fr;
    }
  }
`;

export default ProductsPage;
