import { useState, createContext, useEffect } from "react";

export const AuthContext = createContext("");
const initialAuth = {};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(initialAuth);
  // useEffect(() => {
  //   console.log("ejec por que USER", user);
  // }, [user]);

  const data = { user, setUser };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
