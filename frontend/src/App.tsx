import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import MapPage from "./pages/MapPage";
import MapPageRegistered from "./pages/MapPageRegistered";
import { PinProvider } from "./context/PinContext";
import ProfilePage from "./pages/ProfilePage";
import ReportsPage from "./pages/ReportsPage";


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
                    <Route path="/profilePage" element={<ProfilePage />} />
                    <Route path="/reportsPage" element={<ReportsPage />} />
                </Routes>
            </Router>
        </PinProvider>
    );
};

export default App;
