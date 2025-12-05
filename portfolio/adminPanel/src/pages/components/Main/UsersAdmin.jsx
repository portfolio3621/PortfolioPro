import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  FiPlus,
  FiTrash2,
  FiX,
  FiUser,
  FiMail,
  FiPhone,
  FiCheck,
  FiX as FiXIcon,
  FiSearch,
} from "react-icons/fi";

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URI;

export default function UsersAdmin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    avatar: "",
    online: false,
  });
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/get-all-user`);
        setUsers(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Handle sorting
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Apply sorting
  const sortedUsers = [...users].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  // Apply filtering
  const filteredUsers = sortedUsers.filter((user) => {
    return (
      (user.name &&
        user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.email &&
        user.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.phone &&
        user.phone.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BACKEND_URL}/users`, formData);
      setUsers([...users, response.data]);
      setShowModal(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        avatar: "",
        online: false,
      });
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`${BACKEND_URL}/users/${id}`);
        setUsers(users.filter((u) => u._id !== id));
      } catch (error) {
        console.error("Error deleting user:", error);
      }
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
    <div className="m-4 max-w-7xl mx-auto">
      {/* Header with Search and Add Button */}
      <nav className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
          <p className="text-gray-600">Manage all system users</p>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search users..."
              className="input input-bordered w-full pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FiSearch className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowModal(true)}
            className="btn btn-primary gap-2"
          >
            <FiPlus className="h-5 w-5" />
            Add User
          </motion.button>
        </div>
      </nav>

      {/* Users Table */}
      {filteredUsers.length > 0 ? (
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
                  <th>Avatar</th>
                  <th
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("name")}
                  >
                    <div className="flex items-center gap-2">
                      Name {getSortIndicator("name")}
                    </div>
                  </th>
                  <th
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("email")}
                  >
                    <div className="flex items-center gap-2">
                      Email {getSortIndicator("email")}
                    </div>
                  </th>
                  <th
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("phone")}
                  >
                    <div className="flex items-center gap-2">
                      Phone {getSortIndicator("phone")}
                    </div>
                  </th>
                  <th
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("online")}
                  >
                    <div className="flex items-center gap-2">
                      Status {getSortIndicator("online")}
                    </div>
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filteredUsers.map((user) => (
                    <motion.tr
                      key={user._id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="hover:bg-gray-50 border-t border-gray-100"
                    >
                      <td>
                        {user.avatar ? (
                          <div className="avatar">
                            <div className="w-10 rounded-full">
                              <img src={user.avatar} alt={user.name} />
                            </div>
                          </div>
                        ) : (
                          <div className="avatar placeholder">
                            <div className="bg-neutral text-neutral-content rounded-full w-10">
                              <span className="text-xs">
                                {user.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          </div>
                        )}
                      </td>
                      <td className="font-medium">{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone || "-"}</td>
                      <td>
                        {user.online ? (
                          <span className="flex items-center gap-1 text-success">
                            <FiCheck /> Online
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-error">
                            <FiXIcon /> Offline
                          </span>
                        )}
                      </td>
                      <td>
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="btn btn-sm btn-ghost text-error hover:bg-error/10"
                          aria-label="Delete"
                        >
                          <FiTrash2 size={16} />
                        </button>
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
          <div className="text-7xl mb-6 text-gray-200">👤</div>
          <h3 className="text-xl font-medium text-gray-700 mb-2">
            No users found
          </h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            {searchTerm
              ? "No users match your search. Try a different term."
              : "You don't have any users yet. Create your first user to get started."}
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="btn btn-primary gap-2"
          >
            <FiPlus size={18} />
            Create New User
          </button>
        </motion.div>
      )}

      {/* Add Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white z-10 border-b border-gray-200 p-4 flex justify-between items-center">
                <h2 className="text-xl font-bold">Add New User</h2>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setFormData({
                      name: "",
                      email: "",
                      phone: "",
                      avatar: "",
                      online: false,
                    });
                  }}
                  className="btn btn-ghost btn-circle"
                  aria-label="Close"
                >
                  <FiX size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6">
                <div className="space-y-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text flex items-center gap-2">
                        <FiUser /> Full Name
                      </span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="input input-bordered w-full"
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text flex items-center gap-2">
                        <FiMail /> Email
                      </span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="input input-bordered w-full"
                      placeholder="user@example.com"
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text flex items-center gap-2">
                        <FiPhone /> Phone
                      </span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="input input-bordered w-full"
                      placeholder="+1 (123) 456-7890"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Avatar URL</span>
                    </label>
                    <input
                      type="url"
                      name="avatar"
                      value={formData.avatar}
                      onChange={handleInputChange}
                      className="input input-bordered w-full"
                      placeholder="https://example.com/avatar.jpg"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label cursor-pointer justify-start gap-3">
                      <input
                        type="checkbox"
                        name="online"
                        checked={formData.online}
                        onChange={handleCheckboxChange}
                        className="checkbox checkbox-primary"
                      />
                      <span className="label-text">Online Status</span>
                    </label>
                  </div>
                </div>

                <div className="modal-action mt-8">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        avatar: "",
                        online: false,
                      });
                    }}
                    className="btn btn-ghost"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary gap-2">
                    Create User
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
