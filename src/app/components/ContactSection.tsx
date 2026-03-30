"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

import contactImage from "@/assets/get-in-touch.png";
import logo from "@/assets/logo.png";
import githubIcon from "@/assets/github.png";
import linkedinIcon from "@/assets/linkedin.png";
import twitterIcon from "@/assets/twitter.png";

export function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "", // Changed from 'subject' to 'message' for clarity
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Initialize EmailJS with your Public Key safely
  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // These keys should now come from your .env file
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: `${formData.firstName} ${formData.lastName}`,
          from_email: formData.email,
          phone: formData.phone,
          message: formData.message, // Ensure this matches {{message}} in your EmailJS template
        }
      );

      setSuccess(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });

      setTimeout(() => setSuccess(false), 4000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      alert("Something went wrong. Please check your connection and try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section 
    id ="contact"
    className="min-h-screen text-white flex flex-col justify-between pt-20 px-6 relative">
      
      {/* Success Popup */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 20 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-5 left-1/2 -translate-x-1/2 bg-green-600 px-6 py-4 rounded-xl flex items-center gap-3 shadow-lg z-50 font-medium"
          >
            <CheckCircle size={22} />
            Message Sent Successfully!
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold">
            Get In <span className="text-[#FF8C00]">Touch</span>
          </h2>
          <p className="text-gray-300 mt-5 max-w-2xl mx-auto">
            Ready to create something amazing together? I'll get back to you as soon as possible.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="rounded-3xl p-6 md:p-8"
        >
          <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
            {/* Left Image */}
            <div className="flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative w-full max-w-md"
              >
                <div className="absolute inset-0 bg-[#FF8C00]/10 blur-3xl rounded-3xl -z-10 scale-105" />
                <img src={contactImage} alt="Contact" className="w-full object-contain" />
                <div className="absolute bottom-0 left-0 w-full h-48 pointer-events-none bg-gradient-to-t from-[#02070A] via-[#02070A]/80 to-transparent rounded-b-3xl" />
              </motion.div>
            </div>

            {/* Form Container */}
            <div className="p-3 md:p-4 rounded-xl backdrop-blur-xl border border-white/10 bg-gradient-to-br from-black/60 via-[#FF8C00]/10 to-[#1a0f05]/60">
              <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                <div className="grid grid-cols-2 gap-2 md:gap-3">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First name"
                    required
                    className="px-3 py-2 bg-white/5 rounded-md outline-none text-white border border-white/10 focus:border-[#FF8C00] text-sm transition-colors"
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last name"
                    required
                    className="px-3 py-2 bg-white/5 rounded-md outline-none text-white border border-white/10 focus:border-[#FF8C00] text-sm transition-colors"
                  />
                </div>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  required
                  className="w-full px-3 py-2 bg-white/5 rounded-md outline-none text-white border border-white/10 focus:border-[#FF8C00] text-sm transition-colors"
                />

                <input
                  type="tel" // Changed to tel for better mobile keyboard support
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Mobile No."
                  required
                  className="w-full px-3 py-2 bg-white/5 rounded-md outline-none text-white border border-white/10 focus:border-[#FF8C00] text-sm transition-colors"
                />

                <textarea
                  name="message" // Changed from 'subject'
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Your Message"
                  required
                  className="w-full px-3 py-2 bg-white/5 rounded-md outline-none resize-none text-white border border-white/10 focus:border-[#FF8C00] text-sm transition-colors"
                />

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 bg-gradient-to-r from-[#FF8C00] to-orange-400 rounded-md font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-60 transition-opacity"
                >
                  {loading ? "Sending..." : "Send Message"}
                  <Send size={16} />
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}

      <footer className="mt-16 py-10 border-t border-white/10">

        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">

          <div className="flex items-center gap-3">

            <img src={logo} alt="Logo" className="w-10 h-10" />

            <span className="text-gray-400">UI/UX Designer</span>

          </div>



          <div className="flex items-center gap-6">

            <a href="https://www.linkedin.com/in/ajaya-kumar-sahoo-066a18321" target="_blank" rel="noopener noreferrer">
              <img src={linkedinIcon} alt="LinkedIn" className="w-9 h-9 hover:scale-110 transition" />
            </a>

            <a href="https://github.com/Ajaya2006" target="_blank" rel="noopener noreferrer">
              <img src={githubIcon} alt="GitHub" className="w-9 h-9 hover:scale-110 transition" />
            </a>

            <a href="https://x.com/AjayaKumar1653" target="_blank" rel="noopener noreferrer">
              <img src={twitterIcon} alt="Twitter" className="w-9 h-9 hover:scale-110 transition" />
            </a>

          </div>



          <div className="text-gray-400 text-sm text-center md:text-right">

            <p className="text-[#FF8C00] font-medium">

              Designed by AJAYA: All Rights Reserved

            </p>

            <p>© 2026 Ajaya. Thank you for visiting.</p>

          </div>

        </div>

      </footer>
    </section>
  );
}