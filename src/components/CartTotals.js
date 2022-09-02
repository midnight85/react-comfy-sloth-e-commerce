import React from "react";
import styled from "styled-components";
import {useCartContext} from "../context/cart_context";
import {useUserContext} from "../context/user_context";
import {formatPrice} from "../utils/helpers";
import {Link} from "react-router-dom";

const CartTotals = () => {
  const {totalItems, totalAmount, shippingFee} = useCartContext();
  const {user} = useUserContext();
  return (
    <Wrapper>
      <div>
        <article>
          <h5>
            subtotal : <span>{formatPrice(totalAmount)}</span>
          </h5>
          <p>
            shipping fee : <span>{formatPrice(shippingFee)}</span>
          </p>
          <hr />
          <h4>
            order total : <span>{formatPrice(totalAmount + shippingFee)}</span>
          </h4>
        </article>
        {!!user.email ? (
          <Link to="/checkout" className="btn">
            Checkout
          </Link>
        ) : (
          <Link to="/login" className="btn">
            Login to checkout
          </Link>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  article {
    border: 1px solid var(--clr-grey-8);
    border-radius: var(--radius);
    padding: 1rem;
  }
  h4,
  h5,
  p {
    display: grid;
    grid-template-columns: 180px 1fr;
  }
  p {
    text-transform: capitalize;
  }
  h4 {
    margin-top: 2rem;
  }
  @media (min-width: 776px) {
    justify-content: flex-end;
    article {
      padding: 1.5rem 3rem;
    }
  }
  .btn {
    width: 100%;
    margin-top: 1rem;
    text-align: center;
    font-weight: 700;
  }
`;

export default CartTotals;
