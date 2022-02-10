import React, { createContext,useState } from "react";

export const AuthContext = createContext();



export const AuthContextProvider = ({ children }) => {
    const [auth,setAuth] = useState(false)
    const [role,setRole] = useState('')
    const value={auth,setAuth,role,setRole}
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
