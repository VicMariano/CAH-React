import React, { useState, useEffect } from "react";
import { Api } from "../services/api";
import Room from "../components/Room/Room";
import CardDecksProvider, {
  CardDeckContext,
} from "../contexts/CardDecksContext";
import { WaitingRoom } from "components/WaitingRoom/WaitingRoom";

export default function PlayPage() {
  const [inGame, setInGame] = useState(false);

  return (
    <main className="container" style={{ padding: "1rem 0" }}>
      {/* <h2>{`Sala : ${roomId}`}</h2> */}
      {!inGame ? (
        <WaitingRoom
          players={["nombre 1", "nombre 2", "nombre 3"]}
          roomId="Nombre Hardcoded"
          start={setInGame}
        />
      ) : (
        <CardDecksProvider>
          <Room />
        </CardDecksProvider>
      )}
    </main>
  );
}
