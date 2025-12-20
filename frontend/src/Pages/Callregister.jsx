import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
// import { assets } from "../assets/assets";
import { useCustomer } from "../Context/CustomerContext";
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "../Context/AuthContext";

const Callregister = () => {
  
  const navigate = useNavigate();
  const location = useLocation();
  const [showNav, setShowNav] = useState(true);
  let lastScrollY = window.scrollY;
  const userName = sessionStorage.getItem("userName");
  const userEmail = sessionStorage.getItem("userEmail");
  const [ticketData, setTicketData] = useState([]);
  const [showTickets, setShowTickets] = useState(false);
  const dropdownRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const { customer, setCustomer } = useCustomer();
  const { companyName } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  
  const [newTicket, setNewTicket] = useState({
    ticketNumber: 0,
    date: "",
    user: userName,
    challenge: "",
    solution: "",
  });
  useEffect(() => {
    if (sessionStorage.getItem("role") !== "user") {
      navigate("/admin");
    }
  }, []);
  const handleSelectCompany = (company) => {
    setSelectedCompany((prev) => (prev === company ? prev : company));
    setShowDropdown(false);
    setSearchQuery("");
  };

  const handleInputChange = (e) => {
    setNewTicket({ ...newTicket, [e.target.name]: e.target.value });
  };
  const filteredCustomers = customer
    ? customer.filter(
        (user) =>
          user.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.emailId.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : null;
  async function addTicketService() {
    const response = await axiosInstance.post(
      "/employee/add-ticket",
      { newTicket, company: selectedCompany.company, userEmail } // Send userEmail in the request body
    );
    if (response.data.success) {
      alert("Successfully added");
    }
  }

  const handleAddTicket = () => {
    if (
      !newTicket.ticketNumber ||
      !newTicket.date ||
      !newTicket.user ||
      !newTicket.challenge
    ) {
      alert("Please fill in all required fields (Solution is optional).");
      return;
    }
    setTicketData([...ticketData, newTicket]);
    console.log(ticketData.length);

    addTicketService();
    setNewTicket(() => ({
      ticketNumber: newTicket.ticketNumber + 1, // Ensures ticket number increments correctly
      date: "",
      user: userName,
      challenge: "",
      solution: "",
    }));
  };

  const handleCloseTicket = async (index) => {
    const company = selectedCompany.company;
    const removeTicketNo = ticketData[index].ticketNumber;
    const solution = ticketData[index].solution;
    if (!solution) {
      alert("solution is essential to close the ticket");
      return;
    }

    const response = await axiosInstance.put("/employee/update-ticket", {
      company,
      removeTicketNo,
      userEmail,
      solution,
    });
    if (response.data.success) {
      collectTicketDataService();
      alert("Successfully close the ticket");
    }
  };
  async function collectCustomerDataService() {
    const response = await axiosInstance.get("/customer/data");
    if (response.data.success) {
      setCustomer(response.data.data);
    }
  }

  async function collectTicketDataService() {
    try {
      if (!userEmail) {
        console.error("User email is required");
        return;
      }
      if (!selectedCompany) {
        return;
      }
      // Send userEmail as a query parameter
      const response = await axiosInstance.get("/employee/tickets", {
        params: { userEmail, company: selectedCompany.company },
      });
      console.log(response, "response");

      if (response.data.success) {
        if (response.data.message == "No tickets found") {
          setTicketData([]);
        } else {
          setTicketData(response.data.tickets);
        }
      }
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  }

  function handleSolutionChange(index, value) {
    setTicketData((prevData) =>
      prevData.map((item, i) =>
        i === index ? { ...item, solution: value } : item
      )
    );
  }
  async function collectTotalTickets() {
    const response = await axiosInstance.get("/employee/total-tickets", {
      params: { userEmail },
    });

    if (
      response?.data?.success &&
      typeof response.data?.totalTickets === "number"
    ) {
      setNewTicket((prev) => ({
        ...prev,
        ticketNumber: response.data.totalTickets + 1,
      }));
    } else {
      console.error("Invalid response or missing totalTickets");
    }
  }
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < lastScrollY) {
        setShowNav(true); // Show when scrolling up
      } else {
        setShowNav(false); // Hide when scrolling down
      }
      lastScrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    collectCustomerDataService();
    collectTotalTickets();
  }, []);
  useEffect(() => {
    collectTicketDataService();
  }, [selectedCompany]);
  useEffect(() => {
    if (!companyName) return;
    const foundCompany = customer.find((item) => item.company === companyName);

    if (foundCompany) {
      setSelectedCompany(foundCompany);
      collectTicketDataService();
      setShowTickets(true);
    }
  }, [companyName]);
  const token=sessionStorage.getItem('token');
  useEffect(()=>{
    if(!token){
      navigate('/login')
    }
  },[])
  return (
    <div className="h-screen flex flex-col bg-[#F8FAFC] p-2 items-center">
      {/* Floating Navigation - Appears when scrolling up */}
      {showNav && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white shadow-lg rounded-full flex space-x-6 p-3 px-8 fixed top-[5.5rem] left-1/2 -translate-x-1/2 z-40 border-2 border-[#F59E0B]"
        >
          <button
            className={`py-2 px-6 rounded-full font-semibold transition-all ${
              location.pathname === "/dashboard"
                ? "bg-[#1E40AF] text-white"
                : "hover:bg-gray-200"
            }`}
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>
          <button
            className={`py-2 px-6 rounded-full font-semibold transition-all ${
              location.pathname === "/callregister"
                ? "bg-[#1E40AF] text-white"
                : "hover:bg-gray-200"
            }`}
            onClick={() => navigate("/callregister")}
          >
            Call Register
          </button>
        </motion.div>
      )}

      {/* Push content down to avoid overlap */}
      <div className="mt-32 w-full max-w-7xl flex flex-col space-y-3">
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="relative bg-white p-3 shadow-md rounded-md mt-12"
          ref={dropdownRef}
        >
          <div className="flex items-center justify-between w-full">
            {/* Search Bar */}
            {/* <div className="flex items-center">
              <label className="text-gray-700 font-semibold text-sm mr-2">
                Search Customer
              </label>
              <input
                type="text"
                placeholder="Search..."
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#1E40AF] text-sm w-full"
                onFocus={() => setShowDropdown(true)}
              />
            </div> */}
            <div className="flex items-center">
              <label className="text-gray-700 font-semibold text-sm mr-2">
                Search Customer
              </label>
              <input
                type="text"
                placeholder="Search..."
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#1E40AF] text-sm w-full"
                onFocus={() => setShowDropdown(true)}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {/* Create button for new customers */}
            <div className="  flex justify-between space-x-0.5 md:space-x-3">
              <button
                onClick={() => navigate("/create-customers")}
                className="px-4 py-2 bg-[#1E40AF] text-white rounded-md text-sm font-semibold transition hover:bg-[#F59E0B]"
              >
                Create
              </button>

              {/* Tickets Button (Right-aligned) */}
              <button
                onClick={() => navigate("/tickets")}
                className="px-4 py-2 bg-[#1E40AF] text-white rounded-md text-sm font-semibold transition hover:bg-[#F59E0B]"
              >
                Tickets
              </button>
            </div>
          </div>

          {/* {showDropdown && (
            <ul className="absolute z-10 bg-white border border-gray-300 rounded-md mt-1 w-1/2 max-h-40 overflow-y-auto shadow-lg">
              {customer.map((user, index) => (
                <li
                  key={index}
                  className="p-2 text-sm hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    setShowTickets(true);
                    handleSelectCompany(user);
                    // collectCustomerDataService()
                  }} // Select company
                >
                  {user.company}
                </li>
              ))}
            </ul>
          )} */}
          {showDropdown && (
            <ul className="absolute z-10 bg-white border border-gray-300 rounded-md mt-1 w-1/2 max-h-40 overflow-y-auto shadow-lg">
              {filteredCustomers.map((user, index) => (
                <li
                  key={index}
                  className="p-2 text-sm hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    setShowTickets(true);
                    handleSelectCompany(user);
                  }}
                >
                  {user.company} - {user.emailId}
                </li>
              ))}
            </ul>
          )}
        </motion.div>
        <motion.div className="bg-white p-4 shadow-md rounded-md">
          <h2 className="text-lg font-bold text-[#1E40AF] text-center mb-3">
            Call Register
          </h2>

          {/* Responsive Grid for Input Fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { label: "Company", key: "company" },
              { label: "Contact Person", key: "contactPerson" },
              { label: "Email ID", key: "emailId" },
              { label: "Mobile Number 1", key: "mobileNumber1" },
              { label: "Mobile Number 2", key: "mobileNumber2" },
              { label: "Address", key: "address" },
              { label: "Site", key: "site" },
              { label: "City", key: "city" },
              { label: "State", key: "state" },
              { label: "GST Number", key: "gstNumber" },
              { label: "Referred By", key: "referredBy" },
              { label: "Customer Type", key: "customerType" },
              { label: "Closing Balance", key: "closingBalance" },
            ].map((field) => (
              <div
                key={field.key}
                className="flex flex-col md:flex-row md:items-center md:space-x-2"
              >
                <label className="text-gray-700 font-semibold text-xs md:w-32">
                  {field.label}
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#1E40AF] text-sm"
                  value={
                    selectedCompany ? selectedCompany[field.key] || "" : ""
                  }
                  readOnly
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Production Info Form */}
        <motion.div className="bg-white p-4 shadow-md rounded-md">
          <h2 className="text-lg font-bold text-[#1E40AF] text-center mb-2">
            Production Info
          </h2>

          {/* Input Fields (Responsive Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { label: "Serial No", key: "serialNo" },
              {
                label: "TSS Renewal Date",
                key: "tssRenewalDate",
                type: "date",
              },
              {
                label: "AMC Expired Date",
                key: "amcExpiredDate",
                type: "date",
              },
              { label: "Product Type", key: "productType" },
            ].map((field) => (
              <div
                key={field.key}
                className="flex flex-col md:flex-row md:items-center md:space-x-2"
              >
                <label className="text-gray-700 font-semibold text-xs w-32">
                  {field.label}
                </label>
                <input
                  type={field.type || "text"}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#1E40AF] text-sm"
                  value={
                    selectedCompany ? selectedCompany[field.key] || "" : ""
                  }
                  readOnly
                />
              </div>
            ))}
          </div>

          {/* Toggle Buttons (Responsive Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
            {[
              { label: "AWS?", key: "aws" },
              { label: "Whatsapp?", key: "whatsapp" },
              { label: "AMC?", key: "amc" },
              { label: "TDL Loaded?", key: "tdlLoaded" },
            ].map((field) => (
              <div
                key={field.key}
                className="flex items-center justify-between p-2 border border-gray-300 rounded-md"
              >
                <span className="text-xs font-medium">{field.label}</span>
                <button
                  className={`w-10 h-5 flex items-center rounded-full p-0.5 transition-colors duration-300 ${
                    selectedCompany?.[field.key]
                      ? "bg-green-500"
                      : "bg-gray-400"
                  }`}
                >
                  <motion.div
                    className="w-4 h-4 bg-white rounded-full shadow-md"
                    animate={{ x: selectedCompany?.[field.key] ? 20 : 0 }}
                  />
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      <div className="bg-white p-3 shadow-md rounded-md w-full mt-20 max-w-7xl">
        {showTickets && (
          <h2 className="text-lg font-bold text-[#1E40AF] text-center mb-3">
            Ticket Table
          </h2>
        )}

        {/* ✅ Enable scrolling on mobile */}
        {showTickets && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-sm min-w-[600px]">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 p-2">Ticket No</th>
                  <th className="border border-gray-300 p-2">Date</th>
                  <th className="border border-gray-300 p-2">User</th>
                  <th className="border border-gray-300 p-2">Challenge</th>
                  <th className="border border-gray-300 p-2">Solution</th>
                  <th className="border border-gray-300 p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {/* First Row - User Input */}
                <tr className="bg-white">
                  {[
                    {
                      name: "ticketNumber",
                      type: "number",
                      value: newTicket.ticketNumber,
                    },
                    { name: "date", type: "date" },
                    { name: "user", type: "text", value: userName },
                    { name: "challenge", type: "text" },
                    { name: "solution", type: "text" },
                  ].map((field, index) => (
                    <td key={index} className="border border-gray-300 p-2">
                      <input
                        type={field.type}
                        name={field.name}
                        value={
                          field.value ? field.value : newTicket[field.name]
                        }
                        disabled={field.value || field.name == "solution"}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                      />
                    </td>
                  ))}
                  <td className="border border-gray-300 p-2 text-center">
                    <button
                      onClick={handleAddTicket}
                      className="bg-[#1E40AF] text-white px-4 py-1.5 rounded-md hover:bg-[#F59E0B] transition"
                    >
                      Create
                    </button>
                  </td>
                </tr>

                {/* Dynamically Added Rows */}
                {ticketData.map((ticket, index) => (
                  <tr key={index} className="bg-white">
                    <td className="border border-gray-300 p-2 text-center">
                      {ticket.ticketNumber}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {ticket.date}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {ticket.user}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {ticket.challenge}
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="text"
                        value={ticket.solution}
                        onChange={(e) =>
                          handleSolutionChange(index, e.target.value)
                        }
                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                        disabled={ticket.solvedDate}
                      />
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {ticket.solution && ticket.solvedDate ? (
                        <span className="text-green-500 font-bold text-lg">
                          ✔ <span>{ticket.solvedDate.slice(0, 10)}</span>
                        </span>
                      ) : (
                        <button
                          onClick={() => handleCloseTicket(index)}
                          className="bg-red-500 text-white px-4 py-1.5 rounded-md hover:bg-red-600 transition cursor-pointer"
                        >
                          Close
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Callregister;
