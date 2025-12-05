import { Navigate, Route, Routes } from "react-router-dom";
import Portfolio from "./templates/TemplateLoader.jsx";
import Error from "./pages/Error";
import Login from "./pages/auth/Login";
import GetStarted from "./pages/GetStarted";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import AOS from "aos";
import "aos/dist/aos.css";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import ManageProfile from "./pages/auth/ManageProfile";
import EmailEntry from "./pages/auth/ForgotPassword/EmailEntry";
import ResetPassword from "./pages/auth/ForgotPassword/ResetPassword";
import PortfolioHome from "./pages/BuyPortfolio/PortfolioHome";

function App() {
  const [cookie, , removeCookie] = useCookies(["userId"]);
  const userId = cookie.userId;

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
    if (userId == "undefined") {
      removeCookie("userId");
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/get-started" replace />} />

      {/* Public routes */}
      <Route path="/get-started" element={<GetStarted />} />
      <Route path="/portfolio/*" element={<PortfolioHome />} />
      <Route path="/portfolio/public/:id" element={<Portfolio />} />

      {/* Auth routes - only for non-logged in users */}
      <Route
        path="/login"
        element={userId ? <Navigate to="/dashboard" replace /> : <Login />}
      />
      <Route
        path="/register"
        element={userId ? <Navigate to="/dashboard" replace /> : <Register />}
      />
      <Route
        path="/forgot-password"
        element={userId ? <Navigate to="/dashboard" replace /> : <EmailEntry />}
      />

      <Route
        path="/password/reset/:token"
        element={
          userId ? <Navigate to="/dashboard" replace /> : <ResetPassword />
        }
      />

      {/* Protected route - only for logged in users */}
      <Route
        path="/dashboard"
        element={
          userId ? <Dashboard /> : <Navigate to="/get-started" replace />
        }
      />
      <Route
        path="/manage-profile"
        element={
          userId ? <ManageProfile /> : <Navigate to="/get-started" replace />
        }
      />

      {/* Catch-all route */}
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;
