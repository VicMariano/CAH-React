import AddCard from "../components/AddCard/AddCard";

export default function AddCardPage() {
  let cardAdded = false
  const onSubmit = (isAdded) => {
    cardAdded = isAdded;
  }
  return (
    <main style={{ padding: "1rem 0" }}>
      {!cardAdded &&
        <div>
          <h4>¿Tenes una mejor respuesta?</h4>
          <h2> Agregala a la colección</h2>
        </div>
      }
      <br />
      <AddCard onSubmit={onSubmit}></AddCard>
    </main>
  );
}
