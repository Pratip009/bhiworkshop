import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const PaymentOptions = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  const course = location.state?.course;

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({ duration: 1000 });
  }, []);

  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div
          className="bg-gray-800 p-8 rounded-lg shadow-xl text-center"
          data-aos="fade-up"
        >
          <p className="text-xl font-semibold text-gray-100">
            No course details found. Please go back and select a course.
          </p>
        </div>
      </div>
    );
  }

  const handlePayment = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        `${API_URL}/payment`,
        {
          amount: course.price,
          return_url: "http://localhost:5173/success", // Replace with your production domain
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // 🔍 Debug response from backend
      console.log("📦 PayPal response from backend:", res.data);

      // 🔍 Log what is being saved to sessionStorage
      console.log("💾 Saving to sessionStorage:");
      console.log("➡️ courseId:", course._id);
      console.log("➡️ courseAmount:", course.price);
      console.log("➡️ paymentId:", res.data.paymentId);

      sessionStorage.setItem("courseId", course._id);
      sessionStorage.setItem("courseAmount", course.price);
      sessionStorage.setItem("paymentId", res.data.paymentId);

      if (res.data.approval_url) {
        window.location.href = res.data.approval_url;
      } else {
        throw new Error("No PayPal approval URL returned");
      }
    } catch (error) {
      console.error(
        "❌ Payment initiation failed:",
        error.response?.data || error.message
      );
      alert("Payment initiation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-white text-black"
      style={{ fontFamily: "Play, sans-serif" }}
    >
      <div
        className="bg-gray-800 p-10 rounded-2xl shadow-2xl w-full max-w-2xl text-center"
        data-aos="zoom-in"
      >
        <h2
          className="text-3xl sm:text-4xl font-bold text-white mb-4"
          data-aos="fade-down"
        >
          Payment for <span className="text-blue-400">{course.title}</span>
        </h2>

        <p className="text-lg text-gray-300" data-aos="fade-up">
          Pay the full amount to enroll and unlock everything instantly.
        </p>

        <div className="mt-8">
          <button
            onClick={handlePayment}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg shadow-lg transition-transform transform hover:scale-105"
            disabled={loading}
            data-aos="fade-up"
          >
            {loading
              ? "Processing..."
              : `Full Payment - $${course.price?.toFixed(2)}`}
          </button>
        </div>

        <div className="mt-6 text-gray-400 text-sm" data-aos="fade-up">
          <p className="flex items-center gap-2">
            <span className="text-green-400 text-lg">✔</span>
            <strong>Full Payment:</strong> One-time payment, instant access.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentOptions;
