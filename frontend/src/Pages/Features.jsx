import { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";

const featuresData = [
  {
    title: "Minimal UI",
    description: "Effortless & intuitive, simsERP POS keeps it simple. No clutter—just the essentials to run your business smoothly.",
    icon: "🎯"
  },
  {
    title: "POS System",
    description: "simsERP POS simplifies sales. Manage orders, categories. Send to kitchen instantly & accept payments securely.",
    icon: "💳"
  },
  {
    title: "Live Updates",
    description: "Kitchen in Sync. Live order updates send details directly to your kitchen, ensuring accuracy and minimizing prep time.",
    icon: "⚡"
  },
  {
    title: "Inventory Tracking",
    description: "Real-time stock monitoring. Get alerts on low inventory and automate reordering to never run out of supplies.",
    icon: "📦"
  },
  {
    title: "Customer Analytics",
    description: "Understand your customers better. Track purchase patterns, preferences, and loyalty to boost retention.",
    icon: "📊"
  },
  {
    title: "Multi-Location Support",
    description: "Manage multiple outlets from one dashboard. Centralized control with location-specific customization.",
    icon: "🏪"
  }
];

const Features = () => {
  const { setCompanyName } = useAuth();
  
  useEffect(() => {
    setCompanyName(null);
  }, []);

  return (
    <section className="mt-5 relative bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen flex flex-col items-center justify-center py-16 px-6">
      {/* Header */}
      <div className="text-center mb-16 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-blue-700 to-amber-500 bg-clip-text text-transparent mb-4">
          Powerful Features for Modern Businesses
        </h1>
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
          Everything you need to streamline operations and drive growth
        </p>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featuresData.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 p-6 border-b-4 border-blue-700 hover:border-amber-500 hover:-translate-y-1"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-blue-700 group-hover:text-amber-500 transition-colors duration-300 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-16 text-center max-w-3xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border-t-4 border-blue-700">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-gray-600 mb-6 text-lg">
            Join thousands of businesses already using simsERP to streamline their operations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl">
              Start Free Trial
            </button>
            <button className="bg-white hover:bg-gray-50 text-blue-700 font-semibold px-8 py-3 rounded-lg border-2 border-blue-700 transition-colors duration-300">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl w-full">
        <div className="text-center">
          <div className="text-3xl md:text-4xl font-bold text-blue-700 mb-2">10K+</div>
          <div className="text-gray-600 text-sm md:text-base">Active Users</div>
        </div>
        <div className="text-center">
          <div className="text-3xl md:text-4xl font-bold text-blue-700 mb-2">99.9%</div>
          <div className="text-gray-600 text-sm md:text-base">Uptime</div>
        </div>
        <div className="text-center">
          <div className="text-3xl md:text-4xl font-bold text-blue-700 mb-2">24/7</div>
          <div className="text-gray-600 text-sm md:text-base">Support</div>
        </div>
        <div className="text-center">
          <div className="text-3xl md:text-4xl font-bold text-blue-700 mb-2">50+</div>
          <div className="text-gray-600 text-sm md:text-base">Integrations</div>
        </div>
      </div>

      {/* Tagline */}
      <div className="mt-12">
        <p className="text-xl md:text-2xl font-semibold text-gray-700 italic">
          Simplicity meets functionality – effortless solutions for every business.
        </p>
      </div>
    </section>
  );
};

export default Features;