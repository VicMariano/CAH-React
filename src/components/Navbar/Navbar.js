import React from "react";
import "./Navbar.css";
import { Nav, NavLink } from "./NavbarElements";

import firebaseApp from "../../services/firebaseCredentials";
import { getAuth, signOut } from "@firebase/auth";
import { useAuth } from "contexts/AuthContext";
const auth = getAuth(firebaseApp);
export default function Navbar() {
  const { user } = useAuth();

  return (
    <>
      <Nav className="navbar">
        <NavLink to="/home"> CAH</NavLink>
        <div className="nav-menu">
          {auth.currentUser && (
            <NavLink to="/addCardPage">Agregar carta</NavLink>
          )}
          {auth.currentUser && (
            <NavLink to="/collectionPage">Colección</NavLink>
          )}
          {auth.currentUser && (
            <NavLink to="/home" onClick={() => signOut(auth)}>
              Cerrar Sesión
            </NavLink>
          )}
        </div>
      </Nav>
    </>
  );
}
