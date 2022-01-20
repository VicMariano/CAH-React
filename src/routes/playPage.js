import React, { useState, useEffect } from "react";
import { Api } from "../services/api";
import Room from "../components/Room/Room";
import CardDecksProvider, { CardDeckContext } from "../auth/CardDecksContext";

export default function PlayPage() {
  return (
    <main className="container" style={{ padding: "1rem 0" }}>
      {/* <h2>{`Sala : ${roomId}`}</h2> */}
      <CardDecksProvider>
        <Room />
      </CardDecksProvider>
    </main>
  );
}
