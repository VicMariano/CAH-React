import "./App.css";
import AuthProvider, { useAuth } from "./contexts/AuthContext";
import { useState } from "react/cjs/react.development";
import Login from "components/Login/Login";
import Navbar from "components/Navbar/Navbar";
import Main from "./components/Main/Main";
import RedirectProvider from "contexts/RedirectContext";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <RedirectProvider>
          <Main />
        </RedirectProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
