import React from "react";
import AdminLogin from "./pages/AdminLogin";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";

export default function App() {
  const [isAdmin, setIsAdmin] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    const passed = sessionStorage.getItem("access");
    if (passed == "true" || passed == true) {
      return setIsAdmin(true);
    }
  }, [location]);
  return (
    <div>
      <Routes>
        <Route element={<AdminLogin />} path="/" />
        <Route
          element={isAdmin ? <Home /> : <h1>You are not Authorised</h1>}
          path="/admin/*"
        />
      </Routes>
    </div>
  );
}
