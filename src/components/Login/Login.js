import React, { useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import useInput from "../customHooks/useInput";
import ButtonComponent from "../Button/ButtonComponent";
import { useNavigate } from "react-router";
import { useAuth } from "contexts/AuthContext";
import { Api } from "services/api";
import { updateName } from "services/firebaseAuth";

export default function Login() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, bindName, clearName] = useInput("");
  const [email, bindEmail, clearEmail] = useInput("");
  const [pass, bindPass, clearPass] = useInput("");
  const auth = getAuth();
  const navigate = useNavigate();

  const { setUser } = useAuth();

  const changeSignMethod = () => {
    setIsRegistering(!isRegistering);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("email: ", email, ", pass: ", pass, "name: ", name);
    if (isRegistering) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          pass
        );
        const user = userCredential.user;
        const resUserAdded = await Api.addNewUser(user);
        resUserAdded && (await updateName(name));
        setUser(user);
        navigate("/");
      } catch (error) {
        alert(error.code, error.message);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      }
    } else {
      signInWithEmailAndPassword(auth, email, pass);
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          pass
        );
        const user = userCredential.user;
        console.log("From login: ", userCredential, user);
        setUser(user);
        navigate("/");
      } catch (error) {
        alert(error.code, error.message);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(error);
      }
    }
  };

  return (
    <div>
      <center>
        <form onSubmit={submitHandler}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "15em",
              marginTop: "5em",
            }}
          >
            {isRegistering && <label>Nombre</label>}
            {isRegistering && <input type="text" {...bindName} />}
            <label>Email</label>
            <input type="email" {...bindEmail} />
            <label>Password</label>
            <input
              type="password"
              {...bindPass}
              style={{ marginBottom: "3em" }}
            />
            <ButtonComponent
              type="submit"
              text={isRegistering ? "Registrarme" : "Iniciar sesión"}
              disabled={(isRegistering && !name) || !email || !pass}
            ></ButtonComponent>
          </div>
        </form>
      </center>
      <h5>
        <a
          style={{
            cursor: "pointer",
            padding: "0.5em",
          }}
          onClick={changeSignMethod}
        >
          {isRegistering
            ? "Ya tenes cuenta? Inicia sesión"
            : "Aun no tenés una cuenta? Registrate"}
        </a>
      </h5>
    </div>
  );
}
