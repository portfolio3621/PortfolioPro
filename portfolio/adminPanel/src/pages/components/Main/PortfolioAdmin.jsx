import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiX,
  FiExternalLink,
  FiImage,
  FiDollarSign,
  FiType,
  FiCheck,
} from "react-icons/fi";

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URI;

const PortfolioAdmin = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    path: "",
    thumbnail: "",
    price: "",
    Type: "Basic",
  });
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "title",
    direction: "asc",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const fetchPortfolios = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/all-portfolio`);
      setPortfolios(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching portfolios:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedPortfolios = [...portfolios].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const filteredPortfolios = sortedPortfolios.filter((portfolio) => {
    const matchesTab =
      activeTab === "all" ||
      (portfolio.Type && portfolio.Type.toLowerCase() === activeTab);

    const matchesSearch =
      (portfolio.title &&
        portfolio.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (portfolio.path &&
        portfolio.path.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesTab && matchesSearch;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (editingId) {
        await axios.put(`${BACKEND_URL}/portfolio/${editingId}`, formData);
        setPortfolios(
          portfolios.map((p) =>
            p._id === editingId ? { ...p, ...formData } : p
          )
        );
      } else {
        const response = await axios.post(`${BACKEND_URL}/portfolio`, formData);
        setPortfolios([...portfolios, response.data]);
      }

      setSubmitSuccess(true);
      setTimeout(() => {
        setShowModal(false);
        setSubmitSuccess(false);
        setFormData({
          title: "",
          path: "",
          thumbnail: "",
          price: "",
          Type: "Basic",
        });
        setEditingId(null);
        setIsSubmitting(false);
      }, 1500);
    } catch (error) {
      console.error("Error saving portfolio:", error);
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setTimeout(() => {
          setShowModal(false);
          setSubmitSuccess(false);
          setFormData({
            title: "",
            path: "",
            thumbnail: "",
            price: "",
            Type: "Basic",
          });
          setEditingId(null);
          setIsSubmitting(false);
        }, 1500);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
  }, []);
  const handleEdit = (portfolio) => {
    setFormData({
      title: portfolio.title,
      path: portfolio.path,
      thumbnail: portfolio.thumbnail,
      price: portfolio.price,
      Type: portfolio.Type,
    });
    setEditingId(portfolio._id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (
      window.confirm("Are you sure you want to delete this portfolio item?")
    ) {
      try {
        await axios.delete(`${BACKEND_URL}/portfolio/${id}`);
        setPortfolios(portfolios.filter((p) => p._id !== id));
      } catch (error) {
        console.error("Error deleting portfolio:", error);
      }
    }
  };

  const getBadgeColor = (type) => {
    switch (type) {
      case "Premium":
        return "bg-gradient-to-r from-purple-600 to-pink-600";
      case "Standard":
        return "bg-gradient-to-r from-blue-600 to-teal-500";
      case "Basic":
        return "bg-gradient-to-r from-gray-600 to-gray-500";
      default:
        return "bg-gray-300";
    }
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? "↑" : "↓";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header with Add Button */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <h1 className="text-3xl font-bold text-gray-800">
            Portfolio Management
          </h1>
          <p className="text-gray-600">
            Manage your portfolio items and pricing tiers
          </p>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search portfolios..."
              className="input input-bordered w-full pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              className="absolute left-3 top-3 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowModal(true)}
            className="btn btn-primary gap-2"
          >
            <FiPlus className="h-5 w-5" />
            Add Portfolio
          </motion.button>
        </div>
      </div>

      {/* Filter Tabs */}
      <motion.div
        className="flex flex-col md:flex-row justify-between gap-4 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="tabs rounded-3xl tabs-boxed bg-base-200 p-1 overflow-x-auto">
          {["all", "Basic", "Standard", "Premium"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`tab rounded-3xl capitalize ${
                activeTab === tab.toLowerCase()
                  ? "tab-active !bg-primary !text-white"
                  : ""
              }`}
            >
              {tab}
              {tab !== "all" && (
                <span className="badge badge-sm ml-2">
                  {portfolios.filter((p) => p.Type === tab).length}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="text-sm text-gray-500 flex items-center">
          Showing {filteredPortfolios.length} of {portfolios.length} items
        </div>
        <button onClick={fetchPortfolios}>Refresh</button>
      </motion.div>

      {/* Portfolio Table */}
      {filteredPortfolios.length > 0 ? (
        <motion.div
          className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("title")}
                  >
                    <div className="flex items-center gap-2">
                      Title {getSortIndicator("title")}
                    </div>
                  </th>
                  <th>Thumbnail</th>
                  <th
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("Type")}
                  >
                    <div className="flex items-center gap-2">
                      Type {getSortIndicator("Type")}
                    </div>
                  </th>
                  <th
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("price")}
                  >
                    <div className="flex items-center gap-2">
                      Price {getSortIndicator("price")}
                    </div>
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filteredPortfolios.map((portfolio) => (
                    <motion.tr
                      key={portfolio._id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="hover:bg-gray-50 border-t border-gray-100"
                    >
                      <td>
                        <div className="font-medium">{portfolio.title}</div>
                        <a
                          href={portfolio.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-primary flex items-center gap-1 mt-1"
                        >
                          <FiExternalLink size={12} /> View
                        </a>
                      </td>
                      <td>
                        {portfolio.thumbnail ? (
                          <div className="avatar">
                            <div className="w-12 h-12 rounded">
                              <img
                                src={portfolio.thumbnail}
                                alt="Thumbnail"
                                className="object-cover"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="text-gray-400">
                            <FiImage size={20} />
                          </div>
                        )}
                      </td>
                      <td>
                        <span
                          className={`badge ${getBadgeColor(
                            portfolio.Type
                          )} text-white`}
                        >
                          {portfolio.Type}
                        </span>
                      </td>
                      <td>
                        <div className="flex items-center gap-1">
                          <FiDollarSign size={14} />
                          <span>{portfolio.price}</span>
                        </div>
                      </td>
                      <td>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(portfolio)}
                            className="btn btn-sm btn-ghost text-primary hover:bg-primary/10"
                            aria-label="Edit"
                          >
                            <FiEdit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(portfolio._id)}
                            className="btn btn-sm btn-ghost text-error hover:bg-error/10"
                            aria-label="Delete"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100"
        >
          <div className="text-7xl mb-6 text-gray-200">📭</div>
          <h3 className="text-xl font-medium text-gray-700 mb-2">
            No portfolios found
          </h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            {activeTab === "all"
              ? "You don't have any portfolios yet. Create your first portfolio item to get started."
              : `You don't have any ${activeTab} portfolios. Try changing your filter or create a new one.`}
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="btn btn-primary gap-2"
          >
            <FiPlus size={18} />
            Create New Portfolio
          </button>
        </motion.div>
      )}

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white z-10 border-b border-gray-200 p-4 flex justify-between items-center">
                <h2 className="text-xl font-bold">
                  {editingId ? "Edit Portfolio" : "Add New Portfolio"}
                </h2>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setEditingId(null);
                    setFormData({
                      title: "",
                      path: "",
                      thumbnail: "",
                      price: "",
                      Type: "Basic",
                    });
                  }}
                  className="btn btn-ghost btn-circle"
                  aria-label="Close"
                >
                  <FiX size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text flex items-center gap-2">
                          <FiType /> Title
                        </span>
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                        placeholder="Project Name"
                        required
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text flex items-center gap-2">
                          <FiExternalLink /> Path/URL
                        </span>
                      </label>
                      <input
                        type="text"
                        name="path"
                        value={formData.path}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                        placeholder="Name of the portfolio"
                        required
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text flex items-center gap-2">
                          <FiImage /> Thumbnail URL
                        </span>
                      </label>
                      <input
                        type="url"
                        name="thumbnail"
                        value={formData.thumbnail}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                        placeholder="https://example.com/image.jpg"
                        required
                      />
                      {formData.thumbnail && (
                        <div className="mt-2">
                          <div className="text-xs text-gray-500 mb-1">
                            Preview:
                          </div>
                          <img
                            src={formData.thumbnail}
                            alt="Thumbnail preview"
                            className="h-20 object-contain rounded border"
                            onError={(e) => (e.target.style.display = "none")}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text flex items-center gap-2">
                          <FiDollarSign /> Price
                        </span>
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Type</span>
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {["Basic", "Standard", "Premium"].map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() =>
                              setFormData({ ...formData, Type: type })
                            }
                            className={`btn ${
                              formData.Type === type
                                ? `${getBadgeColor(type)} text-white`
                                : "btn-outline"
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="modal-action mt-8">
                  <motion.button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditingId(null);
                      setFormData({
                        title: "",
                        path: "",
                        thumbnail: "",
                        price: "",
                        Type: "Basic",
                      });
                    }}
                    className="btn btn-ghost"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Cancel
                  </motion.button>

                  <div className="relative w-48">
                    <AnimatePresence mode="wait">
                      {submitSuccess ? (
                        <motion.div
                          key="success"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          className="absolute inset-0 flex items-center justify-center bg-primary text-white rounded-lg"
                        >
                          <motion.div
                            initial={{ rotate: -90, scale: 0 }}
                            animate={{ rotate: 0, scale: 1 }}
                            transition={{ type: "spring" }}
                          >
                            <FiCheck size={24} />
                          </motion.div>
                        </motion.div>
                      ) : (
                        <motion.button
                          key="submit"
                          type="submit"
                          className="btn btn-primary gap-2 w-full"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <span className="loading loading-spinner"></span>
                          ) : editingId ? (
                            "Update Portfolio"
                          ) : (
                            "Create Portfolio"
                          )}
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PortfolioAdmin;
