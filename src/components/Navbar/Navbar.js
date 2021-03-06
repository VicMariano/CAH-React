import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Nav, NavLink } from "./NavbarElements";

export default function Navbar() {
  return (
    <>
      <Nav className="navbar">
        <NavLink to="/"> CAH</NavLink>
        <div className="nav-menu">
          <NavLink to="/play">Play</NavLink>
          <NavLink to="/addCardPage">Add Card</NavLink>
          <NavLink to="/collection">Collection</NavLink>
        </div>
      </Nav>
    </>
  );
}
