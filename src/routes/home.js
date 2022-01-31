import image from "../assets/CAH.png";

import { getAuth } from "@firebase/auth";
import { useHistory, Link } from "react-router-dom";
import firebaseApp from "../services/firebaseCredentials";
const auth = getAuth(firebaseApp);

export default function Home() {
  const history = useHistory();
  const onRedirect = () => {
    history.push("/login");
  };
  return (
    <main style={{ padding: "1rem 0" }}>
      <button onClick={onRedirect}>REDIRECT TO LOGIN</button>
      <Link to="/collectionPage">REDIRECT TO COLLECTION</Link>

      <h1 style={{ padding: "1rem 0 2rem 0" }}>
        Cards Against Humanity ... mas o menos
      </h1>
      <img className="home-img" src={image} />
    </main>
  );
}
