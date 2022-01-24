import image from "../assets/CAH.png";
import ButtonComponent from "../components/Button/ButtonComponent";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  updateDoc,
} from "@firebase/firestore";
import { getAuth } from "@firebase/auth";
import firebaseApp from "../services/firebaseCredentials";
import { useAuth } from "contexts/AuthContext";
import { AccessRoom } from "components/AccessRoom/AccessRoom";
import { PocStackCards } from "components/PocStackCards/PocStackCards";
const auth = getAuth(firebaseApp);

export default function Home() {
  return (
    <main style={{ padding: "1rem 0" }}>
      <h1 style={{ padding: "1rem 0 2rem 0" }}>
        Cards Against Humanity ... mas o menos
      </h1>
      <h3 style={{ padding: "1rem 0 2rem 0" }}>
        Bienvenide {auth.currentUser.displayName} !
      </h3>
      <AccessRoom></AccessRoom>

      {/* <PocStackCards></PocStackCards> */}
      <img className="home-img" src={image} />
    </main>
  );
}
