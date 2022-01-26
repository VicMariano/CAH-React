import React from "react";
import "./Navbar.css";
import { Nav, NavButton } from "./NavbarElements";
import firebaseApp from "../../services/firebaseCredentials";
import { getAuth, signOut } from "@firebase/auth";
import { useAuth } from "contexts/AuthContext";
import Home from "routes/home";
import { useRedirect } from "contexts/RedirectContext";
const auth = getAuth(firebaseApp);

export default function Navbar() {
  const { user } = useAuth();
  const { setPage } = useRedirect();
  const componentChange = (pageNum) => {
    console.log("setting page", pageNum);
    setPage(pageNum);
  };
  const onSignOut = () => {
    signOut(auth);
    componentChange(3);
  };

  return (
    <>
      <Nav className="navbar">
        <NavButton onClick={() => componentChange(0)}> CAH</NavButton>
        <div className="nav-menu">
          {auth.currentUser && (
            <NavButton onClick={() => componentChange(1)}>
              Agregar carta
            </NavButton>
          )}
          {auth.currentUser && (
            <NavButton onClick={() => componentChange(2)}>Colección</NavButton>
          )}
          {auth.currentUser && (
            <NavButton onClick={() => onSignOut()}>Cerrar Sesión</NavButton>
          )}
        </div>
      </Nav>
    </>
  );
}
