import image from "../assets/CAH.png";

import { getAuth } from "@firebase/auth";
import firebaseApp from "../services/firebaseCredentials";
const auth = getAuth(firebaseApp);

export default function Home() {
  return (
    <main style={{ padding: "1rem 0" }}>
      <h1 style={{ padding: "1rem 0 2rem 0" }}>
        Cards Against Humanity ... mas o menos
      </h1>
      <img className="home-img" src={image} />
    </main>
  );
}
