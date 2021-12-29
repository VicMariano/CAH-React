import axios from "axios";

export const getAllCards = async () => {
  return axios.get(`http://localhost:3001/cards`);
};

export const addCard = async ({ text, cardType }) => {
  return axios.post(`http://localhost:3001/cards`, { text, cardType });
};
