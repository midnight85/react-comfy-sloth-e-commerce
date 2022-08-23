import React, {useContext, useEffect, useState} from "react";

const UserContext = React.createContext();
const state = {};
export const UserProvider = ({children}) => {
  const value = {};
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
// make sure use
export const useUserContext = () => {
  return useContext(UserContext);
};
