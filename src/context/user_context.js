import React, {useContext, useEffect, useState} from "react";

const UserContext = React.createContext();

export const UserProvider = ({children}) => {
  const setUserToLocalStorage = (email, id, token) => {
    localStorage.setItem(
      "comfy-sloth_user",
      JSON.stringify({email, id, token})
    );
  };
  const checkUserInLocalStorage = () => {
    const tempUser = JSON.parse(localStorage.getItem("comfy-sloth_user"));
    if (tempUser) {
      const {email, id, token} = tempUser;
      setUserData(email, id, token);
      return;
    }
    setUserData();
  };
  useEffect(() => {
    checkUserInLocalStorage();
  }, []);
  const [user, setUser] = useState({
    email: null,
    id: null,
    token: null,
  });
  const [authError, setAuthError] = useState({
    errorCode: null,
    errorMessage: null,
  });
  const setUserData = (email = null, id = null, token = null) => {
    setUser((prev) => ({...prev, email, id, token}));
  };
  const removeUser = () => {
    setUser({email: null, id: null, token: null});
    localStorage.removeItem("comfy-sloth_user");
  };
  const handleAuthError = (errorCode = null, errorMessage = null) =>
    setAuthError({errorCode, errorMessage});

  const value = {
    user,
    authError,
    setUserData,
    removeUser,
    handleAuthError,
    setUserToLocalStorage,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
export const useUserContext = () => {
  return useContext(UserContext);
};
