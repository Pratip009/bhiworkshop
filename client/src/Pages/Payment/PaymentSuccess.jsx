import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const PaymentSuccess = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      <div
        className="relative bg-white/80 backdrop-blur-lg p-10 rounded-3xl shadow-2xl max-w-lg text-center"
        data-aos="zoom-in"
      >
        <h2 className="text-4xl font-bold text-green-600 mb-6" data-aos="fade-down">
          🎉 Payment Successful!
        </h2>
        <p className="text-lg text-gray-700" data-aos="fade-up">
          Thank you for your payment. Your enrollment is confirmed!
        </p>

        <div className="mt-6">
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-green-500 text-white font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
            data-aos="fade-up"
            style={{
                textDecoration:'none'
            }}
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
