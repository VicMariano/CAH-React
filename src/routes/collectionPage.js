import React, { useState, useEffect } from "react";
import { getAllWhiteCards, getAllBlackCards } from "../services/api";
import Card from "../components/Cards/Card";

export default function CollectionPage() {
  const [whiteCards, setWhiteCards] = useState([]);
  const [blackCards, setBlackCards] = useState([]);

  const fetchCards = async () => {
    const bCard = await getAllBlackCards();
    const wCards = await getAllWhiteCards();
    bCard.data.length && setBlackCards(bCard.data);
    wCards.data.length && setWhiteCards(wCards.data);
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const cardsToShow = (cards) => {
    cards &&
      cards.map((card) => (
        <Card text={card.text} cardType={card.cardType} key={card.id} />
      ));
  };

  return (
    <main style={{ padding: "1rem 0" }}>
      <h2>Colección completa</h2>

      <h3>Black Cards</h3>

      {blackCards.length ? (
        <div className="collection-displayer">
          {blackCards &&
            blackCards.map((card) => (
              <Card text={card.text} cardType={card.cardType} key={card.id} />
            ))}
        </div>
      ) : (
        <h3>No hay cartas negras en tu colección</h3>
      )}
      <hr />
      <h3>White Cards</h3>
      {whiteCards.length ? (
        <div className="collection-displayer">
          {whiteCards &&
            whiteCards.map((card) => (
              <Card text={card.text} cardType={card.cardType} key={card.id} />
            ))}
        </div>
      ) : (
        <h3>No hay cartas blancas en tu colección</h3>
      )}
    </main>
  );
}
