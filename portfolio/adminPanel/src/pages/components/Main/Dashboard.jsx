import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URI;

export default function Dashboard() {
  // Sample
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalBills, setTotalBills] = useState(0);
  const [portfolios, setPortfolios] = useState({
    basic: 0,
    standard: 0,
    premium: 0,
  });

  const stats = {
    onlineUsers: 1243,
    recentActivity: [
      {
        event: "New subscription",
        user: "user@example.com",
        type: "premium",
        time: "2 minutes ago",
      },
      {
        event: "Portfolio updated",
        user: "client@domain.com",
        type: "standard",
        time: "12 minutes ago",
      },
      {
        event: "Payment received",
        user: "customer@site.com",
        type: "basic",
        time: "1 hour ago",
      },
    ],
  };

  // Calculate totals
  const totalPortfolios =
    portfolios.basic + portfolios.standard + portfolios.premium;

  const fetchDatas = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/admin/dashboard`);
      const res = response.data.data;
      setTotalUsers(res.user);
      setPortfolios(res.portfolio);
      setTotalBills(res.bills);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDatas();
  }, []);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardItem = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const radialProgress = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: { type: "spring", stiffness: 150 },
    },
  };

  const tableRow = {
    hidden: { x: -50, opacity: 0 },
    visible: (i) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      className="p-6"
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-8"
      >
        Dashboard Overview
      </motion.h1>

      <motion.div
        variants={container}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {/* Online Users Card */}
        <motion.div
          variants={cardItem}
          custom={0}
          whileHover={{ y: -5 }}
          className="card bg-primary text-primary-content shadow-lg"
        >
          <div className="card-body">
            <h2 className="card-title">Online Users</h2>
            <div className="flex items-center">
              <motion.div
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="text-4xl font-bold"
              >
                {stats.onlineUsers}
              </motion.div>
              <motion.div variants={radialProgress} className="ml-auto">
                <div
                  className="radial-progress text-white"
                  style={{ "--value": 70, "--size": "3.5rem" }}
                >
                  70%
                </div>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 0.4 }}
              className="text-sm"
            >
              Active in last 15 minutes
            </motion.div>
          </div>
        </motion.div>

        {/* Total Users Card */}
        <motion.div
          variants={cardItem}
          custom={1}
          whileHover={{ y: -5 }}
          className="card bg-secondary text-secondary-content shadow-lg"
        >
          <div className="card-body">
            <h2 className="card-title">Total Users</h2>
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold"
            >
              {totalUsers}
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex justify-between text-sm"
            >
              <span>Life Time</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Total Portfolios Card */}
        <motion.div
          variants={cardItem}
          custom={2}
          whileHover={{ y: -5 }}
          className="card bg-accent text-accent-content shadow-lg"
        >
          <div className="card-body">
            <h2 className="card-title">Total Portfolios</h2>
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold"
            >
              {totalPortfolios}
            </motion.div>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.3, duration: 1 }}
              className="w-full bg-gray-200 rounded-full h-2.5 my-2"
            >
              <div className="bg-blue-600 h-2.5 rounded-full w-full"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-3 gap-2 text-xs"
            >
              <div>
                <div className="font-bold">Basic</div>
                <div>{portfolios.basic}</div>
              </div>
              <div>
                <div className="font-bold">Standard</div>
                <div>{portfolios.standard}</div>
              </div>
              <div>
                <div className="font-bold">Premium</div>
                <div>{portfolios.premium}</div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Total Bills Card */}
        <motion.div
          variants={cardItem}
          custom={3}
          whileHover={{ y: -5 }}
          className="card bg-neutral text-neutral-content shadow-lg"
        >
          <div className="card-body">
            <h2 className="card-title">Total Bills</h2>
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold"
            >
              {totalBills.toLocaleString()}
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex justify-between items-center mt-2"
            >
              <span className="text-sm">Life Time</span>
              <span className="badge badge-info">$42,850</span>
            </motion.div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.4, duration: 1 }}
            >
              <progress
                className="progress progress-info w-full mt-2"
                value="75"
                max="100"
              ></progress>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Recent Activity Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card bg-base-100 shadow-lg"
      >
        <div className="card-body">
          <h2 className="card-title">Recent Activity</h2>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Event</th>
                  <th>User</th>
                  <th>Portfolio</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {stats.recentActivity.map((activity, i) => (
                    <motion.tr
                      key={i}
                      custom={i}
                      initial="hidden"
                      animate="visible"
                      variants={tableRow}
                      whileHover={{ scale: 1.01 }}
                      className="hover:bg-base-200"
                    >
                      <td>{activity.event}</td>
                      <td>{activity.user}</td>
                      <td>
                        <span
                          className={`badge ${
                            activity.type === "premium"
                              ? "badge-success"
                              : activity.type === "standard"
                              ? "badge-warning"
                              : "badge-primary"
                          }`}
                        >
                          {activity.type.charAt(0).toUpperCase() +
                            activity.type.slice(1)}
                        </span>
                      </td>
                      <td>{activity.time}</td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
