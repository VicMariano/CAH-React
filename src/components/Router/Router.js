import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../../App.css";
import AddCardPage from "../../routes/addCardPage";
import CollectionPage from "../../routes/collectionPage";
import Home from "../../routes/home";
import PlayPage from "../../routes/playPage";
import Navbar from "../Navbar/Navbar";


export default function Router() {
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar></Navbar>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/playPage" element={<PlayPage />} />
                    <Route path="collectionPage" element={<CollectionPage />} />
                    <Route path="addCardPage" element={<AddCardPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}
