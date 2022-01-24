import React, { useState, useEffect } from "react";
import { Api } from "../services/api";
import Room from "../components/Room/Room";
import CardDecksProvider from "../contexts/CardDecksContext";
import { WaitingRoom } from "components/WaitingRoom/WaitingRoom";

export default function PlayPage() {
  const [inGame, setInGame] = useState(false);

  return (
    <main className="container" style={{ padding: "1rem 0" }}>
      {/* <h2>{`Sala : ${roomId}`}</h2> */}
      {!inGame ? (
        <WaitingRoom start={setInGame} />
      ) : (
        <CardDecksProvider>
          <Room />
        </CardDecksProvider>
      )}
    </main>
  );
}
