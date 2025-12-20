import { motion } from "framer-motion";
import { useEffect } from "react";
import { useAuth } from "../Context/AuthContext";

const pricingPlans = [
  {
    name: "Basic",
    price: "₹1",
    duration: "per month",
    features: [
      "Unlimited Orders",
      "Monthly Renewals",
      "Unlimited Devices",
      "Live Kitchen Orders",
    ],
  },
  {
    name: "Pro",
    price: "₹499",
    duration: "per month",
    features: [
      "All Basic Features",
      "Advanced Analytics",
      "Priority Support",
      "Custom Reports",
    ],
  },
  {
    name: "Premium",
    price: "₹999",
    duration: "per month",
    features: [
      "All Pro Features",
      "Dedicated Account Manager",
      "API Access",
      "Premium Support",
    ],
  },
];

const Pricing = () => {
  const {setCompanyName}=useAuth();
  useEffect(()=>{
      setCompanyName(null)
    },[])
  return (
    <section className="bg-[#F8FAFC] min-h-screen flex flex-col items-center justify-center p-12">
      <div className="text-center mb-12">
        <motion.h1
          className="text-6xl font-extrabold tracking-wide uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#1E40AF] to-[#F59E0B] mt-24"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Choose Your Plan
        </motion.h1>
        <motion.p
          className="mt-4 text-lg max-w-3xl mx-auto text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          Get the best value for your business with our flexible pricing options.
        </motion.p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {pricingPlans.map((plan, index) => (
          <motion.div
            key={index}
            className="relative bg-white shadow-xl rounded-xl text-center p-8 border-4 border-[#1E40AF] transition-all duration-500 hover:shadow-2xl hover:border-[#F59E0B]"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-3xl font-bold text-[#1E40AF] mb-4">{plan.name}</h3>
            <p className="text-4xl font-extrabold text-gray-900">{plan.price}</p>
            <p className="text-gray-600 mb-6">{plan.duration}</p>
            <ul className="text-gray-700 mb-6 space-y-2">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center justify-center">
                  ✅ {feature}
                </li>
              ))}
            </ul>
            <button className="mt-4 bg-[#1E40AF] text-white px-6 py-2 rounded-lg hover:bg-[#F59E0B] transition-all">
              Get Started
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
