import React from "react";
import {useNavigate} from "react-router-dom";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {useUserContext} from "../context/user_context";
import styled from "styled-components";
import AuthForm from "../components/AuthForm";
const LoginPage = () => {
  const navigate = useNavigate();
  const {setUserData, setUserToLocalStorage, handleAuthError} =
    useUserContext();

  const signInUser = (email, password) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({user}) => {
        console.log(user);
        handleAuthError();
        setUserData(user.email, user.uid, user.accessToken);
        setUserToLocalStorage(user.email, user.uid, user.accessToken);
        navigate("/");
      })

      .catch((error) => {
        handleAuthError(error.code, error.message);
      });
  };
  return (
    <Wrapper className="section section-center">
      <AuthForm title="log in" handleClick={signInUser} />
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
