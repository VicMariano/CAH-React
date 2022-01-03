import axios from "axios";

const whiteCards = `${process.env.REACT_APP_JSON}whiteCards/`;
const blackCards = `${process.env.REACT_APP_JSON}blackCards/`;

export const getAllWhiteCards = async () => {
  return axios.get(whiteCards);
};

export const getAllBlackCards = async () => {
  return axios.get(blackCards);
};

export const getMainBlackCard = async (id) => {
  return axios.get(blackCards + id);
};

// endpoint para traer varias cartas blancas random, revisar all promises

export const addCard = async ({ text, cardType }) => {
  return axios.post(whiteCards, {
    text,
    cardType,
  });
};
