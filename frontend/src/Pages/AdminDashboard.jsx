import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState([]);

  useEffect(() => {
    if (sessionStorage.getItem("role") !== "admin") {
      navigate("/dashboard");
    }
  }, []);

  const collectData = async () => {
    try {
      const response = await axiosInstance.get("admin/get-all-data");
      const data = response.data;

      const dynamicStats = [
        {
          title: "All Employees",
          count: data.totalEmployees || 0,
          color: "#1E40AF",
          route: "/admin/employees",
        },
        {
          title: "Open Tickets",
          count: data.totalTickets || 0,
          color: "#F59E0B",
          route: "/admin/tickets/get?status=total",
        },
        {
          title: "Closed Tickets",
          count: data.closedTickets || 0,
          color: "#10B981",
          route: "/admin/tickets/get?status=close",
        },
        {
          title: "Pending Tickets",
          count: data.openTickets || 0,
          color: "#EF4444",
          route: "/admin/tickets/get?status=open",
        },
        {
          title: "Repeated Customer",
          count: data.mostRepeatedCustomer || "N/A",
          color: "#8B5CF6",
          route: "/admin",
        },
        {
          title: "Create Employee", // New section for creating employees
          count: "Create New Employee",
          color: "#4FD1C5", // Soft teal color for a unique look
          route: "/admin/create-employee",
        },
      ];

      setStats(dynamicStats);
    } catch (err) {
      console.error("Failed to fetch dashboard data", err);
    }
  };

  useEffect(() => {
    collectData();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-[#1E40AF] text-center mb-10"
      >
        Admin Dashboard
      </motion.h1>

      {/* Top row (first 3 sections) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 text-center">
        {stats.slice(0, 3).map((item) => (
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            key={item.title}
            onClick={() => navigate(item.route)}
            className="cursor-pointer p-6 rounded-xl shadow-lg text-white h-full flex flex-col justify-between"
            style={{ backgroundColor: item.color }}
          >
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-3xl font-bold mt-2">
              {typeof item.count === "number" ? item.count : String(item.count)}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Bottom row (last 3 sections) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
        {stats.slice(3, 6).map((item) => (
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            key={item.title}
            onClick={() => navigate(item.route)}
            className="cursor-pointer p-6 rounded-xl shadow-lg text-white h-full flex flex-col justify-between"
            style={{ backgroundColor: item.color }}
          >
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-3xl font-bold mt-2">
              {typeof item.count === "number" ? item.count : String(item.count)}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
