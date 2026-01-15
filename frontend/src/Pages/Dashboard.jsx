import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAuth } from "../Context/AuthContext";
import axiosInstance from "../api/axiosInstance";
import { PlusCircle } from "lucide-react";
import { useUser } from "@clerk/clerk-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { isLoaded, isSignedIn, user } = useUser();
  const location = useLocation();
  const [showFloatingTab, setShowFloatingTab] = useState(true);
  let lastScrollY = window.scrollY;

  const token = sessionStorage.getItem("token");
  const { setCompanyName } = useAuth();

  const [openTickets, setOpenTickets] = useState([]);
  const [openTicketsCount, setOpenTicketsCount] = useState(0);
  const [closedTickets, setClosedTickets] = useState(0);
  const [repeatedCustomers, setRepeatedCustomers] = useState([]);

  const pendingTickets = openTicketsCount - closedTickets;
  // prevent flicker
  if (!isLoaded) return <PageLoader label="Loading..." />;
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowFloatingTab(false);
      } else {
        setShowFloatingTab(true);
      }
      lastScrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  async function collectTicketDetails() {
    if (!user) return;
    const userEmail = user.emailAddresses[0].emailAddress;
    console.log(user, "suhail");

    const response = await axiosInstance.get("/employee/get-ticket-details", {
      params: { userEmail },
    });
    if (response.data.success) {
      setOpenTicketsCount(response.data.openTickets);
      setClosedTickets(response.data.closedTickets);
      setOpenTickets(response.data.tickets);
      setRepeatedCustomers(response.data.repeatedCustomer);
    }
  }

  useEffect(() => {
    if (isSignedIn) {
      const role = user?.publicMetadata?.role || "user";
      if (role === "admin") {
        navigate("/admin");
      } else {
        setCompanyName(null);
        collectTicketDetails();
      }
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#F8FAFC] pt-16">
      {/* Floating Tab - positioned below navbar */}
      {showFloatingTab && (
        <div className="bg-white shadow-lg rounded-full flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 md:space-x-6 p-2 sm:p-3 px-4 sm:px-6 md:px-8 fixed top-20 sm:top-20 border-2 border-[#F59E0B] z-40 max-w-[90vw] sm:max-w-none">
          <button
            className={`py-2 px-4 sm:px-6 rounded-full font-semibold transition-all text-sm sm:text-base ${
              location.pathname === "/dashboard"
                ? "bg-[#1E40AF] text-white"
                : "hover:bg-gray-200"
            }`}
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>
          <button
            className={`py-2 px-4 sm:px-6 rounded-full font-semibold transition-all text-sm sm:text-base ${
              location.pathname === "/callregister"
                ? "bg-[#1E40AF] text-white"
                : "hover:bg-gray-200"
            }`}
            onClick={() => navigate("/callregister")}
          >
            Call Register
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className="w-full px-3 sm:px-4 md:px-6">
        {/* Main Section */}
        <div className="w-full max-w-6xl mx-auto mt-20 sm:mt-24 md:mt-28 flex flex-col lg:flex-row items-center gap-6 sm:gap-8">
          {/* Left Text Section */}
          <div className="lg:w-1/2 w-full text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1E40AF]">
              Welcome to the Dashboard
            </h1>
            <p className="text-base sm:text-lg text-gray-700 mt-2">
              Hello, User!
            </p>
            <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <button
                className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 bg-[#F59E0B] text-white rounded-full shadow-lg hover:bg-[#1E40AF] transition text-sm sm:text-base"
                onClick={() => navigate("/tickets")}
              >
                Show My Records
              </button>
              <button
                className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 bg-[#1E40AF] text-white rounded-full shadow-lg hover:bg-[#F59E0B] transition flex items-center justify-center text-sm sm:text-base"
                onClick={() => navigate("/callregister")}
              >
                <PlusCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Add Ticket
              </button>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="lg:w-1/2 w-full">
            <img
              src={assets.Dash}
              alt="Dashboard"
              className="w-full rounded-xl shadow-lg"
            />
          </div>
        </div>

        {/* Ticket Record Stats */}
        <div
          id="records-section"
          className="w-full max-w-6xl mx-auto mt-8 sm:mt-10"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center">
            <div className="bg-[#1E40AF] p-4 sm:p-6 rounded-xl shadow-lg text-white">
              <h2 className="text-lg sm:text-xl font-semibold">Open Tickets</h2>
              <p className="text-3xl sm:text-4xl font-bold mt-1">
                {openTicketsCount}
              </p>
            </div>
            <div className="bg-[#F59E0B] p-4 sm:p-6 rounded-xl shadow-lg text-white">
              <h2 className="text-lg sm:text-xl font-semibold">Closed Today</h2>
              <p className="text-3xl sm:text-4xl font-bold mt-1">
                {closedTickets}
              </p>
            </div>
            <div className="bg-[#1E40AF] p-4 sm:p-6 rounded-xl shadow-lg text-white">
              <h2 className="text-lg sm:text-xl font-semibold">
                Pending Tickets
              </h2>
              <p className="text-3xl sm:text-4xl font-bold mt-1">
                {pendingTickets}
              </p>
            </div>
            <div className="bg-[#F59E0B] p-4 sm:p-6 rounded-xl shadow-lg text-white">
              <h2 className="text-lg sm:text-xl font-semibold">
                Repeated Companies
              </h2>
              <p className="text-3xl sm:text-4xl font-bold mt-1">
                {repeatedCustomers.length}
              </p>
            </div>
          </div>

          {/* Open Tickets List */}
          <div className="mt-8 sm:mt-10 bg-white p-4 sm:p-6 rounded-xl shadow-lg mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-[#1E40AF] mb-4 border-b-2 border-[#F59E0B] pb-2">
              Open Tickets (Today)
            </h2>
            {openTickets.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {openTickets.map((ticket) => (
                  <div
                    key={ticket.ticketNumber}
                    className="p-4 sm:p-6 border-2 border-[#F59E0B] rounded-lg shadow-md bg-gray-100"
                  >
                    <h3 className="text-base sm:text-lg font-medium text-gray-900">
                      Ticket {ticket.ticketNumber}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 mt-1">
                      Challenge: {ticket.challenge}
                    </p>
                    <p className="text-sm sm:text-base text-gray-600">
                      Date: {ticket.date}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">
                No open tickets for today
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
