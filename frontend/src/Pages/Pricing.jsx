import { useEffect } from "react";
import { useAuth } from "../Context/AuthContext";

const pricingPlans = [
  {
    name: "Basic",
    price: "₹1",
    duration: "per month",
    description: "Perfect for small businesses getting started",
    features: [
      "Unlimited Orders",
      "Monthly Renewals",
      "Unlimited Devices",
      "Live Kitchen Orders",
      "Basic Reports",
      "Email Support"
    ],
    popular: false,
  },
  {
    name: "Pro",
    price: "₹499",
    duration: "per month",
    description: "Best for growing businesses",
    features: [
      "All Basic Features",
      "Advanced Analytics",
      "Priority Support",
      "Custom Reports",
      "Inventory Management",
      "Customer Database"
    ],
    popular: true,
  },
  {
    name: "Premium",
    price: "₹999",
    duration: "per month",
    description: "Enterprise-grade solution",
    features: [
      "All Pro Features",
      "Dedicated Account Manager",
      "API Access",
      "Premium 24/7 Support",
      "Multi-Location Management",
      "White-Label Options"
    ],
    popular: false,
  },
];

const Pricing = () => {
  const { setCompanyName } = useAuth();
  
  useEffect(() => {
    setCompanyName(null);
  }, []);

  return (
    <section className="bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen flex flex-col items-center justify-center py-16 px-6">
      {/* Header */}
      <div className="text-center mb-16 max-w-4xl pt-12">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-blue-700 to-amber-500 bg-clip-text text-transparent mb-4">
          Simple, Transparent Pricing
        </h1>
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
          Choose the perfect plan for your business. All plans include our core features with no hidden fees.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-8 max-w-7xl w-full mb-16">
        {pricingPlans.map((plan, index) => (
          <div
            key={index}
            className={`relative bg-white rounded-2xl text-center p-8 border-2 transition-all duration-300 hover:-translate-y-2 shadow-lg hover:shadow-2xl ${
              plan.popular
                ? "border-amber-500 ring-4 ring-amber-500 ring-opacity-50"
                : "border-blue-700 hover:border-amber-500"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-1 rounded-full text-sm font-semibold shadow-lg">
                  Most Popular
                </span>
              </div>
            )}

            <h3 className="text-3xl font-bold text-blue-700 mb-2">{plan.name}</h3>
            <p className="text-gray-500 text-sm mb-6">{plan.description}</p>
            
            <div className="mb-6">
              <span className="text-5xl font-extrabold text-gray-900">{plan.price}</span>
              <span className="text-gray-600 ml-2">{plan.duration}</span>
            </div>

            <ul className="text-left text-gray-700 mb-8 space-y-3">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-green-500 mr-3 text-lg">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                plan.popular
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-lg hover:shadow-xl"
                  : "bg-blue-700 text-white hover:bg-blue-800 shadow-md hover:shadow-lg"
              }`}
            >
              Get Started
            </button>
          </div>
        ))}
      </div>

      {/* Comparison Table */}
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl p-8 mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Feature Comparison
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-4 px-4 text-gray-700 font-semibold">Feature</th>
                <th className="text-center py-4 px-4 text-gray-700 font-semibold">Basic</th>
                <th className="text-center py-4 px-4 text-gray-700 font-semibold">Pro</th>
                <th className="text-center py-4 px-4 text-gray-700 font-semibold">Premium</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-gray-50">
                <td className="py-4 px-4 text-gray-700">Unlimited Orders</td>
                <td className="text-center py-4 px-4 text-green-500 text-xl">✓</td>
                <td className="text-center py-4 px-4 text-green-500 text-xl">✓</td>
                <td className="text-center py-4 px-4 text-green-500 text-xl">✓</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-4 px-4 text-gray-700">Live Kitchen Orders</td>
                <td className="text-center py-4 px-4 text-green-500 text-xl">✓</td>
                <td className="text-center py-4 px-4 text-green-500 text-xl">✓</td>
                <td className="text-center py-4 px-4 text-green-500 text-xl">✓</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-4 px-4 text-gray-700">Advanced Analytics</td>
                <td className="text-center py-4 px-4 text-gray-300 text-xl">–</td>
                <td className="text-center py-4 px-4 text-green-500 text-xl">✓</td>
                <td className="text-center py-4 px-4 text-green-500 text-xl">✓</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-4 px-4 text-gray-700">Inventory Management</td>
                <td className="text-center py-4 px-4 text-gray-300 text-xl">–</td>
                <td className="text-center py-4 px-4 text-green-500 text-xl">✓</td>
                <td className="text-center py-4 px-4 text-green-500 text-xl">✓</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-4 px-4 text-gray-700">API Access</td>
                <td className="text-center py-4 px-4 text-gray-300 text-xl">–</td>
                <td className="text-center py-4 px-4 text-gray-300 text-xl">–</td>
                <td className="text-center py-4 px-4 text-green-500 text-xl">✓</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-4 px-4 text-gray-700">Dedicated Account Manager</td>
                <td className="text-center py-4 px-4 text-gray-300 text-xl">–</td>
                <td className="text-center py-4 px-4 text-gray-300 text-xl">–</td>
                <td className="text-center py-4 px-4 text-green-500 text-xl">✓</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8 mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Can I switch plans anytime?
            </h3>
            <p className="text-gray-600">
              Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.
            </p>
          </div>
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Is there a setup fee?
            </h3>
            <p className="text-gray-600">
              No setup fees. Pay only the monthly subscription for your chosen plan.
            </p>
          </div>
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              What payment methods do you accept?
            </h3>
            <p className="text-gray-600">
              We accept all major credit cards, debit cards, UPI, and net banking.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Do you offer refunds?
            </h3>
            <p className="text-gray-600">
              Yes, we offer a 30-day money-back guarantee if you're not satisfied with our service.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center bg-gradient-to-r from-blue-700 to-blue-900 rounded-2xl shadow-2xl p-12 max-w-4xl w-full">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Still Have Questions?
        </h2>
        <p className="text-blue-100 text-lg mb-6">
          Our team is here to help you find the perfect plan for your business
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg">
            Contact Sales
          </button>
          <button className="bg-amber-500 text-white font-semibold px-8 py-3 rounded-lg hover:bg-amber-600 transition-colors duration-300 shadow-lg">
            Schedule Demo
          </button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;