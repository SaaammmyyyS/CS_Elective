    import {
        BrowserRouter,
        Route,
        Routes
    } from "react-router-dom";
    import Register from "./pages/Register";
    import Login from "./pages/login";
    import Navbar from "./components/navbar";
    import Update from "./pages/update";
    import DeleteUser from "./components/deleteUser";

    function App() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/navbar" element={<Navbar />} />
                    <Route path="/update" element={<Update />} />
                    <Route path="/user/delete" element={<DeleteUser/>} />
                </Routes>
            </BrowserRouter>
        );
    }

    export default App;