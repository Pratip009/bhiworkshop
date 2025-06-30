import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";

const CertificationBanner = () => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/courses");
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <div className="relative bg-white py-12 px-6 text-center flex flex-col items-center">
      {/* Background Elements with AOS Effects */}
      <div
        className="absolute top-5 left-5 w-12 h-12 bg-red-300 rounded-full opacity-50"
        data-aos="fade-in"
      ></div>
      <div
        className="absolute top-10 right-10 w-8 h-8 border-2 border-red-500 rounded-full"
        data-aos="fade-in"
        data-aos-delay="300"
      ></div>
      <div
        className="absolute bottom-10 right-0 w-32 h-32 bg-gray-200 opacity-20 transform rotate-12"
        data-aos="fade-in"
        data-aos-delay="500"
      ></div>

      <p
        className="text-red-500 font-semibold uppercase tracking-wide"
        data-aos="fade-up"
      >
        Affordable Certification
      </p>

      <h1
        className="text-4xl font-bold text-black sm:text-6xl lg:text-7xl"
        data-aos="zoom-in"
      >
        Get Your Quality Skills Certificate<span className="mr-2"></span>
      </h1>

      <p
        className="mt-8 text-base text-black sm:text-xl"
        data-aos="fade-up"
        data-aos-delay="400"
      >
        Students friendly pricing for the certificate programs helps <br />{" "}
        individuals to get their skill certificate easier than ever!
      </p>

      <button
        onClick={handleClick}
        className="mt-6 px-6 py-3 bg-red-500 text-white font-semibold rounded-md flex items-center gap-2 hover:bg-red-600 transition"
        data-aos="fade-up"
        data-aos-delay="600"
      >
        📱 Get Started Now
      </button>
    </div>
  );
};

export default CertificationBanner;
