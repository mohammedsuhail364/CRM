import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";


const CustomerDetailsForm = () => {
  // State to manage form inputs
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isNewCustomer, setIsNewCustomer] = useState(true);
  const { isLoaded, user } = useUser();
  const [formData, setFormData] = useState({
    company: "",
    contactPerson: "",
    emailId: "",
    mobileNumber1: "",
    mobileNumber2: "",
    address: "",
    site: "",
    city: "",
    state: "",
    gstNumber: "",
    referredBy: "",
    customerType: "",
    closingBalance: "",
    serialNo: "",
    tssRenewalDate: new Date(),
    amcExpiredDate: (() => {
      const now = new Date();
      const year = now.getFullYear() + 1;
      const month = now.getMonth() + 1; // next year's same month
      return new Date(year, month, 0); // 0 gives last day of previous month
    })(),
    productType: "",
    aws: false,
    whatsapp: false,
    amc: false,
    tdlLoaded: false,
  });

  // Function to get the last day of the month for a given date string
  const getEndOfMonthDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are 0-indexed
    const lastDay = new Date(year, month, 0).getDate();
    return `${year}-${String(month).padStart(2, "0")}-${String(
      lastDay
    ).padStart(2, "0")}`;
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // For date fields, adjust to end of month when month/year changes
    if ((name === "tssRenewalDate" || name === "amcExpiredDate") && value) {
      const endOfMonthDate = getEndOfMonthDate(value);
      setFormData({
        ...formData,
        [name]: endOfMonthDate,
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };
  if (!isLoaded) return <PageLoader label="Loading..." />;
  useEffect(() => {
    const role = user?.publicMetadata?.role || "user";
    if (role === "admin") {
        navigate("/admin");
    }
  }, []);

  // Set default AMC and TSS dates when customer type changes
  useEffect(() => {
    if (!isNewCustomer) {
      setFormData((prev) => ({
        ...prev,
        tssRenewalDate: "",
        amcExpiredDate: "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        tssRenewalDate: new Date(),
        amcExpiredDate: (() => {
          const now = new Date();
          const year = now.getFullYear() + 1;
          const month = now.getMonth() + 1; // next year's same month
          return new Date(year, month, 0); // 0 gives last day of previous month
        })(),
      }));
    }
  }, [isNewCustomer]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Form Data:", formData);

    try {
      const response = await axiosInstance.post(
        "/employee/create-customers",
        formData
      );

      if (response.data.success) {
        alert("Form submitted successfully!");
        setFormData({
          company: "",
          contactPerson: "",
          emailId: "",
          mobileNumber1: "",
          mobileNumber2: "",
          address: "",
          site: "",
          city: "",
          state: "",
          gstNumber: "",
          referredBy: "",
          customerType: "",
          closingBalance: "",
          serialNo: "",
          tssRenewalDate: "",
          amcExpiredDate: "",
          productType: "",
          aws: false,
          whatsapp: false,
          amc: false,
          tdlLoaded: false,
        });
        setIsNewCustomer(true);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  console.log({formData});
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 shadow-md rounded-md w-full max-w-4xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-[#1E40AF] text-center mb-6 mt-16">
        Customer Details Form
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Responsive Grid for Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Company Details */}
          <div className="space-y-4">
            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold text-sm mb-1">
                Company
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#1E40AF] text-sm"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold text-sm mb-1">
                Contact Person
              </label>
              <input
                type="text"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#1E40AF] text-sm"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold text-sm mb-1">
                Email ID
              </label>
              <input
                type="email"
                name="emailId"
                value={formData.emailId}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#1E40AF] text-sm"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold text-sm mb-1">
                Mobile Number 1
              </label>
              <input
                type="text"
                name="mobileNumber1"
                value={formData.mobileNumber1}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#1E40AF] text-sm"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold text-sm mb-1">
                Mobile Number 2
              </label>
              <input
                type="text"
                name="mobileNumber2"
                value={formData.mobileNumber2}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#1E40AF] text-sm"
              />
            </div>
          </div>

          {/* Address and Other Details */}
          <div className="space-y-4">
            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold text-sm mb-1">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#1E40AF] text-sm"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold text-sm mb-1">
                Site
              </label>
              <input
                type="text"
                name="site"
                value={formData.site}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#1E40AF] text-sm"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold text-sm mb-1">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#1E40AF] text-sm"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold text-sm mb-1">
                State
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#1E40AF] text-sm"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold text-sm mb-1">
                GST Number
              </label>
              <input
                type="text"
                name="gstNumber"
                value={formData.gstNumber}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#1E40AF] text-sm"
              />
            </div>
          </div>
        </div>

        {/* Additional Details Section */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold text-sm mb-1">
              Referred By
            </label>
            <input
              type="text"
              name="referredBy"
              value={formData.referredBy}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#1E40AF] text-sm"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold text-sm mb-1">
              Closing Balance
            </label>
            <input
              type="text"
              name="closingBalance"
              value={formData.closingBalance}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#1E40AF] text-sm"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold text-sm mb-1">
              Serial No
            </label>
            <input
              type="text"
              name="serialNo"
              value={formData.serialNo}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#1E40AF] text-sm"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold text-sm mb-1">
              Product Type
            </label>
            <input
              type="text"
              name="productType"
              value={formData.productType}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#1E40AF] text-sm"
            />
          </div>
        </div>

        {/* Customer Status Toggle - Flipped direction */}
        <div className="mt-6 flex items-center justify-between p-4 bg-gray-50 rounded-md">
          <span className="text-sm font-medium">Is this a new customer?</span>
          <button
            type="button"
            onClick={() => setIsNewCustomer(!isNewCustomer)}
            className={`w-16 h-8 flex items-center rounded-full p-1 transition-colors duration-300 ${
              isNewCustomer ? "bg-green-500" : "bg-gray-400"
            }`}
          >
            <motion.div
              className="w-6 h-6 bg-white rounded-full shadow-md"
              animate={{ x: isNewCustomer ? 32 : 0 }}
            />
          </button>
        </div>

        {/* Production Info Section - Only show for non-new customers */}
        {!isNewCustomer && (
          <div className="mt-6">
            <h3 className="text-lg font-bold text-[#1E40AF] mb-4">
              Production Info
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-gray-700 font-semibold text-sm mb-1">
                  TSS Renewal Date (End of Month)
                </label>
                <input
                  type="date"
                  name="tssRenewalDate"
                  value={formData.tssRenewalDate}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#1E40AF] text-sm"
                />
                {formData.tssRenewalDate && (
                  <p className="text-xs text-gray-500 mt-1">
                    Automatically set to end of month
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label className="text-gray-700 font-semibold text-sm mb-1">
                  AMC Expired Date (End of Month)
                </label>
                <input
                  type="date"
                  name="amcExpiredDate"
                  value={formData.amcExpiredDate}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#1E40AF] text-sm"
                />
                {formData.amcExpiredDate && (
                  <p className="text-xs text-gray-500 mt-1">
                    Automatically set to end of month
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Toggle Buttons Section */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <span className="text-sm font-medium">{field.label}</span>
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    [field.key]: !formData[field.key],
                  })
                }
                className={`w-10 h-5 flex items-center rounded-full p-0.5 transition-colors duration-300 ${
                  formData[field.key] ? "bg-green-500" : "bg-gray-400"
                }`}
              >
                <motion.div
                  className="w-4 h-4 bg-white rounded-full shadow-md"
                  animate={{ x: formData[field.key] ? 20 : 0 }}
                />
              </button>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            className="px-6 py-2 bg-[#1E40AF] text-white rounded-md text-sm font-semibold transition hover:bg-[#F59E0B]"
            disabled={loading}
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default CustomerDetailsForm;
