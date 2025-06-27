import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const BusinessInitiative = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      once: true, // Runs only once
      easing: "ease-in-out", // Easing type
    });
  }, []);

  return (
    <div className="bg-white relative">
      <section
        className="py-10 sm:py-16 lg:py-24"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h1
                className="text-4xl font-bold text-black sm:text-6xl lg:text-7xl"
                data-aos="fade-right"
              >
                Collaborate remotely, with <br /> Bright Horizon Institute.
              </h1>

              <p
                className="mt-8 text-base text-black sm:text-xl"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                Our mission is to provide students with high-quality training
                programs and prepare them for a competitive job market.
              </p>

              <div
                className="mt-10 sm:flex sm:items-center sm:space-x-8"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <Link
                  to="#"
                  className="inline-flex items-center justify-center px-10 py-4 text-base font-semibold text-white transition-all duration-200 bg-orange-500 hover:bg-orange-600 focus:bg-orange-600"
                  style={{ textDecoration: "none" }}
                >
                  Explore our programs
                </Link>
                <button
                  onClick={() => setIsVideoOpen(true)}
                  className="inline-flex items-center mt-6 text-base font-semibold transition-all duration-200 sm:mt-0 hover:opacity-80"
                >
                  <svg
                    className="w-10 h-10 mr-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    data-aos="zoom-in"
                    data-aos-delay="500"
                  >
                    <path
                      fill="#F97316"
                      stroke="#F97316"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Watch video
                </button>
              </div>
            </div>

            <div data-aos="fade-left" data-aos-delay="600">
              <img
                className="w-full"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/2/hero-img.png"
                alt="Hero"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {isVideoOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
          data-aos="fade-in"
        >
          <div className="relative w-full max-w-3xl">
            <button
              className="absolute top-2 right-2 text-white text-3xl"
              onClick={() => setIsVideoOpen(false)}
            >
              &times;
            </button>
            <iframe
              className="w-full h-64 md:h-96"
              src="https://www.youtube.com/embed/-sfMwZ3dJPw?autoplay=1"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessInitiative;
