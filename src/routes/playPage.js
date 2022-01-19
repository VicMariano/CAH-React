import React, { useState, useEffect } from "react";
import { Api } from "../services/api";
import Card from "../components/Cards/Card";
import Room from "../components/Room/Room";
import { CardDeckContext } from "../auth/CardDecksContext";

export default function PlayPage() {
  return (
    <main className="container" style={{ padding: "1rem 0" }}>
      {/* <h2>{`Sala : ${roomId}`}</h2> */}

      <Room />
      {/* {mainBlackCard && (
        <div className="main-black-card">
          <Card
            text={mainBlackCard.text}
            cardType={mainBlackCard.cardType}
            key={mainBlackCard.id}
          />
        </div>
      )} */}
      {/* <button className="button" onClick={() => setShowCards(!showCards)}>
        {showCards ? "Ocultar cartas" : "Mostrar cartas"}
      </button> */}
      {/* {cardsToShow && <div className="w-card-displayer">{cardsToShow}</div>} */}
    </main>
  );
}
