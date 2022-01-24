import "./App.css";
import AuthProvider from "./contexts/AuthContext";

import Router from "./components/Router/Router";
import RoomProvider from "contexts/RoomContext";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <RoomProvider>
          <Router></Router>
        </RoomProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
