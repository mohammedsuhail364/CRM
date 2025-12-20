import  { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../Context/AuthContext";

const featuresData = [
  {
    title: "Minimal UI",
    description:
     "Effortless & intuitive, simsERP POS keeps it simple. No clutter—just the essentials to run your business smoothly.",
  },
  {
    title: "POS",
    description:
      "simsERP POS simplifies sales. Manage orders, categories . Send to kitchen instantly & accept payments securely. All-in-one for a smooth flow.",
  },
  {
    title: "Live Updates",
    description:
      "Kitchen in Sync, Never miss a beat. Live order updates send details directly to your kitchen, ensuring accuracy and minimizing prep time.",
  },
];

const Features = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const {setCompanyName}=useAuth();
  useEffect(()=>{
      setCompanyName(null)
    },[])
  return (
    <section className="relative bg-[#F8FAFC] min-h-screen flex flex-col items-center justify-center p-12 px-6">
      {/* Large Screen Section */}
      <div className="hidden md:block w-full">
        <div className="text-center mb-12">
          <motion.h1
            className="text-6xl font-extrabold tracking-wide uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#1E40AF] to-[#F59E0B]"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Discover Our Features
          </motion.h1>
          <motion.p
            className="mt-4 text-lg max-w-3xl mx-auto text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            Explore the powerful tools that make simsERP an essential solution for your business growth.
          </motion.p>
        </div>
        <div className="container mx-auto grid grid-cols-3 gap-8">
          {featuresData.map((feature, index) => (
            <motion.div
              key={index}
              className="relative bg-white shadow-xl rounded-xl text-center border-b-4 border-[#1E40AF] transition-all duration-500 hover:shadow-2xl hover:border-[#F59E0B] p-8"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <motion.h3
                className="text-3xl font-semibold text-black transition-all duration-500"
                animate={{ color: hoveredIndex === index ? "#F59E0B" : "#1E40AF" }}
              >
                {feature.title}
              </motion.h3>
              <motion.div
  className="absolute inset-0 bg-[#F8FAFC] opacity-90 rounded-xl p-6 flex items-center justify-center text-gray-700"
  initial={{ opacity: 0, scale: 0.9, padding: "1.5rem" }} // Smaller padding initially
  animate={
    hoveredIndex === index
      ? { opacity: 1, scale: window.innerWidth >= 768 ? 1.1 : 1.05, padding: "2.5rem" } // Increased scale & padding
      : { opacity: 0, scale: 0.9, padding: "1.5rem" }
  }
  transition={{ duration: 0.5, ease: "easeInOut" }} // Smoother transition
>
  <motion.p
    className="text-lg font-medium text-gray-800"
    initial={{ opacity: 0, y: 10 }} // Fade in + slight slide up
    animate={hoveredIndex === index ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
    transition={{ duration: 0.3, ease: "easeOut", delay: 0.2 }} // Delayed effect for better feel
  >
    {feature.description}
  </motion.p>
</motion.div>


            </motion.div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 italic">
            `Simplicity meets functionality{ "–"} effortless solutions for every business{"."}`
          </p>
        </div>

      </div>

      {/* Mobile Screen Section */}
      <div className="block md:hidden w-full">
        <div className="text-center mb-8 pt-16">
          <motion.h1
            className="text-3xl font-extrabold tracking-wide uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#1E40AF] to-[#F59E0B]"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Features
          </motion.h1>
          <motion.p
            className="mt-2 text-base max-w-md mx-auto text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            SimsERP provides essential tools to grow your business.
          </motion.p>
        </div>
        <div className="container mx-auto grid grid-cols-1 gap-6">
          {featuresData.map((feature, index) => (
            <motion.div
              key={index}
              className="relative bg-white shadow-md rounded-lg text-center border-b-2 border-[#1E40AF] transition-all duration-500 hover:shadow-lg hover:border-[#F59E0B] p-4"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <motion.h3
                className="text-xl font-semibold text-black transition-all duration-500"
                animate={{ color: hoveredIndex === index ? "#F59E0B" : "#1E40AF" }}
              >
                {feature.title}
              </motion.h3>
              <p className="text-base text-gray-700 mt-2">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
