import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// Counter Component
// eslint-disable-next-line react/prop-types
const Counter = ({ value, label, duration = 2000 }) => {
  const [count, setCount] = useState(1);

  useEffect(() => {
    let start = 1;
    const increment = value / (duration / 50); // Adjust speed
    const interval = setInterval(() => {
      start += increment;
      if (start >= value) {
        start = value;
        clearInterval(interval);
      }
      setCount(Math.floor(start));
    }, 50);

    return () => clearInterval(interval);
  }, [value, duration]);

  return (
    <div
      className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
      data-aos="fade-up" // AOS fade-up animation for the counter
    >
      <h2 className="text-5xl font-extrabold sm:text-6xl" style={{ color: '#fe4a55' }}>
        {count.toLocaleString()}+
      </h2>
      <p className="mt-3 text-lg font-medium text-gray-700 uppercase tracking-wide">
        {label}
      </p>
      <div className="w-16 h-1 bg-blue-600 mt-2 rounded-full"></div>
    </div>
  );
};

// Stats Section Component
const StatsSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duration of the animation
      easing: 'ease-in-out',
      once: true, // Animation happens only once
    });
  }, []);

  const stats = [
    { value: 56000, label: "Finished Sessions" },
    { value: 10000, label: "Enrolled Learners" },
    { value: 50, label: "Expert Instructors" },
    { value: 100, label: "Satisfaction Rate" },
  ];

  return (
    <div className="bg-gray-100 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat, index) => (
          <Counter key={index} value={stat.value} label={stat.label} />
        ))}
      </div>
    </div>
  );
};

export default StatsSection;
