import { BrowserRouter } from "react-router-dom";
import { Routes, Navigate, Route } from "react-router";
import "../../App.css";
import AddCardPage from "../../routes/addCardPage";
import CollectionPage from "../../routes/collectionPage";
import Home from "../../routes/home";
import PlayPage from "../../routes/playPage";
import Navbar from "../Navbar/Navbar";
import Login from "../Login/Login";
import firebaseApp from "../../services/firebaseCredentials";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { useState, useContext, useEffect } from "react";
import AuthProvider, { AuthContext } from "../../auth/AuthContext";

const auth = getAuth(firebaseApp);

const Private = (props) => {
  const { user, setUser } = useContext(AuthContext);
  return user ? props.children : <Navigate to="/login"></Navigate>;
};

export default function Router() {
  const [globalUser, setGlobalUser] = useState(null);
  const { user, setUser } = useContext(AuthContext);
  console.log(user, setUser);
  onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      // code in case loged session
      setUser(firebaseUser);
    } else {
      // code in case  no loged session
      setUser(null);
    }
  });

  useEffect(() => {
    console.log("cambio en el user global", user);
  }, [user]);

  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <div>
            <Navbar />
            <Routes>
              <Route
                path="/"
                element={
                  <Private>
                    <Home userEmail={globalUser?.userEmail} />
                  </Private>
                }
              />
              <Route
                path="/playPage"
                element={
                  // <Private>
                  <PlayPage />
                  // </Private>
                }
              />
              <Route
                path="/collectionPage"
                element={
                  <Private>
                    <CollectionPage />
                  </Private>
                }
              />
              <Route
                path="/addCardPage"
                element={
                  <Private>
                    <AddCardPage />
                  </Private>
                }
              />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}
