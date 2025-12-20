import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets"; 

const Home = () => {
  const navigate = useNavigate();

  return (
    <section className="relative bg-[#F8FAFC] min-h-screen flex items-center justify-center px-6 py-12 md:px-12 pt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl items-center">
        
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1E40AF] leading-tight">
          Simplify Accounting<br className="hidden md:block" />  Maximize Efficiency &  Elevate Growth with Tally.
          </h1>
          <p className="mt-4 text-base md:text-lg text-gray-700 max-w-lg mx-auto md:mx-0">
          Your Business, Your Numbers {"–"} Seamless Accounting with Tally.
          Effortless Accounting. Powerful Insights. Tally ERP for Success.
          </p>
          <div className="mt-6 flex flex-col md:flex-row items-center justify-center md:justify-start space-y-4 md:space-y-0 md:space-x-4">
            <button 
              onClick={() => navigate("/login")} 
              className="px-6 py-3 bg-[#1E40AF] text-white font-semibold rounded-lg shadow-lg hover:bg-[#F59E0B] transition"
            >
              Get Started
            </button>
          </div>
        </motion.div>

        {/* Right Image Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <img
            src={assets.Home}
            alt="POS System"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md drop-shadow-lg rounded-lg"
          />
        </motion.div>

      </div>
    </section>
  );
};

export default Home;
