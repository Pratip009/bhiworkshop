import { motion } from "framer-motion";

// eslint-disable-next-line react/prop-types
const Banner = ({ text, imageUrl }) => {
  return (
    <div
      className="relative w-full h-80 flex items-center justify-center rounded-2xl overflow-hidden shadow-lg bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage: `url(${imageUrl})`, // Dynamically set the background image
      }}
    >
      {/* Overlay for better text visibility */}
      <div className="absolute w-full h-full bg-black/40"></div>

      {/* Main Text Animation */}
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          ease: "easeOut",
        }}
        className="text-5xl font-bold text-white z-10 text-center"
        style={{
          fontFamily: "Quicksand",
          fontWeight: "800",
          textShadow: "4px 4px 12px rgba(0, 0, 0, 0.6)", // Adds depth to the text
        }}
      >
        {text}
      </motion.h1>

      {/* SVG Animation 1 - Floating circle */}
      <motion.div
        className="absolute w-40 h-40 bg-white/50 rounded-full top-10 left-10 hidden sm:block"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [1, 0.7, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* SVG Animation 2 - Smaller floating circle */}
      <motion.div
        className="absolute w-32 h-32 bg-white/30 rounded-full bottom-10 right-10 hidden sm:block"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [1, 0.7, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default Banner;
