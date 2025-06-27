import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";

const features = [
  { icon: "🎓", text: "Expert Trainers" },
  { icon: "💻", text: "Remote Learning" },
  { icon: "⏳", text: "Lifetime Access" },
  { icon: "🚀", text: "Self Development" },
];

const BlogSection = () => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/courses");
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <section
      className="bg-cream px-8 py-16 md:px-20 flex flex-col md:flex-row items-center gap-12"
      data-aos="fade-up"
    >
      {/* Background Blur Elements */}
      <div
        className="absolute -top-12 -left-12 w-32 h-32 bg-gradient-to-r from-red-400 to-yellow-300 rounded-full opacity-40 blur-xl"
        data-aos="fade-right"
      ></div>
      <div
        className="absolute bottom-0 right-0 w-28 h-28 bg-gradient-to-r from-green-400 to-blue-300 rounded-full opacity-40 blur-xl"
        data-aos="fade-left"
      ></div>

      {/* Images Section */}
      <div
        className="flex-1 grid grid-cols-2 gap-6 relative"
        data-aos="zoom-in"
      >
        {/* First Image */}
        <div className="relative bg-white p-3 rounded-xl shadow-[10px_10px_30px_rgba(0,0,0,0.2)] transition-transform duration-300 hover:scale-105">
          <img
            src="https://img.freepik.com/free-photo/female-speaker-giving-presentation-hall-university-workshop-audience-conference-hall_155003-27432.jpg?uid=R91963452&ga=GA1.1.1581216429.1736934459&semt=ais_hybrid"
            alt="Team Collaboration"
            className="rounded-xl shadow-md"
            data-aos="fade-up"
          />
        </div>

        {/* Second Image */}
        <div className="relative bg-white p-3 rounded-xl shadow-[10px_10px_30px_rgba(0,0,0,0.2)] transition-transform duration-300 hover:scale-105">
          <img
            src="https://img.freepik.com/free-photo/close-up-young-business-person-doing-internship_23-2149305380.jpg"
            alt="Casual Discussion"
            className="rounded-xl shadow-md"
            data-aos="fade-up"
            data-aos-delay="200"
          />
        </div>

        {/* Third Image - Larger */}
        <div
          className="relative bg-white p-3 rounded-xl shadow-[10px_10px_30px_rgba(0,0,0,0.2)] col-span-2 transition-transform duration-300 hover:scale-105"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <img
            src="https://img.freepik.com/free-photo/young-students-classroom_329181-13015.jpg"
            alt="Team Working Together"
            className="rounded-xl shadow-md"
          />
        </div>
      </div>

      {/* Text Content Section */}
      <div className="flex-1 text-left" data-aos="fade-left">
        <p className="text-red-500 font-semibold uppercase text-sm">
          Online Learning
        </p>

        <h1 className="text-4xl font-bold text-black sm:text-6xl lg:text-7xl">
          Enhance Your Skills & Career,
          <br />
          Learn Something New, and <br /> Grow Your Skills.
          <span className="mr-2"></span>
        </h1>

        <p className="mt-8 text-base text-black sm:text-xl" data-aos="fade-up">
          Develop in-demand skills, explore new knowledge, and accelerate your
          growth with our expert-led courses. We believe that quality education
          can make a global impact, helping students worldwide achieve their
          career goals. With flexible learning options, we ensure the best
          learning experience for everyone.
        </p>

        {/* Features List */}
        <div className="grid grid-cols-2 gap-6 mt-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-white shadow-lg rounded-lg transition-transform duration-300 hover:scale-105"
              data-aos="flip-left"
              data-aos-delay={index * 200}
            >
              <span className="text-red-500 text-2xl">{feature.icon}</span>
              <span className="font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent text-sm sm:text-base md:text-lg">
                {feature.text}
              </span>
            </div>
          ))}
        </div>

        {/* Button */}
        <button
          onClick={handleClick}
          className="mt-12 bg-[#4ADE80] text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition-transform duration-300 flex items-center gap-2"
          style={{ marginTop: "20px", borderRadius: "20px" }}
          data-aos="fade-up"
        >
          📚 View All Courses
        </button>
      </div>
    </section>
  );
};

export default BlogSection;
