import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {FaCheck} from "react-icons/fa";
import {useCartContext} from "../context/cart_context";
import AmountButtons from "./AmountButtons";

const AddToCart = ({product}) => {
  const {id, stock, colors} = product;
  const [amount, setAmount] = useState(1);
  const [mainColor, setMainColor] = useState(colors[0]);
  const {cart, addToCart} = useCartContext();
  const [selectedItem, setSelectedItem] = useState(null);
  const [noInStock, setNoInStock] = useState(false);

  const increaseAmount = () => {
    setAmount((prev) => prev + 1);
  };
  const decreaseAmount = () => {
    setAmount((prev) => prev - 1);
  };
  useEffect(() => {
    if (cart.length) {
      //if selected color item in cart
      const cartItem = cart.filter((item) => item.id === id + mainColor);
      if (cartItem) {
        setSelectedItem(cartItem[0]);
      }
    }
  }, [mainColor, cart]);
  useEffect(() => {
    // check amount and stock in selected color item
    if (selectedItem) {
      if (selectedItem.amount + amount < stock) {
        setNoInStock(false);
      } else {
        setNoInStock(true);
      }
    } else {
      setNoInStock(amount === stock);
    }
  }, [amount, mainColor, selectedItem]);
  useEffect(() => {
    // set amount 1 on change color or add to cart
    setAmount(1);
    if (selectedItem) {
      // set amount 0 if out of stock selected color
      if (stock === selectedItem.amount) {
        setAmount(0);
      }
    }
  }, [selectedItem, mainColor, cart]);

  // const checkAmount = () => {
  //   if (selectedItem) setAmount(stock - selectedItem.amount);
  // };

  return (
    <Wrapper>
      <div className="colors">
        <span>color:</span>
        <div>
          {colors.map((color, index) => (
            <button
              key={index}
              style={{backgroundColor: color}}
              className={`${
                mainColor === color ? "color-btn active" : "color-btn"
              }`}
              onClick={() => setMainColor(color)}
            >
              {color === mainColor ? <FaCheck /> : null}
            </button>
          ))}
        </div>
      </div>
      <div className="btn-container">
        <AmountButtons
          amount={amount}
          increaseAmount={increaseAmount}
          decreaseAmount={decreaseAmount}
          noInStock={noInStock}
        />
        <button
          disabled={!amount}
          className="btn"
          onClick={() => {
            addToCart(id, product, mainColor, amount);
          }}
        >
          Add to cart
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.8;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    width: 140px;
    color: "#fff";
    &:disabled {
      opacity: 0.5;
      &:hover {
        cursor: not-allowed;
      }
    }
  }
`;
export default AddToCart;
