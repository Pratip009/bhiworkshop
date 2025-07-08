import { lazy, Suspense } from "react";
import SpinnerLoader from "../../components/Loader";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Lazy loaded components
const PopularCourses = lazy(() =>
  import("../../components/HomeComponents/PopularCourses")
);
const FloatingButtons = lazy(() =>
  import("../../components/HomeComponents/FloatingButtons")
);

// Animation Variants
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const Home = () => {
  return (
    <div className="bg-white text-black font-['Play']">
      {/* HERO SECTION */}
      <section className="relative py-24 px-6 md:px-20 border-b border-gray-100 overflow-hidden">
        {/* Decorative Blobs */}
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-[#C7E9FF] rounded-full mix-blend-multiply opacity-30 z-0 animate-bounce-slow"></div>
        <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-[#FFD6E0] rounded-full mix-blend-multiply opacity-30 z-0 animate-bounce-slow delay-1000"></div>

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm uppercase tracking-widest text-[#F4D94A] font-semibold mb-4">
              Transform Your Career
            </h2>

            {/* Animated Hero Text */}
            <motion.h1
              className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-snug mb-6 flex flex-wrap font-outfit"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {["Learn.", "Build.", "Achieve."].map((word, i) => (
                <span key={i} className="mr-3">
                  {word.split("").map((char, index) => (
                    <motion.span
                      key={index}
                      variants={letterVariants}
                      className={word === "Achieve." ? "text-[#F4D94A]" : ""}
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              ))}
            </motion.h1>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Hands-on workshops with top mentors to boost your skills, create
              real-world projects, and earn verifiable certifications. It’s your
              launchpad to success.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-sm text-gray-900 font-semibold">
              <div className="bg-[#C7E9FF] px-4 py-3 rounded-lg shadow-sm">
                Live mentor guidance
              </div>
              <div className="bg-[#FFE8C9] px-4 py-3 rounded-lg shadow-sm">
                Real project experience
              </div>
              <div className="bg-[#FFD6E0] px-4 py-3 rounded-lg shadow-sm">
                Certified outcomes
              </div>
              <div className="bg-[#D9FDE6] px-4 py-3 rounded-lg shadow-sm">
                Career-ready skills
              </div>
            </div>

            <Link
              to="/workshops"
              className="inline-block bg-[#F4D94A] hover:bg-[#1D4ED8] text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 text-base"
              style={{ textDecoration: "none" }}
            >
              Browse Workshops
            </Link>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full flex justify-center"
          >
            <img
              src="https://img.freepik.com/free-vector/creative-team-working-project_23-2148461972.jpg"
              alt="Learning Illustration"
              className="max-w-lg w-full rounded-xl shadow-xl hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </motion.div>
        </div>
      </section>

      {/* Suspense Loaded Sections */}
      <Suspense
        fallback={
          <div className="min-h-screen flex justify-center items-center">
            <SpinnerLoader size={45} />
          </div>
        }
      >
        <PopularCourses />
        <FloatingButtons />
      </Suspense>
    </div>
  );
};

export default Home;
