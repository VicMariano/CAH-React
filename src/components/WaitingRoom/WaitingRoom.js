import ButtonComponent from "components/Button/ButtonComponent";
import { Loading } from "components/Loading/Loading";
import { useRoomContext } from "contexts/RoomContext";
import React from "react";
import { useEffect } from "react/cjs/react.development";
import { Api } from "services/api";

export const WaitingRoom = ({ start }) => {
  const { room, setRoom, imOwner } = useRoomContext();

  useEffect(() => {
    if (room && room.roomId) {
      Api.listenRoom(room.roomId, setRoom);
    }
  }, []);

  useEffect(() => {
    return console.log("The room is changing! ", room);
  }, [room]);

  const list = room
    ? room.players.map((player, index) => (
        <li key={index}>{player.displayName}</li>
      ))
    : null;
  return (
    <div>
      {room ? (
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
            <h3>Sala: {room.roomId ?? "Id Hardcoded"}</h3>
            <ol style={{ textAlign: "left" }}>{list}</ol>
          </div>
          {imOwner && (
            <ButtonComponent
              text="Comenzar"
              onClick={() => start(true)}
            ></ButtonComponent>
          )}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};
