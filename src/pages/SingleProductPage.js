import React, {useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {useProductsContext} from "../context/products_context";
import {single_product_url as url} from "../utils/constants";
import {
  Loading,
  Error,
  ProductImages,
  ProductDescription,
  PageHero,
} from "../components";
import styled from "styled-components";
import {Link} from "react-router-dom";

const SingleProductPage = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const {
    singleProductLoading: loading,
    singleProductError: error,
    singleProduct: product,
    fetchSingleProduct,
  } = useProductsContext();
  useEffect(() => {
    fetchSingleProduct(`${url}${id}`);
  }, []);

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        navigate("/");
      }, 3000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [error]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }
  return (
    <>
      <PageHero title={product.name} product />
      <Wrapper className="section section-center">
        <Link to="/products" className="btn">
          Back to products
        </Link>
        <div className="product-center">
          <ProductImages images={product.images} />
          <ProductDescription product={product} />
        </div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
  }
`;

export default SingleProductPage;
