import React, { useState, useEffect } from "react";
import "./AddCard.css";
import { Api } from "../../services/api";
import ButtonComponent from "../Button/ButtonComponent";

export default function AddCard({ onSubmit }) {
  const cardTypes = ["black", "white"];
  const [form, setForm] = useState({ text: "", cardType: cardTypes[1] });
  const [submitSucces, setSubmitSucces] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, text: e.target.value });
  };

  const submitCard = async (e) => {
    e.preventDefault();
    const serviceCall =
      form.cardType === "white" ? Api.addWhiteCard : Api.addBlackCard;
    try {
      const postResponse = await serviceCall(form.text);
      setSubmitSucces(true);
      onSubmit(true);
      console.log("Card Added Correctly to the json", postResponse);
    } catch (err) {
      setSubmitSucces(false);
      onSubmit(false);
      console.log(Object.keys(err), err.message, err.response);
      throw new Error("Unable to get a token. ", err);
    }
  };

  const changeType = (cardType) => {
    console.log("el tipo seleccionado: ", cardType);
    setForm({ ...form, cardType });
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
          {/* buttons to select card type */}
          <div className="buttons-cardType">
            {cardTypes.map((ct) => (
              <ButtonComponent
                buttonColor={ct}
                text={`Carta ${ct === "black" ? "negra" : "blanca"}`}
                onClick={() => changeType(ct)}
                type="button"
                key={ct === "black" ? 1 : 2}
                disabled={false}
              ></ButtonComponent>
            ))}
          </div>
          {/* textarea to add the desired text */}
          <div className={`card-creator ${form.cardType}`}>
            <label className={`label ${form.cardType}`} htmlFor="cardText">
              Texto de la carta:
            </label>
            <textarea
              className={`textarea ${form.cardType}`}
              name="cardText"
              id="text"
              value={form.text}
              onChange={handleChange}
            />
          </div>{" "}
          {submitSucces === false && (
            <h3>Ups! Ocurrió un error al agregar la carta!</h3>
          )}
          {/* submit button */}
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
