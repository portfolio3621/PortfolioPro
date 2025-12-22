import Nav from "./components/Nav";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Main/Dashboard";
import PortfolioAdmin from "./components/Main/PortfolioAdmin";
import UsersAdmin from "./components/Main/UsersAdmin";
import BillsAdmin from "./components/Main/Bills";

function Home() {
  return (
    <>
      <div>
        <div>
          <Nav />
        </div>
        <Routes>
          <Route path="/" element={<Navigate to="/admin/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/manage/portfolio" element={<PortfolioAdmin />} />
          <Route path="/manage/user" element={<UsersAdmin />} />
          <Route path="/manage/bills" element={<BillsAdmin />} />
        </Routes>
      </div>
    </>
  );
}

export default Home;
