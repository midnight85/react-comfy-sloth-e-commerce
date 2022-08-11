import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
const ErrorPage = () => {
  return (
    <Wrapper>
      <h1>404</h1>
      <h3>Page not found</h3>
      <Link to="/" className="btn">
        Back to home
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  height: 100%;
  background: var(--clr-primary-10);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  h1 {
    font-size: 8rem;
  }
  h3 {
    text-transform: none;
    margin-bottom: 2rem;
  }
`;

export default ErrorPage;
