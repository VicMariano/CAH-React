import React, { useState, useEffect } from "react";
import Card from "../components/Cards/Card";
import { Api } from "../services/api";

export default function CollectionPage() {
  const [whiteCards, setWhiteCards] = useState([]);
  const [blackCards, setBlackCards] = useState([]);

  const fetchCards = async () => {
    const bCard = await Api.getAllBlackCards();
    const wCards = await Api.getAllWhiteCards();
    console.log(wCards, bCard);
    bCard.length && setBlackCards(bCard);
    wCards.length && setWhiteCards(wCards);
  };

  useEffect(() => {
    // cuando use firestore, checkear primero si las variables del service contienen los mazos ya guardados
    fetchCards();
  }, []);

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
