import React, { useEffect, useState } from "react";
import Card from "components/Cards/Card";
import { HandDisplayerElement } from "./HandDisplayerElement";
import { initializeApp } from "@firebase/app";

export default function HandDisplayer({ whiteCards = [], onSelect }) {
  const [cards, setCards] = useState(null);

  useEffect(() => {
    setCards(
      whiteCards &&
        whiteCards.map((card) => (
          <Card
            text={card.text}
            cardType={card.cardType}
            key={card.id}
            onSelect={() => cardSelected(card.id)}
          />
        ))
    );
  }, [whiteCards]);

  const cardSelected = (id) => {
    onSelect(id);
    const indexToDelete = whiteCards.findIndex((card) => card.id === id);
    let newCards = whiteCards;
    newCards.splice(indexToDelete, 1);
    setCards(
      newCards.map((card) => (
        <Card
          text={card.text}
          cardType={card.cardType}
          key={card.id}
          onSelect={() => cardSelected(card.id)}
        />
      ))
    );
  };
  console.log("cards", cards);
  return (
    <div>{cards && <HandDisplayerElement> {cards}</HandDisplayerElement>}</div>
  );
}
