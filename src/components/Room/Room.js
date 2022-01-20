import React, { useState, useEffect } from "react";
import "../../App.css";
import "./Room.css";
import { Api } from "../../services/api";
import { useDecksContext } from "../../auth/CardDecksContext";
import Card from "../Cards/Card";
import { blackCards } from "../../services/firestoreService";
import HandDisplayer from "components/HandDisplayer/HandDisplayer";

export default function Room({ roomId }) {
  const { whiteDeck, setWhiteDeck, setBlackDeck } = useDecksContext();
  const [mainBlackCard, setMainBlackCard] = useState({});
  const [whiteCardsHand, setWhiteCardsHand] = useState({});

  // gets all white cards from db
  const fetchWhiteDeck = async () => {
    const response = await Api.getAllWhiteCards();
    setWhiteDeck(response);
  };

  // gets all black cards from db
  const fetchBlackDeck = async () => {
    const response = await Api.getAllBlackCards();
    setBlackDeck(response);
    getMainBlackCard(response);
  };

  // gets 1 random black cards from deck by index
  const getMainBlackCard = async (blackDeck) => {
    const randomIndex = getRandomInt(0, blackDeck.length - 1);
    const mainBC = blackDeck[randomIndex];
    console.log("Main Black ", mainBC);
    setMainBlackCard(mainBC);
  };

  // randomize number to choose card/s
  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const onSelectWCard = (id) => {
    console.log("from Room", id);
  };

  useEffect(() => {
    fetchWhiteDeck();
    fetchBlackDeck();
  }, []);

  return (
    <div className="container">
      <div className="room-header">
        <div>
          <h4>Id de la Sala: xxxxxxxxxx</h4>
        </div>
        <div style={{ textAlign: "right" }}>
          <h5>Round: 0</h5>
          <h5>Rounds ganados: 0</h5>
        </div>
      </div>

      {/* main black card*/}
      {mainBlackCard && (
        <div className="main-black-card">
          <Card
            text={mainBlackCard.text}
            cardType={mainBlackCard.cardType}
            key={1}
          />
        </div>
      )}
      {/* a hand of white cards */}
      <HandDisplayer whiteCards={whiteDeck} onSelect={onSelectWCard} />
      {/* mas adelante: la opción de escribir tu propia carta blanca */}
    </div>
  );
}
