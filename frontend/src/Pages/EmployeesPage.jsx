import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const EmployeesPage = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);

  async function collectEmployees() {
    try {
      const response = await axiosInstance.get("admin/get-employees");
      const processed = response.data.map((emp) => ({
        ...emp,
        pendingTickets: emp.openTickets, // Treat previous openTickets as pending
        openTickets: emp.openTickets + emp.closedTickets, // New open = closed + pending
      }));
      setEmployees(processed);
    } catch (err) {
      console.error("Failed to fetch employees:", err);
    }
  }

  useEffect(() => {
    collectEmployees();
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("role") !== "admin") {
      navigate("/dashboard");
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-[#1E40AF] text-center mb-10"
      >
        All Employees
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map((emp, index) => (
          <motion.div
            whileHover={{ scale: 1.02 }}
            key={index}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <h2 className="text-xl font-semibold text-[#1E40AF] mb-4 text-center">
              {emp.userName}
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div
                onClick={() =>
                  navigate(`/admin/employees/${emp.id}/customers?type=open`)
                }
                className="cursor-pointer bg-[#1E40AF] text-white p-4 rounded-lg shadow hover:opacity-90 transition"
              >
                <h3 className="text-lg font-semibold">Open Tickets</h3>
                <p className="text-2xl font-bold">{emp.openTickets}</p>
              </div>

              <div
                onClick={() =>
                  navigate(`/admin/employees/${emp.id}/customers?type=closed`)
                }
                className="cursor-pointer bg-[#22C55E] text-white p-4 rounded-lg shadow hover:opacity-90 transition"
              >
                <h3 className="text-lg font-semibold">Closed Tickets</h3>
                <p className="text-2xl font-bold">{emp.closedTickets}</p>
              </div>

              <div
                onClick={() =>
                  navigate(`/admin/employees/${emp.id}/customers?type=pending`)
                }
                className="cursor-pointer bg-[#F59E0B] text-white p-4 rounded-lg shadow hover:opacity-90 transition"
              >
                <h3 className="text-lg font-semibold">Pending Tickets</h3>
                <p className="text-2xl font-bold">{emp.pendingTickets}</p>
              </div>

              <div className="bg-[#1E40AF] text-white p-4 rounded-lg shadow hover:opacity-90 transition">
                <h3 className="text-lg font-semibold">Repeated Customers</h3>
                <p className="text-2xl font-bold">{emp.repeatedCustomer}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EmployeesPage;
