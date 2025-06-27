/* eslint-disable react/prop-types */
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// Local video paths
const videoTestimonials = [
  { id: 1, src: "/videos/testimonial1.mp4" },
  { id: 2, src: "/videos/testimonial2.mov" },
];

const VideoTestimonialCard = ({ src, id }) => {
  return (
    <div
      className="relative group bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
      data-aos="zoom-in"
      data-aos-delay={id * 150}
    >
      <div className="relative flex flex-col p-4">
        <video
          controls
          className="rounded-2xl w-full h-auto"
          style={{ maxHeight: "400px" }}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

const TestimonialSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <div className="text-center">
            <p className="text-base text-black sm:text-xl">
              People have said how good Bright Horizon Institute
            </p>
            <h1
              className="text-4xl font-bold text-black sm:text-6xl lg:text-7xl"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              Our happy clients say about us
            </h1>
          </div>

          <div className="relative mt-10 md:mt-24">
            <div className="absolute -inset-x-1 inset-y-16 md:-inset-x-2 md:-inset-y-6">
              <div
                className="w-full h-full max-w-5xl mx-auto rounded-3xl opacity-30 blur-lg filter"
                style={{
                  background:
                    "linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)",
                }}
              ></div>
            </div>

            <div className="relative grid max-w-lg grid-cols-1 gap-6 mx-auto md:max-w-none lg:gap-10 md:grid-cols-2">
              {videoTestimonials.map((video) => (
                <VideoTestimonialCard key={video.id} id={video.id} src={video.src} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
