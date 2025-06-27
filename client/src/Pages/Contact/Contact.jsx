import { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import emailjs from "@emailjs/browser";
import Banner from "../../components/Banner";

const Contact = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out" });
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.message) newErrors.message = "Message cannot be empty";
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});

      emailjs
        .send(
          "service_tsdlp8n",
          "template_524rzr5",
          formData,
          "9Kt5rK_zeTmTDTNS_"
        )
        .then(() => {
          setSuccess("Your message has been sent successfully!");
          setFormData({ name: "", email: "", message: "" });
        })
        .catch(() => {
          setSuccess("Failed to send message. Please try again.");
        });
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Banner */}
      <Banner
        text="Get in Touch"
        imageUrl="https://www.stitchtools.com/assets/images/contact/contact-banner.jpg"
      />

      <div className="grid md:grid-cols-2 gap-12 items-center mt-5">
        {/* Contact Info */}
        <div className="space-y-6" data-aos="fade-right">
          <div className="flex items-center space-x-4 bg-gray-100 p-4 rounded-2xl shadow-md">
            <FaMapMarkerAlt className="text-[#4ADE80] text-2xl animate-bounce" />
            <span className="text-gray-700">
              591 Summit Ave, Suite No. 400 ,Jersey City, New Jersey, NJ 07306
            </span>
          </div>
          <div className="flex items-center space-x-4 bg-gray-100 p-4 rounded-2xl shadow-md">
            <FaEnvelope className="text-[#4ADE80] text-2xl animate-bounce" />
            <span className="text-gray-700">admin@bhilearning.com</span>
          </div>
          <div className="flex items-center space-x-4 bg-gray-100 p-4 rounded-2xl shadow-md">
            <FaPhone className="text-[#4ADE80] text-2xl animate-bounce" />
            <span className="text-gray-700">201-377-1594</span>
          </div>
          {/* Embedded Map */}
          <div
            className="rounded-2xl overflow-hidden shadow-lg"
            data-aos="fade-up"
          >
            <iframe
              title="map"
              className="w-full h-64"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.2404959499418!2d-74.0622150245004!3d40.73473333622442!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25730cc0c700d%3A0x5d67811a0fa442ef!2sBright%20Horizon%20Institute!5e0!3m2!1sen!2sin!4v1749047877573!5m2!1sen!2sin"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Contact Form */}
        <form
          className="bg-white p-8 shadow-2xl rounded-2xl"
          data-aos="fade-left"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-xl focus:ring-primary focus:outline-none"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-xl focus:ring-primary focus:outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-xl focus:ring-primary focus:outline-none h-32"
            ></textarea>
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#4ADE80] text-black font-semibold py-3 rounded-xl hover:shadow-xl transition-transform hover:scale-105 duration-300"
          >
            Tell Us Your Thoughts
          </button>
          {success && (
            <p className="text-green-500 text-center mt-4">{success}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Contact;
