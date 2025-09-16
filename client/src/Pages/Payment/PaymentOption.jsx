import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SUNDAY = 0;

const getTimeSlot = (title = "") => {
  const lower = title.toLowerCase();
  if (lower.includes("makeup")) return "12PM - 4PM";
  if (lower.includes("phone")) return "12PM - 6PM";
  return "";
};

const PaymentOptions = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  const course = location.state?.course;
  const timeSlot = getTimeSlot(course?.title);

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({ duration: 1000, once: true });
  }, []);

  const filterSundays = (date) => date.getDay() === SUNDAY;

  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <div
          className="bg-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-2xl text-center border border-white/20"
          data-aos="fade-up"
        >
          <p className="text-xl font-semibold text-white">
            No course details found. Please go back and select a course.
          </p>
        </div>
      </div>
    );
  }

  const handlePayment = async () => {
    if (!selectedDate) {
      alert("Please select a Sunday date for your workshop.");
      return;
    }

    setLoading(true);
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId"); // ✅ logged in user ID

    const payload = {
      amount: course.price,
      return_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    };

    try {
      const res = await axios.post(`${API_URL}/payment`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("✅ Backend response:", res.data);

      // Save details for verification in sessionStorage
      sessionStorage.setItem("userId", userId);
      sessionStorage.setItem("courseId", course._id);
      sessionStorage.setItem("courseAmount", course.price);
      sessionStorage.setItem("paypalOrderId", res.data.paymentId);
      sessionStorage.setItem("workshopDate", selectedDate.toISOString());
      sessionStorage.setItem("timeSlot", timeSlot);

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
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-black to-purple-900 text-white px-4"
      style={{ fontFamily: "Play, sans-serif" }}
    >
      <div
        className="bg-white/10 backdrop-blur-lg p-10 rounded-3xl shadow-2xl w-full max-w-2xl text-center border border-white/20"
        data-aos="zoom-in"
      >
        <h2
          className="text-3xl sm:text-4xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text"
          data-aos="fade-down"
        >
          Payment for {course.title}
        </h2>

        <p className="text-lg text-gray-300 mb-6" data-aos="fade-up">
          Pay securely to reserve your spot and unlock everything instantly.
        </p>

        {/* Date Picker */}
        <div className="mb-6 text-left" data-aos="fade-up">
          <label className="block mb-2 text-gray-200 font-semibold mr-2">
            Select a Sunday for your workshop:
          </label>
          <DatePicker
            selected={selectedDate}
            onChange={setSelectedDate}
            filterDate={filterSundays}
            minDate={new Date()}
            placeholderText="Click to select a Sunday"
            className="w-full border border-gray-400 px-4 py-3 rounded-xl text-white focus:ring-2 focus:ring-indigo-500"
            dateFormat="MMMM d, yyyy"
            popperClassName="!z-[999999]"
            portalId="root"
          />
        </div>

        {/* Time Slot */}
        {timeSlot && (
          <div className="mb-8" data-aos="fade-up">
            <label className="block mb-2 text-gray-200 font-semibold">
              Time Slot:
            </label>
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-3 rounded-xl text-white font-bold shadow-lg">
              {timeSlot}
            </div>
          </div>
        )}

        {/* Payment Button */}
        <div className="mt-8">
          <button
            onClick={handlePayment}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg font-bold rounded-xl shadow-xl transition-transform transform hover:scale-105"
            disabled={loading}
            data-aos="fade-up"
          >
            {loading
              ? "Processing..."
              : `Pay Now - $${course.price?.toFixed(2)}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentOptions;
