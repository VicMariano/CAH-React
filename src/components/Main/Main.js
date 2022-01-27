import Login from "components/Login/Login";
import Navbar from "components/Navbar/Navbar";
import { useAuth } from "contexts/AuthContext";
import { useRedirect } from "contexts/RedirectContext";
import { useEffect, useState } from "react";
import AddCardPage from "routes/addCardPage";
import CollectionPage from "routes/collectionPage";
import Home from "routes/home";

const Private = ({ children }) => {
  const { user } = useAuth();
  console.log(user);
  console.log(children);
  return user ? children : <Login />;
};

function App() {
  const [component, setComponent] = useState(null);
  const { page } = useRedirect();

  const componentChange = (componentNum) => {
    if (componentNum) {
      console.log(componentNum);
      setComponent(chooseComponent(componentNum));
    } else {
      console.log(componentNum);
      setComponent(chooseComponent(3));
    }
  };

  const chooseComponent = (compNum) => {
    switch (compNum) {
      case 0:
        console.log("returning Home to setComponent");
        return <Home />;
        break;

      case 1:
        return <AddCardPage />;
        break;

      case 2:
        return <CollectionPage />;
        break;

      case 3:
        return <Login />;
        break;

      default:
        return <Login />;
        break;
    }
  };

  useEffect(() => {
    setComponent(chooseComponent(page));

    return () => {
      console.log("unmounting main");
    };
  }, [page]);

  return (
    <div>
      <Navbar />
      <Private>{component}</Private>
    </div>
  );
}

export default App;
