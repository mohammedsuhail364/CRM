import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "../Context/AuthContext";

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 10;

  const userEmail = sessionStorage.getItem("userEmail");
  const { setCompanyName } = useAuth();
  const navigate = useNavigate();

  async function collectAllTicketsService() {
    try {
      const response = await axiosInstance.get("employee/get-all-tickets", {
        params: { userEmail },
      });
      if (response.data.success) {
        setTickets(response.data.tickets);
        setFilteredTickets(response.data.tickets);
        setCurrentPage(1); // Reset to first page
      }
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  }

  const handleFilterChange = (type) => {
    setFilterType(type);
    setSearchTerm("");
    filterTickets(type);
    setCurrentPage(1);
  };

  const filterTickets = (type) => {
    let filteredData = tickets;
    const currentDate = new Date();

    switch (type) {
      case "today":
        filteredData = tickets.filter(
          (ticket) => new Date(ticket.date).toDateString() === currentDate.toDateString()
        );
        break;
      case "lastWeek":
        const lastWeekDate = new Date();
        lastWeekDate.setDate(currentDate.getDate() - 7);
        filteredData = tickets.filter(
          (ticket) => new Date(ticket.date) >= lastWeekDate && new Date(ticket.date) <= currentDate
        );
        break;
      case "lastMonth":
        const lastMonthDate = new Date();
        lastMonthDate.setMonth(currentDate.getMonth() - 1);
        filteredData = tickets.filter(
          (ticket) => new Date(ticket.date) >= lastMonthDate && new Date(ticket.date) <= currentDate
        );
        break;
      case "custom":
        if (startDate && endDate) {
          filteredData = tickets.filter(
            (ticket) => new Date(ticket.date) >= new Date(startDate) && new Date(ticket.date) <= new Date(endDate)
          );
        }
        break;
      default:
        filteredData = tickets;
    }

    setFilteredTickets(filteredData);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const searched = tickets.filter((ticket) => {
      const { ticketNumber, companyDetails } = ticket;
      return (
        ticketNumber?.toString().includes(value) ||
        companyDetails?.company?.toLowerCase().includes(value) ||
        companyDetails?.serialNo?.toLowerCase().includes(value) ||
        companyDetails?.gstNumber?.toLowerCase().includes(value) ||
        companyDetails?.mobileNumber1?.toLowerCase().includes(value) ||
        companyDetails?.contactPerson?.toLowerCase().includes(value)
      );
    });

    setFilteredTickets(searched);
    setCurrentPage(1);
  };

  const handleViewPending = async (ticketNumber) => {
    const response = await axiosInstance.get("employee/view-pending", {
      params: { userEmail, ticketNumber },
    });
    if (response.data.success) {
      setCompanyName(response.data.companyName);
      navigate("/callregister");
    }
  };

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (!token) navigate("/login");
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("role") !== "user") {
      navigate("/admin");
    }
  }, []);

  useEffect(() => {
    setCompanyName(null);
    collectAllTicketsService();
  }, []);

  // Pagination logic
  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = filteredTickets.slice(indexOfFirstTicket, indexOfLastTicket);
  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-[#1E40AF] mb-2 mt-20">🎟️ Tickets</h2>
      <p className="text-gray-600 mb-6">Manage and track all customer tickets efficiently.</p>

      {/* Filters */}
      <div className="mb-4 flex gap-4 flex-wrap">
        <button onClick={() => handleFilterChange("today")} className="px-4 py-2 bg-blue-500 text-white rounded-md">Today</button>
        <button onClick={() => handleFilterChange("lastWeek")} className="px-4 py-2 bg-blue-500 text-white rounded-md">Last Week</button>
        <button onClick={() => handleFilterChange("lastMonth")} className="px-4 py-2 bg-blue-500 text-white rounded-md">Last Month</button>
        <button onClick={() => handleFilterChange("custom")} className="px-4 py-2 bg-blue-500 text-white rounded-md">Custom Range</button>
      </div>

      {/* Custom Date Inputs */}
      {filterType === "custom" && (
        <div className="flex gap-4 mb-4 flex-wrap">
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="border px-3 py-2 rounded-md" />
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="border px-3 py-2 rounded-md" />
          <button onClick={() => filterTickets("custom")} className="px-4 py-2 bg-blue-500 text-white rounded-md">Apply</button>
        </div>
      )}

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search tickets..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4">
        {currentTickets.length === 0 ? (
          <p className="text-center text-gray-600 text-lg font-semibold">No tickets available</p>
        ) : (
          <table className="w-full border border-gray-300 rounded-md">
            <thead>
              <tr className="bg-[#1E40AF] text-white text-left">
                <th className="border p-3">Ticket No</th>
                <th className="border p-3">Date</th>
                <th className="border p-3">User</th>
                <th className="border p-3">Challenge</th>
                <th className="border p-3">Solution</th>
                <th className="border p-3">Status</th>
                <th className="border p-3">Company</th>
                <th className="border p-3">Serial No</th>
                <th className="border p-3">GST</th>
                <th className="border p-3">Mobile</th>
                <th className="border p-3">Contact</th>
              </tr>
            </thead>
            <tbody>
              {currentTickets.map((ticket, index) => (
                <tr key={index} className="odd:bg-gray-100 even:bg-white hover:bg-gray-200 transition">
                  <td className="border p-3">{ticket.ticketNumber}</td>
                  <td className="border p-3">{ticket.date}</td>
                  <td className="border p-3">{ticket.user}</td>
                  <td className="border p-3">{ticket.challenge}</td>
                  <td className="border p-3">{ticket.solution || "Not provided"}</td>
                  <td className={`border p-3 font-semibold ${ticket.solvedDate ? "text-green-600" : "text-yellow-600"}`}>
                    {ticket.solvedDate ? "Closed" : (
                      <button onClick={() => handleViewPending(ticket.ticketNumber)} className="cursor-pointer underline">
                        View Pending
                      </button>
                    )}
                  </td>
                  <td className="border p-3">{ticket.companyDetails?.company || "N/A"}</td>
                  <td className="border p-3">{ticket.companyDetails?.serialNo || "N/A"}</td>
                  <td className="border p-3">{ticket.companyDetails?.gstNumber || "N/A"}</td>
                  <td className="border p-3">{ticket.companyDetails?.mobileNumber1 || "N/A"}</td>
                  <td className="border p-3">{ticket.companyDetails?.contactPerson || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-4 gap-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md disabled:opacity-50"
            >
              Prev
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tickets;
