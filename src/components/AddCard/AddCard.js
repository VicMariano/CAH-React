import React, { useState, useEffect } from "react";
import "./AddCard.css";
import { addCard } from "../../services/api";

export default function AddCard() {
  const [form, setForm] = useState({ text: "", cardType: "white" });
  const [submitSucces, setSubmitSucces] = useState(null);
  const handleChange = (e) => {
    setForm({ ...form, text: e.target.value });
  };

  const submitCard = async (e) => {
    e.preventDefault();
    try {
      const postResponse = await addCard({
        text: form.text,
        cardType: "white",
      });
      setSubmitSucces(true);
      console.log("Card Added Correctly", postResponse);
    } catch (err) {
      setSubmitSucces(false);
      console.log(Object.keys(err), err.message, err.response);
      throw new Error("Unable to get a token. ", err);
    }
  };

  useEffect(() => {
    submitSucces && setForm({ text: "", cardType: "white" });
  }, [submitSucces]);

  return (
    <div className="container">
      {submitSucces ? (
        <h2>La carta fue agregada a la colección!</h2>
      ) : (
        <form className="container">
          <div className="card-creator">
            <label className="label" htmlFor="cardText">
              Texto de la carta:
            </label>
            <textarea
              name="cardText"
              id="text"
              value={form.text}
              onChange={handleChange}
            />
          </div>

          {submitSucces === false && (
            <h3>Ups! Ocurrió un error al agregar la carta!</h3>
          )}
          <button
            className="button"
            disabled={form.text === ""}
            type="submit"
            onClick={submitCard}
          >
            <strong className="plus">+</strong> Agregar carta
          </button>
        </form>
      )}
    </div>
  );
}
