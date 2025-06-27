import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const PaymentOptions = () => {
  const location = useLocation();
  const [loading, setLoading] = useState({ full: false, partial: false });
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({ duration: 1000 });
  }, []);

  const course = location.state?.course;

  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div
          className="bg-white p-8 rounded-lg shadow-lg text-center"
          data-aos="fade-up"
        >
          <p className="text-xl font-semibold text-gray-700">
            No course details found. Please go back and select a course.
          </p>
        </div>
      </div>
    );
  }

  const handlePayment = async (amount, type) => {
    setLoading((prev) => ({ ...prev, [type]: true }));

    const token = localStorage.getItem("token"); // or sessionStorage
    console.log("Retrieved token:", token);

    try {
      console.log("Initiating payment with amount:", amount);

      const res = await axios.post(
        `${API_URL}/payment`,
        {
          amount,
          return_url: "http://localhost:3000/success",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // add token to request header
          },
        }
      );

      console.log("Payment response:", res.data);

      if (res.data.approval_url) {
        window.location.href = res.data.approval_url;
      } else {
        throw new Error("No PayPal approval URL found");
      }
    } catch (error) {
      console.error("Payment Error:", error);
      if (error.response) {
        console.error(
          "Server responded with:",
          error.response.status,
          error.response.data
        );
      }
      alert("Payment initiation failed. Please try again.");
    } finally {
      setLoading((prev) => ({ ...prev, [type]: false }));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      <div
        className="relative bg-white/80 backdrop-blur-lg p-10 rounded-3xl shadow-2xl max-w-2xl text-center"
        data-aos="zoom-in"
      >
        <h2
          className="text-4xl font-bold text-gray-900 mb-6"
          data-aos="fade-down"
        >
          Payment Options for{" "}
          <span className="text-blue-500">{course.title} </span>course
        </h2>

        <p className="text-lg font-medium text-gray-700" data-aos="fade-up">
          Choose a payment option below:
        </p>

        <div className="mt-6 flex flex-col gap-y-8">
          {" "}
          {/* Flexbox with gap */}
          <button
            onClick={() => handlePayment(4000, "full")}
            className="w-full py-4 bg-gradient-to-r from-green-400 to-green-600 text-white text-xl font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
            disabled={loading.full}
            data-aos="fade-right"
          >
            {loading.full ? "Processing..." : "Full Payment - $4000"}
          </button>
          <button
            onClick={() => handlePayment(2000, "partial")}
            className="w-full py-4 bg-gradient-to-r from-blue-400 to-blue-600 text-white text-xl font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
            disabled={loading.partial}
            data-aos="fade-left"
          >
            {loading.partial ? "Processing..." : "Partial Payment - $2000"}
          </button>
        </div>

        {/* Additional Information */}
        <div
          className="mt-8 text-gray-700 space-y-2 text-sm"
          data-aos="fade-up"
        >
          <p className="flex items-center gap-2">
            <span className="text-green-500 text-lg">✔</span>
            <strong>Full Payment:</strong> Pay the full amount upfront and
            unlock exclusive discounts.
          </p>
          <p className="flex items-center gap-2">
            <span className="text-blue-500 text-lg">✔</span>
            <strong>Partial Payment:</strong> Start with a deposit and pay in
            installments.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentOptions;
