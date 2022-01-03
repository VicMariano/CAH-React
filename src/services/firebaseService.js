import firebaseApp from "./firebaseCredentials";
import { getFirestore, collection, getDoc, doc, updateDoc, setDoc } from "firebase/firestore";

export const blackCardsRef = collection(firestore, "black-cards");
export const whiteCardsRef = collection(firestore, "white-cards");
export let blackCards = {}
export let whiteCards = {};
const firestore = getFirestore(firebaseApp);

// get all black cards
export const getFsBlackCards = async () => {
    const docRef = doc(firestore, "black-cards");
    const consulta = await getDoc(docRef);
    if (consulta.exists()) {
        blackCards = consulta.data();
        console.log('Black Cards from Firestore: ', blackCards);
        return blackCards;
    } else {
        console.log("No hay cartas negras");
    }
};

// get all white cards
export const getFsWhiteCards = async () => {
    const docRef = doc(firestore, "white-cards");
    const consulta = await getDoc(docRef);
    if (consulta.exists()) {
        whiteCards = consulta.data();
        console.log(whiteCards);
        return whiteCards;
    } else {
        console.error("No hay cartas blancas");
    }
};

// get 1 card
export const getCardByTypeAndId = async (cardType, id) => {
    const consulta = await cardType === "white" ? getDoc(doc(whiteCardsRef, id)) : (getDoc(doc(blackCardsRef, id)));
    if (consulta.exists()) {
        const data = consulta.data();
        console.log(data);
        return data;
    } else {
        console.error("No existe la carta solicitada");
    }
};

export const addWhiteCardFS = async (form) => {
    console.log(form)
    const docRef = doc(firestore, `white-cards`, `${form.id}`);
    const card = { text: form.text, cardType: form.cardType, id: form.id };
    await setDoc(docRef, card);
    const consulta = await getDoc(docRef);
    if (consulta.exists()) {
        const data = consulta.data();
        console.log(data);
        return data;
    } else {
        console.error("No se pudo agregar la carta");
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
