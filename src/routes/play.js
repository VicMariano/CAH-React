import React, { useState, useEffect } from "react";
import { getAllCards } from "../services/api";
import Card from "../components/Cards/Card";

export default function Play() {
  const [cards, setCards] = useState([]);
  const [showCards, setShowCards] = useState(false);
  const fetchCards = async () => {
    const response = await getAllCards();
    response.data.length && setShowCards(true);
    setCards(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const cardsToShow =
    showCards &&
    cards.map((card) => (
      <Card text={card.text} cardType={card.cardType} key={card.id} />
    ));
  return (
    <main style={{ padding: "1rem 0" }}>
      <h2>Play</h2>
      <button className="button" onClick={() => setShowCards(!showCards)}>
        {showCards ? "Ocultar cartas" : "Mostrar cartas"}
      </button>
      <div className="w-card-displayer">{cardsToShow}</div>
    </main>
  );
}
