import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { useAuth } from "../Context/AuthContext";

const Contact = () => {
  const formRef = useRef(null);
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {setCompanyName}=useAuth();
  const sendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = {
      to_name: "Support Team", // Set the recipient name as per your template
      from_name: formRef.current.user_name.value,
      message: formRef.current.message.value,
    };

    try {
      const response = await emailjs.send(
        "service_hzjmsno", // Replace with your EmailJS Service ID
        "template_bt43i34", // Replace with your EmailJS Template ID
        formData,
        "Y4u_-kyILAXBT8eUR" // Replace with your EmailJS Public Key
      );

      if (response.status === 200) {
        setIsSent(true);
        formRef.current.reset(); // Reset the form after sending
        setTimeout(() => {
          setIsSent(false);
        }, 5000);
      }
    } catch (err) {
      console.error("EmailJS Error:", err);
      setError("Failed to send message. Try again.");
    }

    setLoading(false);
  };
  useEffect(()=>{
    setCompanyName(null)
  },[])
  return (
    <section className="relative bg-[#F8FAFC] min-h-screen flex flex-col items-center justify-center px-6 py-12 md:px-12">
      {/* Header Section */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-extrabold uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#1E40AF] to-[#F59E0B] mt-24">
          Get In Touch
        </h1>
        <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
          Have any questions? Reach out to us, and we{"'"}ll be happy to help.
        </p>
      </motion.div>

      {/* Contact Section */}
      <div className="grid md:grid-cols-2 gap-12 w-full max-w-6xl">
        {/* Left Half: Contact Form */}
        <motion.div
          className="bg-white shadow-2xl rounded-xl p-8 transition-all hover:shadow-3xl"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-3xl font-semibold text-[#1E40AF] mb-6">
            Send Us a Message
          </h3>
          <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
            <input
              type="text"
              name="user_name"
              placeholder="Your Name"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F59E0B] transition"
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F59E0B] transition"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-[#1E40AF] text-white py-3 rounded-lg text-lg font-semibold hover:bg-[#F59E0B] transition"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>

          {/* Success & Error Messages */}
          {isSent && (
            <p className="mt-4 text-green-600 text-center font-semibold">
              ✅ Message Sent Successfully!
            </p>
          )}
          {error && (
            <p className="mt-4 text-red-600 text-center font-semibold">
              ❌ {error}
            </p>
          )}
        </motion.div>

        {/* Right Half: Contact Info & Map */}
        <div className="flex flex-col space-y-6 w-full">
          {/* Contact Details */}
          <motion.div
            className="bg-white shadow-2xl rounded-xl p-6 flex flex-col space-y-4 transition-all hover:shadow-3xl"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-semibold text-[#1E40AF] mb-4">
              Contact Details
            </h3>
            <div className="flex items-center space-x-4 text-lg text-gray-700">
              <FaPhone className="text-[#F59E0B] text-2xl" />
              <span className="font-medium">+91 9787 001 002</span>
            </div>
            <div className="flex items-center space-x-4 text-lg text-gray-700">
              <FaEnvelope className="text-[#F59E0B] text-2xl" />
              <span className="font-medium">support@simsys.in</span>
            </div>
            <div className="flex items-start space-x-4 text-lg text-gray-700">
              <FaMapMarkerAlt className="text-[#F59E0B] text-2xl" />
              <span className="font-medium">
                No.1 Chellam Nagar 1st Street, <br />
                Mangalam Road, Tirupur - 641604, Tamilnadu, INDIA
              </span>
            </div>
          </motion.div>

          {/* Map Section */}
          <motion.div
            className="w-full overflow-hidden rounded-xl shadow-xl transition-all hover:shadow-2xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <iframe
              title="Google Maps"
              className="w-full h-48 rounded-lg"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3912.109468353077!2d77.3257349747336!3d11.123646754002273!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba907dce19a8e3d%3A0xf76916f1b2a9911e!2sNo.1%20Chellam%20Nagar%201st%20Street%2C%20Mangalam%20Road%2C%20Tirupur%20-%20641604%2C%20Tamilnadu!5e0!3m2!1sen!2sin!4v1708347634567!5m2!1sen!2sin"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
