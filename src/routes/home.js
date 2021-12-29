import image from "../assets/CAH.png";

export default function Home() {
  return (
    <main style={{ padding: "1rem 0" }}>
      <h2 style={{ padding: "1rem" }}>CAH</h2>
      <h4>Juego en construcción!</h4>
      <img className="home-img" src={image} />
      <hr />
    </main>
  );
}
