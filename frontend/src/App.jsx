import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { ToastContainer } from "react-toastify";
import { Sugar } from "react-preloaders";
import PrivateRoutes from "./utils/PrivateRoutes";

function App() {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Route>

        <Route path="/auth/*" element={<Auth />} />
        <Route path="*" element={<Navigate to="/auth/sign-in" replace />} />
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
