import "./App.css";
import AuthProvider from "./contexts/AuthContext";

import Router from "./components/Router/Router";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router></Router>
      </AuthProvider>
    </div>
  );
}

export default App;
