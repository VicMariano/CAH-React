import { useState, createContext, useContext } from "react";
import firebaseApp from "services/firebaseCredentials";
import { getAuth, onAuthStateChanged } from "@firebase/auth";

const initialAuth = () => null;
export const AuthContext = createContext(initialAuth());

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(initialAuth());
  const auth = getAuth(firebaseApp);

  onAuthStateChanged(auth, (firebaseUser) => {
    setUser(firebaseUser || null);
  });

  const data = { user, setUser };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

export default AuthProvider;
