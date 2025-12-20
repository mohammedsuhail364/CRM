import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { motion } from "framer-motion";

const EmployeeCustomerDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const type = searchParams.get("type"); // open | closed | pending
  const navigate = useNavigate();

  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [empName, setEmpName] = useState("");
  const [error, setError] = useState(null);
  const [dateFilter, setDateFilter] = useState("today");

  useEffect(() => {
    if (sessionStorage.getItem("role") !== "admin") {
      navigate("/dashboard");
    }
  }, [navigate]);

  useEffect(() => {
    async function fetchTickets() {
      try {
        const response = await axiosInstance.get(
          `/admin/employee/${id}/customers?type=${type}`
        );
        const data = response.data.tickets || [];
        setTickets(data);
        setEmpName(response.data.userName || "Employee");
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch ticket details.");
        setLoading(false);
      }
    }

    fetchTickets();
  }, [id, type]);

  useEffect(() => {
    filterTicketsByDate();
  }, [tickets, dateFilter]);

  const filterTicketsByDate = () => {
    const now = new Date();

    const getTicketDate = (ticket) => new Date(ticket.date);

    const filtered = tickets.filter((ticket) => {
      const ticketDate = getTicketDate(ticket);
      const diffTime = now - ticketDate;
      const diffDays = diffTime / (1000 * 60 * 60 * 24);

      if (dateFilter === "today") {
        return ticketDate.toDateString() === now.toDateString();
      }
      if (dateFilter === "week") {
        return diffDays <= 7;
      }
      if (dateFilter === "month") {
        return diffDays <= 30;
      }
      return true; // "all"
    });

    setFilteredTickets(filtered);
  };

  if (loading) {
    return (
      <p className="text-center mt-10 text-lg text-gray-500">
        Loading tickets...
      </p>
    );
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-[#1E40AF] text-center mb-6"
      >
        {`${type === "open" ? "All" : type.charAt(0).toUpperCase() + type.slice(1)} Tickets`} - {empName}
      </motion.h1>

      {/* Date Filter Dropdown */}
      <div className="flex justify-center mb-6">
        <select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All</option>
          <option value="today">Today</option>
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
        </select>
      </div>

      {filteredTickets.length === 0 ? (
        <p className="text-center text-gray-600">
          No {type} tickets found for selected filter.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTickets.map((ticket, index) => {
            const isSolved = ticket.solution && ticket.solution.trim() !== "";

            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl shadow-md p-4"
              >
                <h3 className="text-lg font-semibold text-[#1E40AF] mb-2">
                  Ticket #{ticket.ticketNumber} - {ticket.company}
                </h3>
                <p>
                  <span className="font-medium">Date:</span>{" "}
                  {new Date(ticket.date).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-medium">Challenge:</span>{" "}
                  {ticket.challenge}
                </p>

                {type === "closed" && isSolved && (
                  <>
                    <p>
                      <span className="font-medium">Solution:</span> {ticket.solution}
                    </p>
                    <p>
                      <span className="font-medium">Solved Date:</span>{" "}
                      {new Date(ticket.solvedDate).toLocaleString()}
                    </p>
                  </>
                )}

                {type === "open" && (
                  <>
                    <p>
                      <span className="font-medium">Status:</span>{" "}
                      {isSolved ? "Closed" : "Pending"}
                    </p>
                    {isSolved && (
                      <>
                        <p>
                          <span className="font-medium">Solution:</span> {ticket.solution}
                        </p>
                        <p>
                          <span className="font-medium">Solved Date:</span>{" "}
                          {new Date(ticket.solvedDate).toLocaleString()}
                        </p>
                      </>
                    )}
                  </>
                )}

                {type === "pending" && !isSolved && (
                  <p className="text-yellow-600 font-medium">🕒 Pending Resolution</p>
                )}
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EmployeeCustomerDetails;
