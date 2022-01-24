import { BrowserRouter } from "react-router-dom";
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
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}
