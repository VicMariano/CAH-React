import ButtonComponent from "components/Button/ButtonComponent";
import { useState } from "react";
import AddCard from "../components/AddCard/AddCard";

export default function AddCardPage() {
  const [cardAdded, setCardAdded] = useState(false);
  const onSubmit = (isAdded) => {
    setCardAdded(isAdded);
  };
  return (
    <main style={{ padding: "1rem 0" }}>
      {cardAdded ? (
        <>
          <h2>La carta fue agregada a la colección!</h2>
          <ButtonComponent
            text="Agregar otra carta"
            onClick={() => setCardAdded(false)}
          ></ButtonComponent>
        </>
      ) : (
        <div>
          <h4>¿Tenes una idea para una carta nueva?</h4>
          <h2> Agregala al mazo</h2>
        </div>
      )}
      <br />
      {!cardAdded && <AddCard onSubmit={onSubmit}></AddCard>}
    </main>
  );
}
