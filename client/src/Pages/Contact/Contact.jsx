import { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import Banner from "../../components/Banner";

const Contact = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out" });
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const validateForm = () => {
    const newErrors = {};
    const { name, email, phone, message } = formData;

    // Name
    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    // USA Phone
    const phoneRegex = /^(\+1\s?)?(\(?\d{3}\)?[\s.-]?)\d{3}[\s.-]?\d{4}$/;
    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(phone.trim())) {
      newErrors.phone = "Enter a valid US phone number (e.g., 123-456-7890)";
    }

    // Message
    if (!message.trim()) {
      newErrors.message = "Message cannot be empty";
    } else if (message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSuccess(""); // reset success on typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch(
        "https://bhiworkshop-1.onrender.com/contact",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        if (response.ok) {
          setSuccess("Thank you! Your message has been sent successfully.");
          setFormData({ name: "", email: "", phone: "", message: "" });
        } else {
          setSuccess(data.message || "Something went wrong.");
        }
      } else {
        const text = await response.text();
        console.error("Non-JSON response:", text);
        setSuccess("Unexpected server response.");
      }
    } catch (error) {
      console.error("Error sending contact form:", error);
      setSuccess("Server error. Please try again later.");
    }
  };

  return (
    <div
      className="container-fluid mx-auto px-6 py-12 bg-white text-black min-h-screen"
      style={{ fontFamily: "Play, sans-serif" }}
    >
      <div className="container">
        <Banner
          text="Get in Touch"
          imageUrl="https://www.stitchtools.com/assets/images/contact/contact-banner.jpg"
        />

        <div className="grid md:grid-cols-2 gap-12 items-start mt-5">
          {/* Contact Info */}
          <div className="space-y-6" data-aos="fade-right">
            <div className="flex items-center space-x-4 bg-gray-100 p-4 rounded-2xl shadow-md">
              <FaMapMarkerAlt className="text-green-400 text-2xl animate-bounce" />
              <span className="text-gray-800">
                591 Summit Ave, Suite No. 400, Jersey City, NJ 07306
              </span>
            </div>
            <div className="flex items-center space-x-4 bg-gray-100 p-4 rounded-2xl shadow-md">
              <FaEnvelope className="text-green-400 text-2xl animate-bounce" />
              <span className="text-gray-800">admin@bhilearning.com</span>
            </div>
            <div className="flex items-center space-x-4 bg-gray-100 p-4 rounded-2xl shadow-md">
              <FaPhone className="text-green-400 text-2xl animate-bounce" />
              <span className="text-gray-800">201-377-1594</span>
            </div>

            <div
              className="rounded-2xl overflow-hidden shadow-lg"
              data-aos="fade-up"
            >
              <iframe
                title="map"
                className="w-full h-64"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.2404959499418!2d-74.0622150245004!3d40.73473333622442!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25730cc0c700d%3A0x5d67811a0fa442ef!2sBright%20Horizon%20Institute!5e0!3m2!1sen!2sin!4v1749047877573!5m2!1sen!2sin"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Contact Form */}
          <form
            className="bg-gray-100 p-8 shadow-2xl rounded-2xl"
            data-aos="fade-left"
            onSubmit={handleSubmit}
          >
            {/* Name */}
            <div className="mb-4">
              <label className="block text-gray-600 font-semibold">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-1 p-3 border border-gray-700 rounded-xl bg-gray-200 text-black focus:ring-green-400 focus:outline-none"
              />
              {errors.name && (
                <p className="text-red-400 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-600 font-semibold">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 p-3 border border-gray-700 rounded-xl bg-gray-200 text-black focus:ring-green-400 focus:outline-none"
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div className="mb-4">
              <label className="block text-gray-600 font-semibold">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full mt-1 p-3 border border-gray-700 rounded-xl bg-gray-200 text-black focus:ring-green-400 focus:outline-none"
              />
              {errors.phone && (
                <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Message */}
            <div className="mb-4">
              <label className="block text-gray-600 font-semibold">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full mt-1 p-3 border border-gray-700 rounded-xl bg-gray-200 text-black focus:ring-green-400 focus:outline-none h-32"
              ></textarea>
              {errors.message && (
                <p className="text-red-400 text-sm mt-1">{errors.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-green-400 text-black font-semibold py-3 rounded-xl hover:shadow-xl transition-transform hover:scale-105 duration-300"
            >
              Tell Us Your Thoughts
            </button>

            {/* Success Message */}
            {success && (
              <p className="text-green-400 text-center mt-4">{success}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
