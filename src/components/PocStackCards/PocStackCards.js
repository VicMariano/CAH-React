import Card from "components/Cards/Card";
import React from "react";
import styled from "styled-components";

const PocDiv = styled.div`
  display: flex;
  flex-direction: row;
`;
const ChaosWraper = styled.div`
  display: flex;
  flex-direction: row;
  border: 2px solid pink;
  left: 50px;
  transform: rotate(${(props) => props.rotation}deg);
`;

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
const cards = [
  { text: "texto de carta", cardType: "white", id: "efkaudcseiafelfi" },
  { text: "texto de carta", cardType: "white", id: "efksddsisafelfi" },
  { text: "texto de carta", cardType: "white", id: "efkaueiafdddelfi" },
  { text: "texto de carta", cardType: "white", id: "efkaueiafcccelfi" },
];

const chaoticCards = cards.map((card) => ({
  ...card,
  rotation: randomNumber(0, 20),
}));
export const PocStackCards = () => {
  return (
    <PocDiv>
      {chaoticCards &&
        chaoticCards.map((card) => (
          <ChaosWraper rotation={card.rotation} key={card.id}>
            <Card text={card.text} cardType={card.cardType}></Card>
          </ChaosWraper>
        ))}
    </PocDiv>
  );
};
