import {
    BrowserRouter,
    Route,
    Routes
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/login";
import Navbar from "./components/navbar";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/navbar" element={<Navbar />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;