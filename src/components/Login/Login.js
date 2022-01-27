import React, { useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import useInput from "../customHooks/useInput";
import ButtonComponent from "../Button/ButtonComponent";
import { useAuth } from "contexts/AuthContext";
import { Api } from "services/api";
import { updateName } from "services/firebaseAuth";
import firebaseApp from "services/firebaseCredentials";
import { Loading } from "components/Loading/Loading";
import { useEffect } from "react";
import { useRedirect } from "contexts/RedirectContext";
const auth = getAuth(firebaseApp);

export default function Login() {
  const [loading, setLoading] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, bindName, clearName] = useInput("");
  const [email, bindEmail, clearEmail] = useInput("");
  const [pass, bindPass, clearPass] = useInput("");
  const user = auth.currentUser;
  const { setUser } = useAuth();
  const { setPage } = useRedirect();

  const redirectToHome = () => {
    console.log("Redirecting home from login");
    setPage(0);
  };
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
        redirectToHome();
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
        redirectToHome();
      } catch (error) {
        alert(error.code, error.message);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(error);
      }
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => {
      console.log("unmounting Login");
    };
  }, []);

  useEffect(() => {
    user && redirectToHome();
    return () => {
      console.log("unmounting Login");
    };
  }, [user]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
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
      )}
    </div>
  );
}
