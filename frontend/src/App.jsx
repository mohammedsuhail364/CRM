import { Routes, Route, Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { Toaster } from "react-hot-toast";
import Navbar from "./Components/Navbar";
import ScrollToTop from "./Components/ScrollToTop";

import Home from "./Components/Home";
import Features from "./Pages/Features";
import Pricing from "./Pages/Pricing";
import Contact from "./Pages/Contact";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

import Dashboard from "./Pages/Dashboard";
import Callregister from "./Pages/Callregister";
import Tickets from "./Pages/Tickets";
import CreateCustomer from "./Pages/CreateCustomer";

import AdminDashboard from "./Pages/AdminDashboard";
import EmployeesPage from "./Pages/EmployeesPage";
import TicketsPage from "./Pages/TicketsPage";
import OpenAndCloseTicketsPage from "./Pages/OpenAndCloseTicketsPage";
import EmployeeCustomerDetails from "./Pages/EmployeeCustomerDetails";
import CreateEmployee from "./Pages/CreateEmployee";
import { PageLoader } from "./Components/PageLoader";

const App = () => {
  const { isSignedIn, isLoaded, user } = useUser();

  if (!isLoaded) return <PageLoader label="Loading..." />;

  const role = user?.publicMetadata?.role; // "admin" | "user"
  console.log(user);
  

  return (
    <>
      <Navbar />
      <ScrollToTop />

      <Routes>
        {/* ---------- PUBLIC ROUTES ---------- */}
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />

        {/* ---------- AUTH ROUTES ---------- */}
        <Route
          path="/login/*"
          element={!isSignedIn ? <Login /> : <Navigate to="/dashboard" replace />}
        />
        <Route
          path="/signup/*"
          element={!isSignedIn ? <Signup /> : <Navigate to="/dashboard" replace />}
        />

        {/* ---------- USER ROUTES ---------- */}
        <Route
          path="/dashboard"
          element={isSignedIn ? <Dashboard /> : <Navigate to="/" replace />}
        />
        <Route
          path="/callregister"
          element={isSignedIn ? <Callregister /> : <Navigate to="/" replace />}
        />
        <Route
          path="/tickets"
          element={isSignedIn ? <Tickets /> : <Navigate to="/" replace />}
        />
        <Route
          path="/create-customers"
          element={isSignedIn ? <CreateCustomer /> : <Navigate to="/" replace />}
        />

        {/* ---------- ADMIN ROUTES ---------- */}
        <Route
          path="/admin"
          element={
            isSignedIn && role === "admin"
              ? <AdminDashboard />
              : <Navigate to="/" replace />
          }
        />
        <Route
          path="/admin/employees"
          element={
            isSignedIn && role === "admin"
              ? <EmployeesPage />
              : <Navigate to="/" replace />
          }
        />
        <Route
          path="/admin/create-employee"
          element={
            isSignedIn && role === "admin"
              ? <CreateEmployee />
              : <Navigate to="/" replace />
          }
        />
        <Route
          path="/admin/tickets"
          element={
            isSignedIn && role === "admin"
              ? <TicketsPage />
              : <Navigate to="/" replace />
          }
        />
        <Route
          path="/admin/tickets/get"
          element={
            isSignedIn && role === "admin"
              ? <OpenAndCloseTicketsPage />
              : <Navigate to="/" replace />
          }
        />
        <Route
          path="/admin/employees/:id/customers"
          element={
            isSignedIn && role === "admin"
              ? <EmployeeCustomerDetails />
              : <Navigate to="/" replace />
          }
        />

        {/* ---------- FALLBACK ---------- */}
        <Route path="*" element={<Navigate to="/" replace />} />
        
      </Routes>
      <Toaster
        toastOptions={{
          duration: 3000,
        }}
      />
    </>
  );
};

export default App;
