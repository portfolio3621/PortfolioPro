import React, { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import Fetch from "../../../Fetch";

function ChangePassword({ ChangePasswordModelShow }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword) {
      return alert("Old or New Password is Required");
    }
    try {
      const response = await Fetch.put(`changePassword`, {
        oldPassword,
        newPassword,
      });
      if (response.success === true) {
        ChangePasswordModelShow(false);
      }
    } catch (e) {
      console.error(e.response.data.message);
      setError(e.response.data.message);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        ChangePasswordModelShow(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
  }, [ChangePasswordModelShow]);

  return (
    <div className="bg-white rounded-2xl shadow-xl">
      <div className="relative w-full max-w-3xl p-8 space-y-6 my-20">
        <button
          onClick={() => ChangePasswordModelShow(false)}
          className="text-3xl absolute right-4 top-4"
        >
          <IoIosClose />
        </button>

        {/* Main Content */}
        <div>
          <h1 className="text-3xl font-bold text-center">Change Password</h1>
          <br />
          <div>
            <label htmlFor="old-password">Old Password</label>
            <br />
            <input
              type="password"
              onChange={(e) => setOldPassword(e.target.value)}
              className={`border w-full border-gray-300 ${
                error === "old password is incorrect"
                  ? "border-red-600 border-2"
                  : null
              } bg-white dark:bg-gray-800 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              minLength={6}
              maxLength={6}
              placeholder="Enter your old password"
              required
            />
          </div>
          <br />
          <div>
            <label htmlFor="new-password">New Password</label>
            <br />
            <input
              type="password"
              onChange={(e) => setNewPassword(e.target.value)}
              className="border w-full border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              minLength={6}
              maxLength={6}
              placeholder="Enter your new password"
              required
            />
          </div>
          <p className="text-red-600 font-bold">{error}</p>
          <br />
          <div className="gap-4 flex justify-end">
            <button
              onClick={handleChangePassword}
              className="bg-green-600 text-white p-2 rounded-xl"
            >
              Submit
            </button>
            <button
              onClick={() => ChangePasswordModelShow(false)}
              className="bg-slate-500 text-white p-2 rounded-xl"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
