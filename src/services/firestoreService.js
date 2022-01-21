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

const firestore = getFirestore(firebaseApp);
const blackCardsRef = collection(firestore, "black-cards");
const whiteCardsRef = collection(firestore, "white-cards");
const usersRef = collection(firestore, "users");
export let blackCards = [];
export let whiteCards = [];

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

export default {
  getAllBlackCards,
  getAllWhiteCards,
  getBlackCardById,
  getWhiteCardById,
  addBlackCard,
  addWhiteCard,
  addNewUser,
};
