import { getAuth } from "@firebase/auth";
import ButtonComponent from "components/Button/ButtonComponent";
import { useAuth } from "contexts/AuthContext";
import React from "react";
import { Api } from "services/api";
import firebaseApp from "services/firebaseCredentials";
const auth = getAuth(firebaseApp);

export const CreateRoom = () => {
  const { user } = useAuth();
  const userEmail = auth.currentUser.email;

  const createRoom = async () => {
    const roomId = prompt("¿Cómo se va a lamar tu sala?: ");
    console.log(userEmail);
    if (roomId) {
      const newRoom = await Api.createRoom(userEmail, roomId);
      console.log("Creating a room: ", newRoom);
    }
  };
  const enterRommId = async () => {
    const roomId = prompt("Ingresa el id de la sala: ");
    if (roomId) {
      const room = await Api.findRoom(userEmail, roomId);
      console.log("Finding a room: ", room);
    }
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
