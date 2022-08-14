import React from "react";
import styled from "styled-components";
import {useCartContext} from "../context/cart_context";
import {Link} from "react-router-dom";
import {CartContent, PageHero} from "../components";

const CartPage = () => {
  const {cart, removeItem, toggleAmount, clearCart} = useCartContext();

  return (
    <>
      <PageHero title="cart" />
      {cart.length < 1 ? (
        <Wrapper className="empty">
          <h2>Your cart is empty</h2>
          <Link to="/products" className="btn">
            Fill it
          </Link>
        </Wrapper>
      ) : (
        <CartContent />
      )}
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  height: calc(100% - 7vh);
  .empty {
    text-align: center;
    h2 {
      text-transform: none;
    }
  }
`;

export default CartPage;
