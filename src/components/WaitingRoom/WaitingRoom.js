import ButtonComponent from "components/Button/ButtonComponent";
import React from "react";

export const WaitingRoom = ({ players, roomId, start }) => {
  console.log(players);
  const list = players ? players.map((player) => <li>{player}</li>) : null;

  return (
    <div>
      <div
        style={{
          width: "70%",
          height: "50%",
          border: "3px solid #ffff",
          borderRadius: "0.5em",
          padding: "1em 2em",
          marginBottom: "1em",
        }}
      >
        <h3>Sala: {roomId}</h3>
        <ol style={{ textAlign: "left" }}>{list}</ol>
      </div>
      <ButtonComponent
        text="Comenzar"
        onClick={() => start(true)}
      ></ButtonComponent>
    </div>
  );
};
