import { getAuth } from "@firebase/auth";
import ButtonComponent from "components/Button/ButtonComponent";
import { useRoomContext } from "contexts/RoomContext";
import React from "react";
import { useNavigate } from "react-router";
import { Api } from "services/api";
import firebaseApp from "services/firebaseCredentials";
const auth = getAuth(firebaseApp);

export const AccessRoom = () => {
  const user = auth.currentUser;
  const { setRoom, setImOwner } = useRoomContext();
  const navigate = useNavigate();

  const createRoom = async () => {
    const roomId = prompt("¿Cómo se va a llamar tu sala?: ");
    if (roomId) {
      console.log(`${user.displayName} está creando la sala ${roomId}`);
      let newRoom = null;
      try {
        newRoom = await Api.createRoom(user, roomId);
        if (newRoom) {
          console.log(newRoom);
          setRoom(newRoom);
          setImOwner(true);
          navigate("/playPage");
        } else {
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const enterRommId = async () => {
    const roomId = prompt("Ingresa el id de la sala: ");
    if (roomId) {
      const room = await Api.findRoom(roomId);
      if (room && !checkUserAsPlayer(room.players)) {
        const roomUpdate = await Api.addUserToRoom(roomId, room, user);
        roomUpdate && setRoom(roomUpdate);
        roomUpdate && navigate("/playPage");
      } else if (room) {
        setRoom(room);
        navigate("/playPage");
      } else {
        console.error("No se pudo entrar a la sala");
      }
    }
  };

  const checkUserAsPlayer = (players) => {
    return players.some((player) => player.email === user.email);
  };

  return (
    <div style={{ padding: "1rem 0 2rem 0" }}>
      <ButtonComponent text="Crear sala" onClick={createRoom}></ButtonComponent>
      <ButtonComponent
        text="Entrar a una sala"
        onClick={enterRommId}
      ></ButtonComponent>
    </div>
  );
};
