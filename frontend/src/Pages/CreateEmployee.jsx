import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const CreateEmployee = () => {
  const navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState({
    userName: "",
    userEmail: "",
    password: "",
    role: "user",
    totalTickets: 0,
    tickets: {},
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loader state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({
      ...employeeData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!employeeData.userName || !employeeData.userEmail || !employeeData.password) {
      setError("All fields are required!");
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.post("/admin/create-employee", employeeData);
      if (response.status === 201) {
        navigate("/admin/employees");
      }
    } catch (err) {
      setError("Failed to create employee. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6">
      <h1 className="text-4xl font-bold text-[#1E40AF] text-center mb-10">Create Employee</h1>

      <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg">
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="userName" className="block text-lg font-semibold text-gray-700">
              User Name
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={employeeData.userName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg mt-2"
              placeholder="Enter username"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="userEmail" className="block text-lg font-semibold text-gray-700">
              User Email
            </label>
            <input
              type="email"
              id="userEmail"
              name="userEmail"
              value={employeeData.userEmail}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg mt-2"
              placeholder="Enter email"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-lg font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={employeeData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg mt-2"
              placeholder="Enter password"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="role" className="block text-lg font-semibold text-gray-700">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={employeeData.role}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg mt-2"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="mb-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white p-3 rounded-lg font-semibold cursor-pointer transition-colors ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#4FD1C5]"
              }`}
            >
              {loading ? (
                <span className="flex justify-center items-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Creating...
                </span>
              ) : (
                "Create Employee"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEmployee;
