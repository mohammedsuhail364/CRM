import { useEffect, useRef, useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { useAuth } from "../Context/AuthContext";
import toast from "react-hot-toast";

const Contact = () => {

  const [userName, setUserName] = useState("");
  const [message, setMessage] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setCompanyName } = useAuth();

  const sendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = {
      to_name: "Support Team",
      from_name:userName,
      message:message,
    };

    try {
      const response = await emailjs.send(
        "service_iajavv9",
        "template_bt43i34",
        formData,
        "Y4u_-kyILAXBT8eUR"
      );

      if (response.status === 200) {
        toast.success("Email sent successfully")
        setIsSent(true);
        setUserName("");
        setMessage("");
        
      }
    } catch (err) {
      console.error("EmailJS Error:", err);
      toast.error("Failed to send message. Try again.")
    }

    setLoading(false);
  };

  useEffect(() => {
    setCompanyName(null);
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen flex flex-col items-center justify-center px-6 py-16">
      {/* Header Section */}
      <div className="text-center mb-16 pt-12">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-blue-700 to-amber-500 bg-clip-text text-transparent mb-4">
          Get In Touch
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Have questions or need support? We're here to help you succeed.
        </p>
      </div>

      {/* Contact Section */}
      <div className="grid md:grid-cols-2 gap-8 w-full max-w-6xl mb-16">
        {/* Left: Contact Form */}
        <div className="relative bg-gradient-to-br from-white to-blue-50 shadow-xl rounded-3xl p-8 transition-all duration-300 hover:shadow-2xl border border-blue-100 overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full opacity-10 -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-400 to-blue-600 rounded-full opacity-10 -ml-16 -mb-16"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-2xl">✉️</span>
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent">
                Send Us a Message
              </h3>
            </div>
            
            <div className="space-y-5">
              <div className="relative group">
                <input
                  type="text"
                  name="user_name"
                  placeholder="Your Name"
                  className="w-full p-4 pl-5 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-amber-500 focus:bg-blue-50 transition-all duration-300 group-hover:border-blue-300 shadow-sm"
                  required
                  value={userName}
                  onChange={(e)=>setUserName(e.target.value)}
                />
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                  <span className="text-gray-300 group-focus-within:text-amber-500 transition-colors">👤</span>
                </div>
              </div>
              
              <div className="relative group">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows="6"
                  className="w-full p-4 pl-5 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-amber-500 focus:bg-blue-50 transition-all duration-300 resize-none group-hover:border-blue-300 shadow-sm"
                  required
                  value={message}
                  onChange={(e)=>setMessage(e.target.value)}
                ></textarea>
                <div className="absolute top-4 right-4 pointer-events-none">
                  <span className="text-gray-300 group-focus-within:text-amber-500 transition-colors">💬</span>
                </div>
              </div>
              
              <button
                onClick={sendEmail}
                className="relative w-full bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 text-white py-4 rounded-xl text-lg font-bold hover:from-amber-500 hover:via-amber-600 hover:to-amber-500 transition-all duration-500 shadow-lg hover:shadow-2xl disabled:from-gray-400 disabled:via-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0 group overflow-hidden"
                disabled={loading}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <span className="animate-spin">⏳</span>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:translate-x-full transition-all duration-700"></div>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Contact Info & Map */}
        <div className="flex flex-col space-y-6 w-full">
          {/* Contact Details */}
          <div className="bg-white shadow-lg rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl">
            <h3 className="text-2xl font-bold text-blue-700 mb-6">
              Contact Information
            </h3>
            <div className="space-y-5">
              <div className="flex items-center space-x-4 group">
                <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center group-hover:bg-amber-200 transition-colors duration-300">
                  <FaPhone className="text-amber-600 text-xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Phone</p>
                  <a href="tel:+919787001002" className="text-gray-800 font-semibold hover:text-blue-700 transition-colors">
                    +91 8787 900 002
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4 group">
                <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center group-hover:bg-amber-200 transition-colors duration-300">
                  <FaEnvelope className="text-amber-600 text-xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Email</p>
                  <a href="mailto:support@simsys.in" className="text-gray-800 font-semibold hover:text-blue-700 transition-colors">
                    support@synapsecrm.in
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4 group">
                <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center group-hover:bg-amber-200 transition-colors duration-300">
                  <FaMapMarkerAlt className="text-amber-600 text-xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium mb-1">Address</p>
                  <p className="text-gray-800 font-medium leading-relaxed">
                    No.2 Chella Nagar 1st Street,<br />
                    Mangala Road, Tirupur - 6222224,<br />
                    Tamilnadu, INDIA
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="w-full overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl">
            <iframe
              title="Google Maps"
              className="w-full h-64 rounded-2xl"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3912.109468353077!2d77.3257349747336!3d11.123646754002273!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba907dce19a8e3d%3A0xf76916f1b2a9911e!2sNo.1%20Chellam%20Nagar%201st%20Street%2C%20Mangalam%20Road%2C%20Tirupur%20-%20641604%2C%20Tamilnadu!5e0!3m2!1sen!2sin!4v1708347634567!5m2!1sen!2sin"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Business Hours Section */}
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg p-8 mb-16">
        <h3 className="text-2xl font-bold text-blue-700 mb-6 text-center">
          Business Hours
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex justify-between items-center py-3 border-b border-gray-200">
            <span className="font-semibold text-gray-700">Monday - Friday</span>
            <span className="text-gray-600">9:00 AM - 6:00 PM</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-200">
            <span className="font-semibold text-gray-700">Saturday</span>
            <span className="text-gray-600">10:00 AM - 4:00 PM</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-200">
            <span className="font-semibold text-gray-700">Sunday</span>
            <span className="text-gray-600">Closed</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-200">
            <span className="font-semibold text-gray-700">Response Time</span>
            <span className="text-green-600 font-semibold">Within 24 hours</span>
          </div>
        </div>
      </div>

      {/* Why Contact Us Section */}
      <div className="w-full max-w-6xl bg-gradient-to-r from-blue-700 to-blue-900 rounded-2xl shadow-2xl p-12 text-center">
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
          We're Here to Help
        </h3>
        <p className="text-blue-100 text-lg mb-8 max-w-3xl mx-auto leading-relaxed">
          Whether you need technical support, have questions about pricing, or want to schedule a demo, 
          our team is ready to assist you.
        </p>
        <div className="grid md:grid-cols-3 gap-6 text-black">
          <div className="bg-white bg-opacity-10 rounded-xl p-6 backdrop-blur-sm">
            <div className="text-3xl mb-3">🚀</div>
            <h4 className="font-semibold text-lg mb-2">Quick Setup</h4>
            <p className="text-black-100 text-sm">Get started in minutes with our expert guidance</p>
          </div>
          <div className="bg-white bg-opacity-10 rounded-xl p-6 backdrop-blur-sm">
            <div className="text-3xl mb-3">💬</div>
            <h4 className="font-semibold text-lg mb-2">24/7 Support</h4>
            <p className="text-black-100 text-sm">Premium customers get round-the-clock assistance</p>
          </div>
          <div className="bg-white bg-opacity-10 rounded-xl p-6 backdrop-blur-sm">
            <div className="text-3xl mb-3">📈</div>
            <h4 className="font-semibold text-lg mb-2">Free Training</h4>
            <p className="text-black-100 text-sm">Comprehensive onboarding for your entire team</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;