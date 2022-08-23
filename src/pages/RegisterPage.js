import React from "react";
import styled from "styled-components";
import AuthForm from "../components/AuthForm";
const RegisterPage = () => {
  return (
    <Wrapper className="section section-center">
      <AuthForm title="Sign up" />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  p {
    margin-top: 10px;
    font-size: 1rem;
    text-align: center;
  }
  a {
    transition: all 0.3s ease 0s;
  }
  a:hover {
    color: var(--clr-primary-5);
  }
  .authBody {
  }
  .auth {
    max-width: 500px;
    width: 100%;
    padding: 10px;
    &__title {
      font-style: normal;
      font-weight: bold;
      font-size: 34px;
      line-height: 40px;
      margin-bottom: 40px;
    }
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 100%;
  }

  .btn {
    padding: 20px;
    font-size: 1rem;
    border-radius: 10px;
  }

  .err {
    outline: 1px solid #ff0000;
  }
`;

export default RegisterPage;
