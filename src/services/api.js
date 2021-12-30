import axios from "axios";

export const getAllWhiteCards = async () => {
  return axios.get(`http://localhost:3001/whiteCards`);
};

export const getAllBlackCards = async () => {
  return axios.get(`http://localhost:3001/blackCards`);
};

export const getMainBlackCard = async (id) => {
  return axios.get(`http://localhost:3001/blackCards/` + id);
};

// endpoint para traer varias cartas blancas random, revisar all promises

export const addCard = async ({ text, cardType }) => {
  return axios.post(`http://localhost:3001/whiteCards`, {
    text,
    cardType,
  });
};
