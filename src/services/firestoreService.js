import firebaseApp from "./firebaseCredentials";
import {
  getFirestore,
  collection,
  getDoc,
  doc,
  updateDoc,
  query,
  setDoc,
  getDocs,
  get,
  where,
} from "firebase/firestore";

// CARDS
const firestore = getFirestore(firebaseApp);
const blackCardsRef = collection(firestore, "black-cards");
const whiteCardsRef = collection(firestore, "white-cards");
// USERS
const usersRef = collection(firestore, "users");
// ROOMS
const rooms = collection(firestore, "rooms");

// CARDS

// get all black cards
export const getAllBlackCards = async () => {
  const querySnapshot = await getDocs(blackCardsRef);
  return (
    querySnapshot?.docs?.map((doc) => ({ ...doc.data(), id: doc.id })) || []
  );
};
// get all white cards
export const getAllWhiteCards = async () => {
  const querySnapshot = await getDocs(whiteCardsRef);
  return (
    querySnapshot?.docs?.map((doc) => ({ ...doc.data(), id: doc.id })) || []
  );
};

// get a black card by id
export const getWhiteCardById = async (id) => {
  const consulta = await getDoc(doc(whiteCardsRef, id));
  return consulta.exists()
    ? consulta.data()
    : console.error("No existe la carta solicitada");
};
// get a white card by id
export const getBlackCardById = async (id) => {
  const consulta = await getDoc(doc(whiteCardsRef, id));
  return consulta.exists()
    ? consulta.data()
    : console.error("No existe la carta solicitada");
};

// add a black card
export const addBlackCard = async (text) => {
  const docRef = doc(blackCardsRef);
  const card = { text: text, cardType: "black" };
  await setDoc(docRef, card);
  const consulta = await getDoc(docRef);
  if (consulta.exists()) {
    const data = { ...consulta.data(), id: consulta.id };
    console.log(data);
    return data;
  } else {
    console.error("No se pudo agregar la carta");
  }
};
// add a white card
export const addWhiteCard = async (text) => {
  const docRef = doc(whiteCardsRef);
  const card = { text: text, cardType: "white" };
  await setDoc(docRef, card);
  const consulta = await getDoc(docRef);
  if (consulta.exists()) {
    const data = { ...consulta.data(), id: consulta.id };
    console.log(data);
    return data;
  } else {
    console.error("No se pudo agregar la carta");
  }
};

// USERS

export const addNewUser = async (user, roomId) => {
  const docRef = doc(usersRef, user.email);
  const newUser = {
    email: user.email,
    uid: user.uid,
    name: user.displayName,
    roomId: roomId ?? null,
  };
  console.log(newUser);
  await setDoc(docRef, newUser);
  const consulta = await getDoc(docRef);
  if (consulta.exists()) {
    const data = { ...consulta.data(), id: consulta.id };
    console.log("Usuario nuevo ", data);
    return data;
  } else {
    console.error("No se pudo agregar el usuario");
  }
};

// ROOMS

const createRoom = async (userEmail, roomId) => {
  // crear referencia
  const docRef = doc(rooms, roomId);
  // buscar doc
  const consulta = await getDoc(docRef);
  // revisar si existe
  if (consulta.exists()) {
    // si si existe
    alert(
      "El nombre de sala que ingresaste ya existe. Intenta de nuevo con un nombre diferente"
    );
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
    }
  }
};

const findRoom = async (userEmail, roomId) => {
  // crear referencia
  const docRef = doc(rooms, roomId);
  // buscar doc
  const consulta = await getDoc(docRef);
  // revisar si existe
  if (consulta.exists()) {
    // si si existe
    const newRoom = consulta.data();
    const newRoomWithUser = await addUserToRoom(
      docRef,
      newRoom.players,
      userEmail
    );
    return newRoomWithUser;
  } else {
    // si no existe
    alert("La sala a la que tratas de unirte no existe");
    return;
  }
};

const addUserToRoom = async (docRef, players, userEmail) => {
  console.log(players);
  const room = { players: [...players, userEmail] };
  await updateDoc(docRef, room);
  const consulta = await getDoc(docRef);
  if (consulta.exists()) {
    const data = consulta.data();
    console.log(data);
    return data;
  } else {
    alert("No existe la sala a la que tratas de unirte.");
  }
};

export default {
  getAllBlackCards,
  getAllWhiteCards,
  getBlackCardById,
  getWhiteCardById,
  addBlackCard,
  addWhiteCard,
  addNewUser,
  createRoom,
  findRoom,
};

// old way updating to add new white card
// export const addWhiteCardFS = async ({ form }) => {
//     const docRef = doc(firestore, `cards/white-cards`);
//     const card = {};
//     card[form.id] = { text: form.text, cardType: form.cardType, id: form.id };
//     await updateDoc(docRef, card);
//     const consulta = await getDoc(docRef);
//     if (consulta.exists()) {
//         const data = consulta.data();
//         console.log(data);
//         return data;
//     } else {
//         console.log("No existe!!");
//     }
// };
