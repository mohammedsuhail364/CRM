import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import axiosInstance from "../api/axiosInstance";

const OpenAndCloseTicketsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get("status") || "all";

  const [tickets, setTickets] = useState([]);
  const [dateFilter, setDateFilter] = useState("today");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [companySearch, setCompanySearch] = useState("");
  const [gstSearch, setGstSearch] = useState("");
  const [phoneSearch, setPhoneSearch] = useState("");
  const [serialSearch, setSerialSearch] = useState("");
  const [employeeSearch, setEmployeeSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("role") !== "admin") {
      navigate("/dashboard");
    }
  }, []);

  const filterByDate = (ticketDate) => {
    const today = dayjs();
    const date = dayjs(ticketDate);

    switch (dateFilter) {
      case "today":
        return date.isSame(today, "day");
      case "lastWeek":
        return date.isAfter(today.subtract(7, "day"));
      case "lastMonth":
        return date.isAfter(today.subtract(30, "day"));
      case "custom":
        if (fromDate && toDate) {
          const from = dayjs(fromDate);
          const to = dayjs(toDate);
          return date.isAfter(from.subtract(1, "day")) && date.isBefore(to.add(1, "day"));
        }
        return true;
      default:
        return true;
    }
  };

  const normalizeTicket = (ticket, index) => ({
    ticketNo: ticket.ticketNumber || `TK${index + 1}`,
    date: ticket.date,
    employeeName: ticket.user || "N/A",
    companyName: ticket.company || "N/A",
    challenge: ticket.challenge,
    solution: ticket.solution || "",
    solvedDate: ticket.solution ? ticket.solvedDate : "",
    gstNumber: ticket.companyDetails?.gstNumber || "N/A",
    mobileNumber: ticket.companyDetails?.mobileNumber1 || "N/A",
    serialNo: ticket.companyDetails?.serialNo || "N/A",
  });

  const fetchTickets = async () => {
    try {
      setLoading(true);
      let response;
      if (status === "open") {
        response = await axiosInstance.get("/admin/get-open-tickets");
      } else if (status === "close") {
        response = await axiosInstance.get("/admin/get-close-tickets");
      } else if (status === "total") {
        response = await axiosInstance.get("/admin/get-total-tickets");
      }

      const allTickets = response?.data?.tickets || [];
      const normalized = allTickets
        .map(normalizeTicket)
        .filter((ticket) => filterByDate(ticket.date));

      setTickets(normalized);
    } catch (err) {
      console.error("Error fetching tickets:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [status, dateFilter, fromDate, toDate]);

  const isClosed = status === "close";
  const isTotal = status === "total";

  const filteredTickets = tickets.filter((ticket) =>
    ticket.companyName.toLowerCase().includes(companySearch.toLowerCase()) &&
    ticket.gstNumber.toLowerCase().includes(gstSearch.toLowerCase()) &&
    ticket.mobileNumber.toLowerCase().includes(phoneSearch.toLowerCase()) &&
    ticket.serialNo.toLowerCase().includes(serialSearch.toLowerCase()) &&
    ticket.employeeName.toLowerCase().includes(employeeSearch.toLowerCase())
  );
  console.log(filteredTickets);
  

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-[#1E40AF] mb-6 text-center"
      >
        {status.charAt(0).toUpperCase() + status.slice(1)} Tickets
      </motion.h1>

      <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        <select
          className="border px-4 py-2 rounded-md shadow-sm"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        >
          <option value="all">All Dates</option>
          <option value="today">Today</option>
          <option value="lastWeek">Last 7 Days</option>
          <option value="lastMonth">Last 30 Days</option>
          <option value="custom">Custom Range</option>
        </select>
        {dateFilter === "custom" && (
          <>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="border px-3 py-2 rounded-md shadow-sm"
            />
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="border px-3 py-2 rounded-md shadow-sm"
            />
          </>
        )}
        <input
          type="text"
          placeholder="Search Company..."
          value={companySearch}
          onChange={(e) => setCompanySearch(e.target.value)}
          className="border px-4 py-2 rounded-md shadow-sm"
        />
        <input
          type="text"
          placeholder="Search GST No..."
          value={gstSearch}
          onChange={(e) => setGstSearch(e.target.value)}
          className="border px-4 py-2 rounded-md shadow-sm"
        />
        <input
          type="text"
          placeholder="Search Phone No..."
          value={phoneSearch}
          onChange={(e) => setPhoneSearch(e.target.value)}
          className="border px-4 py-2 rounded-md shadow-sm"
        />
        <input
          type="text"
          placeholder="Search Serial No..."
          value={serialSearch}
          onChange={(e) => setSerialSearch(e.target.value)}
          className="border px-4 py-2 rounded-md shadow-sm"
        />
        <input
          type="text"
          placeholder="Search Employee Name..."
          value={employeeSearch}
          onChange={(e) => setEmployeeSearch(e.target.value)}
          className="border px-4 py-2 rounded-md shadow-sm"
        />
      </div>

      {loading ? (
        <div className="text-center py-10 text-lg font-semibold text-gray-600">Loading...</div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow-md">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-blue-100 text-xs uppercase text-gray-700">
              <tr>
                <th className="px-4 py-3">Ticket No</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Company Name</th>
                <th className="px-4 py-3">GST No</th>
                <th className="px-4 py-3">Mobile No</th>
                <th className="px-4 py-3">Serial No</th>
                <th className="px-4 py-3">Employee</th>
                <th className="px-4 py-3">Challenge</th>
                <th className="px-4 py-3">Solution</th>
                {(isClosed || isTotal) && <th className="px-4 py-3">Solved Date</th>}
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map((ticket, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{ticket.ticketNo}</td>
                  <td className="px-4 py-2">{dayjs(ticket.date).format("DD-MM-YYYY")}</td>
                  <td className="px-4 py-2">{ticket.companyName}</td>
                  <td className="px-4 py-2">{ticket.gstNumber}</td>
                  <td className="px-4 py-2">{ticket.mobileNumber}</td>
                  <td className="px-4 py-2">{ticket.serialNo}</td>
                  <td className="px-4 py-2">{ticket.employeeName}</td>
                  <td className="px-4 py-2">{ticket.challenge}</td>
                  <td className="px-4 py-2">{ticket.solution || "—"}</td>
                  {(isClosed || isTotal) && (
                    <td className="px-4 py-2">
                      {ticket.solvedDate ? dayjs(ticket.solvedDate).format("DD-MM-YYYY hh:mm A") : "—"}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OpenAndCloseTicketsPage;
