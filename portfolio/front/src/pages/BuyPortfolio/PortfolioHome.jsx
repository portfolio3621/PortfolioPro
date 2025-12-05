import React, { useEffect } from "react";
import BuyPortfolioHome from "./BuyPortfolioHome";
import ClaimPortfolio from "./ClaimPortfolio";
import { Navigate, Route, Routes } from "react-router-dom";
import { useCookies } from "react-cookie";
import Fetch from "../../Fetch";
import Nav from "../dashboard/Nav";
import { useState } from "react";

function PortfolioHome() {
  const [cookie, , removeCookie] = useCookies(["userId"]);
  const [userData, setUserData] = useState({});
  const userId = cookie.userId;

  const getUserData = async () => {
    try {
      const data = await Fetch.get(`get-data`);
      if (data.success) {
        setUserData(data.data);
      } else {
        removeCookie("userId");
        await Fetch.get("logout");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (cookie.userId) {
      Promise.all([getUserData()]).catch((err) => {
        console.error(err);
      });
    }
  }, [cookie.userId]);

  return (
    <div>
      {cookie.userId && <Nav removeCookie={removeCookie} userData={userData} />}
      <Routes>
        <Route path="/buy" element={<BuyPortfolioHome />} />
        <Route
          path="/claim"
          element={
            userId ? (
              <ClaimPortfolio />
            ) : (
              <Navigate to="/buy-portfolio" replace />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default PortfolioHome;
