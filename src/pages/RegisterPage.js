import React from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import AuthForm from "../components/AuthForm";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import {useUserContext} from "../context/user_context";
const RegisterPage = () => {
  const navigate = useNavigate();
  const {setUserData, setUserToLocalStorage, handleAuthError} =
    useUserContext();

  const registerUser = (email, password) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(({user}) => {
        handleAuthError();
        setUserData(user.email, user.uid, user.accessToken);
        setUserToLocalStorage(user.email, user.uid, user.accessToken);
        navigate("/");
      })

      .catch((error) => {
        console.log(error);
        handleAuthError(error.code, error.message);
      });
  };
  return (
    <Wrapper className="section section-center">
      <AuthForm title="Sign up" handleClick={registerUser} />
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
