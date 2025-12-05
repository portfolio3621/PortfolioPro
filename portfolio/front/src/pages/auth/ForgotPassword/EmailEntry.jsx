import { useState } from "react";
import { Link } from "react-router-dom";
import Fetch from "../../../Fetch";

export default function EmailEntry() {
  const [email, setEmail] = useState("");
  const [send, setSend] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return alert("Email is required");

    setLoading(true);
    try {
      const response = await Fetch.post("forgot-password", { email });
      if (response.success === true) {
        setSend(true);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-t-2xl p-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Forgot Password</h1>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 focus:outline-none focus:ring-2 transition duration-200"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div className="flex justify-between items-center gap-4">
            <Link
              to="/login"
              className="flex-1 text-center py-2.5 border rounded-xl text-gray-700 hover:bg-gray-100 transition"
            >
              Back to Login
            </Link>
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 py-2.5 text-white rounded-xl transition ${
                loading
                  ? "bg-green-300 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
        </form>
      </div>

      {send && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-xl max-w-sm text-center space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              Email <span className="text-green-500">Sent Successfully</span>
            </h2>
            <p className="text-gray-500">Check your inbox:</p>
            <p className="text-gray-700 font-medium">{email}</p>
            <button
              onClick={handleSubmit}
              className="mt-4 bg-green-500 text-white px-6 py-2 rounded-xl hover:bg-green-600 transition"
            >
              Resend
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
