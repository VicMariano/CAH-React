import React, { useState, useEffect } from "react";
import "./AddCard.css";
import { addCard } from "../../services/api";

export default function AddCard() {
  const [form, setForm] = useState({ text: "", cardType: "white" });
  const handleChange = (e) => {
    setForm({ ...form, text: e.target.value });
  };

  const submitCard = async (e) => {
    e.preventDefault();
    const response = await addCard({
      text: form.text,
      cardType: "white",
    });
    console.log("console log de linea 18", response);
  };

  return (
    <div className="container">
      <form>
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
        {/* <input
          type="text"
          name="cardText"
          id="text"
          value={form.text}
          onChange={handleChange}
        /> */}
        <button className="button" type="submit" onClick={submitCard}>
          <strong className="plus">+</strong> Agregar carta
        </button>
      </form>
    </div>
  );
}
