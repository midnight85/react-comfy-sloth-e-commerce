import React from "react";
import styled from "styled-components";
import {Filters, Loader, ProductList, Sort, PageHero} from "../components";
import {useProductsContext} from "../context/products_context";

const ProductsPage = () => {
  const {productsLoading} = useProductsContext();

  return (
    <>
      <PageHero title="products" />
      {productsLoading ? (
        <div className="loader-wrapper">
          <Loader />
        </div>
      ) : (
        <Wrapper>
          <div className="products section-center">
            <Filters />
            <div>
              <Sort />
              <ProductList />
            </div>
          </div>
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled.div`
  .products {
    display: grid;
    grid-template-columns: minmax(288px, 1fr);
    gap: 1rem 1.5rem;
    margin: 1rem auto;

    @media (min-width: 768px) {
      grid-template-columns: 200px 1fr;
      margin: 3rem auto;
    }
  }
`;

export default ProductsPage;
