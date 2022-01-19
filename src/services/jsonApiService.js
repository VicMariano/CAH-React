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

export default {
  getAllBlackCards,
  getAllWhiteCards,
  getBlackCardById,
  getWhiteCardById,
  addWhiteCard,
  addBlackCard,
};
