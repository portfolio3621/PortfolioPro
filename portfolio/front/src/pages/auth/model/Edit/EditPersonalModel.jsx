import { useEffect, useRef, useState } from "react";
import { IoIosClose } from "react-icons/io";
import Fetch from "../../../../Fetch";
import { HiOutlineUser, HiOutlineUserCircle } from "react-icons/hi";

export default function EditPersonalModel({
  EditPersonalModelShow,
  user,
  refresh,
}) {
  const modelRef = useRef();
  const [userData, setUserData] = useState(user);
  const handleSubmit = async () => {
    try {
      const response = await Fetch.put(`update-user`, {
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        about: userData.about,
        address: userData.address,
        gender: userData.gender,
      });
      if (response.success === true) {
        EditPersonalModelShow(false);
        refresh();
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        EditPersonalModelShow(false);
      }
    };
    if (EditPersonalModelShow) {
      document.addEventListener("keydown", handleKeyDown);
      modelRef.current?.focus();
    }
    document.addEventListener("keydown", handleKeyDown);
  }, [EditPersonalModelShow, user]);

  const handleGenderSelect = (gender) => {
    setUserData((prev) => ({
      ...prev,
      gender,
    }));
  };

  return (
    <div
      ref={modelRef}
      className="fixed overflow-x-scroll inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4"
    >
      <div className="bg-white mt-28 dark:bg-gray-900 text-gray-800 dark:text-white p-6 rounded-2xl w-full max-w-2xl relative shadow-lg space-y-6">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-4xl text-gray-500 hover:text-red-500 transition"
          onClick={() => EditPersonalModelShow(false)}
          aria-label="Close"
        >
          <IoIosClose />
        </button>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-center">Edit Personal Info</h1>

        {/* Form Fields */}
        <div className="grid grid-cols-1 gap-4">
          {[
            { id: "name", label: "Name", type: "text", value: userData.name },
            {
              id: "email",
              label: "Email",
              type: "email",
              value: userData.email,
            },
            {
              id: "phone",
              label: "Phone No.",
              type: "text",
              value: userData.phone,
            },
          ].map(({ id, label, type, value }) => (
            <div key={id} className="flex flex-col">
              <label htmlFor={id} className="font-medium mb-1">
                {label}
              </label>
              <input
                id={id}
                type={type}
                value={value}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    [id]: e.target.value,
                  }))
                }
                className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>
          ))}

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Gender *
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleGenderSelect("Male")}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 ${
                  userData.gender === "Male"
                    ? "border-indigo-500 bg-indigo-50 shadow-sm"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <div
                  className={`p-3 rounded-full mb-2 ${
                    userData.gender === "Male"
                      ? "bg-indigo-100 text-indigo-600"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  <HiOutlineUserCircle className="h-6 w-6" />
                </div>
                <span className="text-sm font-medium">Male</span>
              </button>

              <button
                type="button"
                onClick={() => handleGenderSelect("Female")}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 ${
                  userData.gender === "Female"
                    ? "border-pink-500 bg-pink-50 shadow-sm"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <div
                  className={`p-3 rounded-full mb-2 ${
                    userData.gender === "Female"
                      ? "bg-pink-100 text-pink-600"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  <HiOutlineUser className="h-6 w-6" />
                </div>
                <span className="text-sm font-medium">Female</span>
              </button>
            </div>
          </div>

          {/* Address */}
          <div className="flex flex-col">
            <label htmlFor="address" className="font-medium mb-1">
              Address
            </label>
            <textarea
              id="address"
              value={userData.address}
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  address: e.target.value,
                }))
              }
              className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              rows={2}
            />
          </div>

          {/* About */}
          <div className="flex flex-col">
            <label htmlFor="about" className="font-medium mb-1">
              About
            </label>
            <textarea
              id="about"
              value={userData.about}
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  about: e.target.value,
                }))
              }
              className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              rows={4}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={handleSubmit}
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Update
          </button>
          <button
            className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-5 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            onClick={() => EditPersonalModelShow(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
