import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import AddCardPage from "./routes/addCardPage";
import Collection from "./routes/collection";
import Home from "./routes/home";
import Play from "./routes/play";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/play" element={<Play />} />
          <Route path="collection" element={<Collection />} />
          <Route path="addCardPage" element={<AddCardPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
