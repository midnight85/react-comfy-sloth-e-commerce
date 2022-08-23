import React from "react";
import styled from "styled-components";
import AuthForm from "../components/AuthForm";
const LoginPage = () => {
  return (
    <Wrapper className="section section-center">
      <AuthForm title="log in" />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export default LoginPage;
