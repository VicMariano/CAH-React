import React, { useState, useEffect, useContext } from "react";
import { Api } from "../../services/api";
import CardDecksProvider, {
  CardDeckContext,
} from "../../auth/CardDecksContext";
import Card from "../Cards/Card";
import { blackCards } from "../../services/firestoreService";

export default function Room({ whiteCards, blackCard, roomId, ...props }) {
  const { whiteDeck, setWhiteDeck } = useContext(CardDeckContext);
  console.log(CardDeckContext);
  // const [] = useContext(CardDeckContext);

  const [mainBlackCard, setMainBlackCard] = useState({});
  const cardsToShow = [];
  // gets all white cards from db
  const fetchWhiteDeck = async () => {
    console.log("fetchwhites");

    const response = await Api.getAllWhiteCards();
    console.log(response);
    setWhiteDeck(response);
  };
  // gets all black cards from db
  // const fetchBlackDeck = async () => {
  //   const response = await Api.getAllBlackCards();
  //   console.log(response);
  //   setBlackDeck(response);
  //   getMainBlackCard(response);
  // };

  // gets 1 black cards from deck by index
  const getMainBlackCard = async (blackDeck) => {
    const randomIndex = getRandomInt(0, blackCards.length - 1);
    const mainBC = blackDeck[randomIndex];
    console.log("carta negra ", mainBC);
    setMainBlackCard(mainBC);
  };

  // randomize number to choose card/s
  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  useEffect(() => {
    fetchWhiteDeck();
    // fetchBlackDeck();
  }, []);

  useEffect(() => {
    console.log("uE whitecards");
    const cardsToShow =
      whiteCards.length &&
      whiteCards.map((card) => (
        <Card
          text={card.text}
          cardType={card.cardType}
          key={card.id}
          onClick={() => console.log(`Seleccionada ${roomId}!!`)}
        />
      ));
  }, [whiteDeck]);

  return (
    <div>
      <CardDecksProvider>
        {/* main black card*/}
        {mainBlackCard && (
          <div className="main-black-card">
            <Card
              text={mainBlackCard.text}
              cardType={mainBlackCard.cardType}
              key={mainBlackCard.id}
            />
          </div>
        )}

        {/* a hand of white cards */}
        {cardsToShow && <div className="w-card-displayer">{cardsToShow}</div>}

        {/* mas adelante: la opción de escribir tu propia carta blanca */}
      </CardDecksProvider>
    </div>
  );
}
