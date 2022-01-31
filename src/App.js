import "./App.css";
import AuthProvider from "./contexts/AuthContext";

import RouterComponent from "./components/Router/Router";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <RouterComponent></RouterComponent>
      </AuthProvider>
    </div>
  );
}

export default App;
