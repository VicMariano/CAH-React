import React, { useState, useEffect } from "react";
import { getAllWhiteCards, getMainBlackCard } from "../services/api";
import Card from "../components/Cards/Card";

export default function PlayPage() {
  const [whiteCards, setWhiteCards] = useState([]);
  const [mainBlackCard, setMainBlackCard] = useState({});

  // gets all white cards from db
  const fetchAllWhiteCards = async () => {
    const response = await getAllWhiteCards();
    console.log(response.data);
    setWhiteCards(response.data);
  };

  // gets 1 black cards from db by id
  const fetchMainBlackCard = async () => {
    try {
      const response = await getMainBlackCard(getRandomInt(1, 5));
      console.log("carta negra", response.data);
      setMainBlackCard(response.data);
    } catch (err) {
      console.log("ERRRORRR");
      throw new Error("Unable to get a token.");
    }
  };

  // randomize number to choose card/s
  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  useEffect(() => {
    fetchAllWhiteCards();
    fetchMainBlackCard();
  }, []);

  const cardsToShow =
    whiteCards.length &&
    whiteCards.map((card) => (
      <Card text={card.text} cardType={card.cardType} key={card.id} />
    ));
  return (
    <main style={{ padding: "1rem 0" }}>
      <h2>Play</h2>
      {mainBlackCard && (
        <Card
          text={mainBlackCard.text}
          cardType={mainBlackCard.cardType}
          key={mainBlackCard.id}
        />
      )}
      {/* <button className="button" onClick={() => setShowCards(!showCards)}>
        {showCards ? "Ocultar cartas" : "Mostrar cartas"}
      </button> */}
      <div className="w-card-displayer">{cardsToShow}</div>
    </main>
  );
}
