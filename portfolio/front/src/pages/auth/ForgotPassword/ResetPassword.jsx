import React, { useState, useEffect } from "react";
import { HiOutlineLockClosed } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import Fetch from "../../../Fetch";

export default function ResetPassword() {
  const { token } = useParams();
  const [userData, setUserData] = useState({});
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const res = await Fetch.post(`user/${token}`);
      if (res.success) setUserData(res.data);
    } catch (err) {
      setError("Invalid or expired token");
      console.error(err);
    }
  };

  const handleChangePassword = async () => {
    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }
    if (password.length !== 6) {
      return setError("Password must be exactly 6 characters");
    }

    try {
      const res = await Fetch.put(`password/reset/${token}`, { password });
      if (res.success) navigate("/login");
    } catch (err) {
      setError(err?.response?.data?.message || "Reset failed");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-indigo-50 to-purple-100 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-5 text-white text-center">
          <h2 className="text-2xl font-bold">Reset Your Password</h2>
        </div>
        <div className="p-6">
          <p className="text-xl font-medium text-gray-700 mb-4">
            Hi, <span className="text-indigo-600 font-bold">{userData.name || "User"}</span>
          </p>

          {error && (
            <div className="mb-4 p-2 rounded bg-red-100 text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              New Password
            </label>
            <div className="relative">
              <HiOutlineLockClosed className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                maxLength={6}
                placeholder="••••••"
                className="pl-10 w-full py-2.5 px-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <HiOutlineLockClosed className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                minLength={6}
                maxLength={6}
                placeholder="••••••"
                className="pl-10 w-full py-2.5 px-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">(6 characters only allowed)</p>
          </div>

          <button
            onClick={handleChangePassword}
            className="w-full mt-3 bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 rounded-lg transition"
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}
