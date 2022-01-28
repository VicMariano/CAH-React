import { BrowserRouter, HashRouter } from "react-router-dom";
import { Routes, Navigate, Route } from "react-router";
import "../../App.css";
import AddCardPage from "../../routes/addCardPage";
import CollectionPage from "../../routes/collectionPage";
import Home from "../../routes/home";
import Navbar from "../Navbar/Navbar";
import Login from "../Login/Login";
import AuthProvider, { useAuth } from "contexts/AuthContext";

const Private = (props) => {
  const { user } = useAuth();
  return user ? props.children : <Navigate to="/login" />;
};

export default function Router() {
  console.log(process.env.PUBLIC_URL);
  return (
    <div className="App">
      <AuthProvider>
        <HashRouter basename={process.env.PUBLIC_URL}>
          <div>
            <Navbar />
            <Routes>
              <Route
                path="/"
                element={
                  <Private>
                    <Home />
                  </Private>
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
        </HashRouter>
      </AuthProvider>
    </div>
  );
}
