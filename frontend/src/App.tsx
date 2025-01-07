import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import MapPage from "./pages/MapPage";
import MapPageRegistered from "./pages/MapPageRegistered";
import { PinProvider } from "./context/PinContext";

const App = () => {
    return (
        <PinProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/map" element={<MapPage />} />
                    <Route path="/mapRegistered" element={<MapPageRegistered />} />
                </Routes>
            </Router>
        </PinProvider>
    );
};

export default App;
