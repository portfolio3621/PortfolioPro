import React, { useState, useMemo, useEffect } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import Card from "./Card";
import Nav from "./Nav";
import { useCookies } from "react-cookie";
import Fetch from "../../Fetch";

// Move portfolios data outside component to prevent recreation on every render
const PORTFOLIOS_DATA = [
  {
    id: 1,
    name: "Tech Innovators Portfolio",
    path: "/portfolios/tech-innovators",
    thumbnail: "/thumbnails/tech.jpg",
    description: "Cutting-edge tech companies driving innovation",
    category: "Technology",
  },
  {
    id: 2,
    name: "Green Energy Bundle",
    path: "/portfolios/green-energy",
    thumbnail: "/thumbnails/green.jpg",
    description: "Sustainable energy solutions for the future",
    category: "Green Energy",
  },
  {
    id: 3,
    name: "Global Markets",
    path: "/portfolios/global-markets",
    thumbnail: "/thumbnails/global.jpg",
    description: "Diversified international market exposure",
    category: "Global",
  },
  {
    id: 4,
    name: "Starter Portfolio",
    path: "/portfolios/starter",
    thumbnail:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80",
    description: "Perfect for first-time investors",
    category: "Starter",
  },
  {
    id: 5,
    name: "Crypto Starter",
    path: "/portfolios/crypto-starter",
    thumbnail: "/thumbnails/crypto.jpg",
    description: "Entry point to digital assets",
    category: "Crypto",
  },
  {
    id: 6,
    name: "Dividend Income",
    path: "/portfolios/dividend-income",
    thumbnail: "/thumbnails/dividend.jpg",
    description: "Stable companies with reliable dividends",
    category: "Income",
  },
];

const CATEGORIES = [
  "All Portfolios",
  "Technology",
  "Green Energy",
  "Global",
  "Crypto",
  "Income",
];

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userData, setUserData] = useState([]);
  const [cookie, , removeCookie] = useCookies(["userId"]);

  // Memoized filtered portfolios for better performance
  const filteredPortfolios = useMemo(() => {
    if (!searchQuery.trim()) return PORTFOLIOS_DATA;

    const query = searchQuery.toLowerCase();
    return PORTFOLIOS_DATA.filter((portfolio) =>
      ["name", "description", "category"].some((prop) =>
        portfolio[prop]?.toLowerCase().includes(query)
      )
    );
  }, [searchQuery]);

  const handleCategorySelect = (category) => {
    setSearchQuery(category === "All Portfolios" ? "" : category);
    setSidebarOpen(false);
  };

  const getUserData = async () => {
    try {
      const data = await Fetch.get(`get-data`);

      if (data.success === true) {
        setUserData(data.data);
      } else {
        removeCookie("userId");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav removeCookie={removeCookie} userData={userData} />

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-20 md:hidden">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative bg-white h-full w-64 p-4 shadow-xl">
            <h2 className="text-xl font-bold mb-6">Categories</h2>
            <nav>
              <ul className="space-y-3">
                {CATEGORIES.map((item) => (
                  <li key={item}>
                    <button
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                      onClick={() => handleCategorySelect(item)}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4 md:p-6">
        {/* Header and Search */}
        <div>
          <p className="text-5xl">
            Hii,{" "}
            <span className="text-blue-500 font-bold">{userData.name} </span>
          </p>
        </div>
        <br />
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Your Portfolio
            </h1>
            <p className="text-gray-600">Your bought portfolio on there </p>
          </div>

          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search portfolios..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>

        {/* Portfolio Grid */}
        {filteredPortfolios.length > 0 ? (
          <div className="mb-8">
            <Card portfolios={filteredPortfolios} />
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-700">
              No portfolios found
            </h3>
            <p className="text-gray-500 mt-2">Try a different search term</p>
          </div>
        )}
      </main>
    </div>
  );
}
