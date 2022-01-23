import { getAuth } from "@firebase/auth";
import ButtonComponent from "components/Button/ButtonComponent";
import { useRoomContext } from "contexts/RoomContext";
import React from "react";
import { useNavigate } from "react-router";
import { Api } from "services/api";
import firebaseApp from "services/firebaseCredentials";
const auth = getAuth(firebaseApp);

export const AccessRoom = () => {
  const userEmail = auth.currentUser.email;
  const userName = auth.currentUser.displayName;
  const { setRoom } = useRoomContext();
  const navigate = useNavigate();

  const createRoom = async () => {
    const roomId = prompt("¿Cómo se va a llamar tu sala?: ");
    const newRoom = null;
    if (roomId) {
      console.log(`${userName} está creando la sala ${roomId}`);
      try {
        newRoom = await Api.createRoom(userEmail, roomId);
      } catch (error) {
        console.error("Error al crear sala", error);
      } finally {
        // run this code no matter what the previous outcomes
        if (newRoom) {
          console.log(newRoom);
          setRoom({ roomId });
          navigate("/playPage");
        } else {
          console.log("No hay sala nueva!");
        }
      }
    }
  };

  const enterRommId = async () => {
    const roomId = prompt("Ingresa el id de la sala: ");
    if (roomId) {
      const room = await Api.findRoom(userEmail, roomId);
      if (room && !checkUserAsPlayer(room.players)) {
        const roomUpdate = await Api.addUserToRoom(roomId, room, userEmail);
        roomUpdate && navigate("/playPage");
      } else if (room) {
        navigate("/playPage");
      } else {
        console.error("No se pudo entrar a la sala");
      }
    }
  };

  const checkUserAsPlayer = (players) => {
    return players.some((player) => player === userEmail);
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
