import { Link, useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import axios from "axios";

const PaymentSuccess = () => {
  const [verifying, setVerifying] = useState(true);
  const [status, setStatus] = useState("Verifying payment...");
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
  const location = useLocation();

  useEffect(() => {
    AOS.init({ duration: 1000 });

    const verifyPayment = async () => {
      const userId = sessionStorage.getItem("userId"); // ✅ fixed
      const token = localStorage.getItem("token");
      const courseId = sessionStorage.getItem("courseId");
      const amount = sessionStorage.getItem("courseAmount");
      const workshopDate = sessionStorage.getItem("workshopDate");
      const timeSlot = sessionStorage.getItem("timeSlot");

      const queryParams = new URLSearchParams(location.search);
      const paypalOrderId = queryParams.get("token"); // ✅ PayPal order ID

      console.log("📦 Retrieved payment data:", {
        userId,
        token,
        courseId,
        amount,
        workshopDate,
        timeSlot,
        paypalOrderId,
      });

      if (!userId || !token || !courseId || !amount || !paypalOrderId) {
        setStatus("❌ Missing or invalid payment details.");
        setVerifying(false);
        return;
      }

      try {
        const res = await axios.post(
          `${API_URL}/payment/verify`,
          {
            userId,
            courseId,
            amount,
            paymentId: paypalOrderId, // ✅ send correct orderId
            workshopDate,
            timeSlot,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("✅ Verification API response:", res.data);
        setStatus("✅ Payment verified and course enrolled!");
      } catch (error) {
        console.error(
          "❌ Verification failed:",
          error.response?.data || error.message
        );
        setStatus("❌ Payment verification failed. Please contact support.");
      } finally {
        setVerifying(false);

        // Cleanup session storage
        sessionStorage.clear();

        // Clean query string in URL
        const cleanUrl = new URL(window.location);
        cleanUrl.search = "";
        window.history.replaceState({}, document.title, cleanUrl.toString());
      }
    };

    verifyPayment();
  }, [location, API_URL]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      <div
        className="relative bg-white/80 backdrop-blur-lg p-10 rounded-3xl shadow-2xl max-w-lg text-center"
        data-aos="zoom-in"
      >
        <h2
          className="text-4xl font-bold text-green-600 mb-6"
          data-aos="fade-down"
        >
          🎉 Payment Successful!
        </h2>

        <p className="text-lg text-gray-700 mb-4" data-aos="fade-up">
          {status}
        </p>

        {verifying && (
          <div className="mt-4 flex justify-center" data-aos="fade-up">
            <div className="w-6 h-6 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {!verifying && (
          <div className="mt-6">
            <Link
              to="/"
              className="inline-block px-6 py-3 bg-green-500 text-white font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
              data-aos="fade-up"
            >
              Go to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
