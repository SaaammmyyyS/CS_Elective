import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { ToastContainer } from "react-toastify";
import {Cube} from 'react-preloaders';
import PrivateRoutes from "./utils/PrivateRoutes";

function App() {
  return (
    <><Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Route>

      <Route path="/auth/*" element={<Auth />} />
      {/* <Route path="*" element={<Navigate to="/auth/sign-in" replace />} /> */}

    </Routes>
    <Cube />
    <ToastContainer />
    </>
  );
}

export default App;
