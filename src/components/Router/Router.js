import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
// import { Routes, Navigate, Route } from "react-router";
import "../../App.css";
import AddCardPage from "../../routes/addCardPage";
import CollectionPage from "../../routes/collectionPage";
import Home from "../../routes/home";
import Navbar from "../Navbar/Navbar";
import Login from "../Login/Login";
import AuthProvider, { useAuth } from "contexts/AuthContext";

// const Private = (props) => {
//   const { user } = useAuth();
//   return user ? props.children : <Redirect to="/login" />;
// };

const PrivateRoute = ({ component, ...options }) => {
  const { user } = useAuth();
  const finalComponent = user ? component : Login;
  console.log("Component ", component);
  console.log("Options ", options);
  console.log("PrivateRoute ", finalComponent);
  return <Route {...options} component={finalComponent} />;
};

export default function RouterComponent() {
  console.log(process.env.PUBLIC_URL);
  return (
    <>
      {/* <HashRouter basename="/">
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
        </HashRouter> */}

      <Router basename="/CAH-React">
        <Navbar />
        <Switch>
          {/* <Route exact path="/" component={<Private>{Home}</Private>} />

          <Route
            path="/collectionPage"
            component={<Private>{CollectionPage}</Private>}
          />
          <Route
            path="/addCardPage"
            component={<Private>{AddCardPage}</Private>}
          /> */}

          {/* <Redirect from="/" to="/home" /> */}
          <PrivateRoute path="/home" component={Home} />
          <PrivateRoute path="/addCardPage" component={AddCardPage} />
          <PrivateRoute path="/collectionPage" component={CollectionPage} />

          <Route path="/login" component={Login} />
        </Switch>
      </Router>
    </>
  );
}
