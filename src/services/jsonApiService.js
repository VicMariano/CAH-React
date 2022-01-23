import axios from "axios";

const whiteCards = `${process.env.REACT_APP_JSON}whiteCards/`;
const blackCards = `${process.env.REACT_APP_JSON}blackCards/`;

export const getAllWhiteCards = async () => {
  const response = await axios.get(whiteCards);
  return response.data;
};
export const getAllBlackCards = async () => {
  const response = await axios.get(blackCards);
  return response.data;
};

export const getBlackCardById = async (id) => {
  const response = await axios.get(whiteCards + id);
  return response.data;
};
export const getWhiteCardById = async (id) => {
  const response = await axios.get(blackCards + id);
  return response.data;
};

export const addBlackCard = async ({ text }) => {
  return axios.post(whiteCards, {
    text,
    cardType: "black",
  });
};
export const addWhiteCard = async ({ text }) => {
  return axios.post(whiteCards, {
    text,
    cardType: "black",
  });
};

export const addNewUser = async (user) => {
  console.log("usuario para agregar al json ", user);
};

export const createRoom = async (...data) => {
  console.log("Creando sala en el json ", data);
};

export const findRoom = async (...data) => {
  console.log("Buscando sala en el json ", data);
};

export const addUserToRoom = async (...data) => {
  console.log("usuario para agregar a sala del json ", data);
};

export const listenRoom = async (...data) => {
  console.log("Función para oir cambios en sala del json ", data);
};

export default {
  getAllBlackCards,
  getAllWhiteCards,
  getBlackCardById,
  getWhiteCardById,
  addWhiteCard,
  addBlackCard,
  addNewUser,
  createRoom,
  findRoom,
  addUserToRoom,
  listenRoom,
};
