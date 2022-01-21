import image from "../assets/CAH.png";
import ButtonComponent from "../components/Button/ButtonComponent";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  updateDoc,
} from "@firebase/firestore";
import { getAuth } from "@firebase/auth";
import firebaseApp from "../services/firebaseCredentials";
import { useAuth } from "auth/AuthContext";
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

export default function Home() {
  const rooms = collection(firestore, "rooms");
  const { user } = useAuth();
  const userEmail = user.userEmail;

  const findRoom = async (roomId) => {
    // crear referencia
    const docRef = doc(rooms, roomId);
    // buscar doc
    const consulta = await getDoc(docRef);

    // revisar si existe
    if (consulta.exists()) {
      const infoDoc = consulta.data();
      addUserToRoom(roomId, infoDoc.players);
      // si si existe
      console.log(infoDoc);
      return;
    } else {
      alert("La sala a la que tratas de unirte no existe");
      return;
    }
    // si no existe
  };
  const addUserToRoom = async (roomId, players) => {
    console.log(players);
    const docRef = doc(rooms, roomId);
    const room = { players: [...players, userEmail] };
    await updateDoc(docRef, room);
    const consulta = await getDoc(docRef);
    if (consulta.exists()) {
      const data = consulta.data();
      console.log(data);
      return data;
    } else {
      console.log("No existe!!");
    }
  };
  const createRoom = async () => {
    const roomId = prompt("¿Cómo se va a lamar tu sala?: ");
    // crear referencia
    const docRef = doc(rooms, roomId);
    // buscar doc
    const consulta = await getDoc(docRef);
    // revisar si existe
    if (consulta.exists()) {
      alert(
        "El nombre de sala que ingresaste ya existe. Intenta de nuevo con un nombre diferente"
      );
      // si si existe
      const infoDoc = consulta.data();
      console.log(infoDoc);
      return;
    } else {
      // si no existe
      const newRoom = setDoc(docRef, { players: [userEmail] });
      if (newRoom) {
        alert("Sala Creada!");
        console.log(newRoom);
      } else {
        alert("Error al crear la sala");
        console.log();
      }
    }
  };
  const enterRommId = async () => {
    const roomId = prompt("Ingresa el id de la sala: ");
    if (roomId) {
      findRoom(roomId);
    }
  };
  return (
    <main style={{ padding: "1rem 0" }}>
      <h1 style={{ padding: "1rem 0 2rem 0" }}>
        Cards Against Humanity ... mas o menos
      </h1>
      <h3 style={{ padding: "1rem 0 2rem 0" }}>
        Bienvenide {auth.currentUser.displayName} !
      </h3>
      <div style={{ padding: "1rem 0 2rem 0" }}>
        <ButtonComponent
          text="Crear sala"
          onClick={createRoom}
        ></ButtonComponent>
        <ButtonComponent
          text="Entrar a una sala"
          onClick={enterRommId}
        ></ButtonComponent>
      </div>

      <img className="home-img" src={image} />
    </main>
  );
}
