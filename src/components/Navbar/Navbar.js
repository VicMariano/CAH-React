import React from "react";
import "./Navbar.css";
import { Nav, NavLink } from "./NavbarElements";

import firebaseApp from "../../services/firebaseCredentials";
import { getAuth, signOut } from "@firebase/auth";
const auth = getAuth(firebaseApp);

export default function Navbar() {
  return (
    <>
      <Nav className="navbar">
        <NavLink to="/"> CAH</NavLink>
        <div className="nav-menu">
          <NavLink to="/playPage">Juego</NavLink>
          <NavLink to="/addCardPage">Agregar carta</NavLink>
          <NavLink to="/collectionPage">Colección</NavLink>
          <button onClick={() => signOut(auth)}>Cerrar Sesión</button>
        </div>
      </Nav>
    </>
  );
}
