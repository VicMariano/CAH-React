import { useState, createContext, useContext, useEffect } from "react";

export const RedirectContext = createContext(null);

const RedirectProvider = ({ children }) => {
  const [page, setPage] = useState(0);

  return (
    <RedirectContext.Provider value={{ page, setPage }}>
      {children}
    </RedirectContext.Provider>
  );
};

export const useRedirect = () => {
  const context = useContext(RedirectContext);
  if (context === undefined) {
    throw new Error("useRedirect must be used within a RedirectProvider");
  }
  return context;
};

export default RedirectProvider;
