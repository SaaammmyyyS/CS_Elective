import {
    BrowserRouter,
    Route,
    Routes
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/login";
import Navbar from "./components/navbar";
import Update from "./pages/update";
import DeleteUser from "./components/deleteUser"; // Imported from 18-create-delete-user-page branch
import ProfilePage from "./pages/profile"; // Imported from main branch

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/navbar" element={<Navbar />} />
                <Route path="/update" element={<Update />} />
                <Route path="/user/delete" element={<DeleteUser />} /> {/* Keep this route */}
                <Route path="/user" element={<ProfilePage />} /> {/* Keep this route */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
