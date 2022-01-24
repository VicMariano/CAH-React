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
  onSnapshot,
} from "firebase/firestore";

// CARDS
const firestore = getFirestore(firebaseApp);
const blackCardsRef = collection(firestore, "black-cards");
const whiteCardsRef = collection(firestore, "white-cards");
const roundsRef = collection(firestore, "rooms", "2", "rounds");
// USERS
const usersRef = collection(firestore, "users");
const userDocRef = (email) => doc(usersRef, email);
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
export const getBlackCardById = async (id) => {
  const consulta = await getDoc(doc(whiteCardsRef, id));
  return consulta.exists()
    ? consulta.data()
    : console.error("No existe la carta solicitada");
};
// get a white card by id
export const getWhiteCardById = async (id) => {
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

const createRoom = async ({ email, displayName }, roomId) => {
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
    return null;
  } else {
    // si no existe
    await setDoc(docRef, {
      players: [{ email, displayName, owner: true }],
      roomId,
    });
    const newRoom = await getDoc(docRef);
    if (newRoom.exists()) {
      const roomData = newRoom.data();
      console.log("Sala Creada!");
      console.log(roomData);
      return roomData;
    } else {
      alert("Error al crear la sala");
    }
  }
};

const findRoom = async (roomId) => {
  // crear referencia
  const docRef = doc(rooms, roomId);
  // buscar doc
  const consulta = await getDoc(docRef);
  // revisar si existe
  if (consulta.exists()) {
    // si si existe
    return consulta.data();
  } else {
    // si no existe
    alert("La sala a la que tratas de unirte no existe");
    return;
  }
};

const addUserToRoom = async (roomId, room, user) => {
  const { email, displayName } = { ...user };
  const docRef = doc(rooms, roomId);
  const players = room.players;
  const roomUpdate = {
    players: [...players, { email, displayName, owner: false }],
  };
  console.log(room, roomUpdate);
  await updateDoc(docRef, roomUpdate);
  const consulta = await getDoc(docRef);
  if (consulta.exists()) {
    const data = consulta.data();
    console.log(data);
    return data;
  } else {
    alert("No existe la sala a la que tratas de unirte.");
  }
};

const listenRoom = async (roomId, set) => {
  const unsub = onSnapshot(doc(firestore, "rooms", roomId), (doc) => {
    console.log("Current data: ", doc.data());
    set(doc.data());
  });
};

// get all rounds
const getRounds = async (roomId) => {
  const querySnapshot = await getDocs(roundsRef);
  console.log(querySnapshot?.docs?.map((doc) => doc.data() || []));
  return querySnapshot?.docs?.map((doc) => doc.data() || []);
};

// creates a new round inside the rounds subcollection. If the subcollection doesn't exist yet, it'll be created
const createRound = async (roomId, roundNumber, roundContent) => {
  const docRef = doc(rooms, roomId, "rounds", roundNumber);
  await setDoc(docRef, roundContent);
  const consulta = await getDoc(docRef);
  if (consulta.exists()) {
    console.log(consulta.data());
    return consulta.data();
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
  addUserToRoom,
  listenRoom,
  getRounds,
  createRound,
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
