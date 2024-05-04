import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { ToastContainer } from "react-toastify";
import { Sugar } from "react-preloaders";
import PrivateRoutes from "./utils/PrivateRoutes";
import { SignIn, SignUp } from "./pages/auth";

function App() {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Route>

        <Route path="/auth/sign-up" element={<SignUp />} />
        <Route path="/auth/sign-in" element={<SignIn />} />
      </Routes>
      <Sugar
        time={2000}
        background="radial-gradient(circle, rgba(10,42,42,1) 0%, rgba(0,0,0,1) 100%)"
        color="#FFFFFF"
      />
      <ToastContainer />
    </>
  );
}

export default App;
