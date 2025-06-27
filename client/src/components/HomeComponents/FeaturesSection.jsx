import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import brain from "../../assets/slider/brain.png";
import earth from "../../assets/slider/earth.png";
import laptop from "../../assets/slider/laptop.png";
import verify from "../../assets/slider/verify.png";

export default function FeaturesSection() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      once: true, // Animation only runs once
      easing: "ease-in-out", // Easing type
    });
  }, []);

  const features = [
    {
      icon: brain,
      title: "Learn the Latest In-Demand Skills",
      description:
        "Master top industry skills that can boost your career and open new opportunities. Stay ahead in the job market by learning cutting-edge skills that employers value the most.",
    },
    {
      icon: earth,
      title: "Learn in Your Own Pace",
      description:
        "Enjoy flexible, self-paced learning that fits your schedule. Learn at your convenience and achieve better results with a personalized approach to education.",
    },
    {
      icon: laptop,
      title: "Learn From Industry Experts",
      description:
        "Gain knowledge from experienced professionals who bring real-world expertise to your learning journey. Their proven teaching methods help you master skills faster and more effectively.",
    },
    {
      icon: verify,
      title: "Enjoy Learning From Anywhere",
      description:
        "Access high-quality education anytime, anywhere! Our online learning platform lets you study from any location, giving you the freedom and flexibility to learn at your convenience.",
    },
  ];

  return (
    <section className="text-center py-16" data-aos="fade-up">
      <span className="text-sm text-red-500 font-semibold">
        EDUCATION FOR EVERYONE
      </span>

      <h1
        className="text-black font-bold text-4xl sm:text-6xl lg:text-7xl"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        Affordable Online Courses and Learning Opportunities
        <span className="mr-2"></span>
      </h1>

      <p className="mt-8 text-base text-black sm:text-xl">
        Unlock endless learning possibilities with affordable online courses and
        flexible learning opportunities. Learn at your own pace and discover
        smarter,
        <br /> faster ways to gain knowledge compared to traditional methods.
        Experience the power of eLearning and transform your future!
      </p>

      <div
        className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl text-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex flex-col justify-between h-full"
            data-aos="flip-left"
            data-aos-delay={index * 200}
          >
            {/* Icon */}
            <img
              src={feature.icon}
              alt={feature.title}
              className="w-16 h-16 mx-auto mb-4 transform transition-all duration-300 hover:scale-110"
              data-aos="zoom-in"
            />

            {/* Title */}
            <h4
              className="text-lg font-semibold text-gray-900 mb-2"
              style={{ fontFamily: "Quicksand" }}
            >
              {feature.title}
            </h4>

            {/* Description */}
            <p
              className="text-gray-600 text-sm mb-4"
              style={{ fontFamily: "Nunito" }}
            >
              {feature.description}
            </p>

            {/* Button */}
            <a
              href="/courses"
              className="bg-[#4ADE80] text-white font-medium px-6 py-2 rounded-full transition-all duration-300 hover:bg-[#57ad58] hover:scale-105 shadow-md inline-block mt-auto"
              style={{ textDecoration: "none" }}
              data-aos="fade-up"
            >
              Start Now!
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
