import { lazy, useEffect, Suspense } from "react";
const ExpertSkills = lazy(() => import("../../components/about/ExpertSkills"));
const StatsSection = lazy(() => import("../../components/about/StatsSection"));
const Testimonials = lazy(() => import("../../components/about/Testimonials"));
const FAQ = lazy(() => import("../../components/about/Faq"));
import Banner from "../../components/Banner";
// import TeamMembers from "../../components/about/TeamMembers";
import bannerImg from "../../assets/images/ghibli1.png";
import SpinnerLoader from "../../components/Loader";
// import FoundersMessage from "../../components/about/FoundersMessage"
const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative container-fluid mt-5 overflow-hidden">
      {/* Abstract SVG Background */}
      <div className="absolute inset-0 -z-10">
        {/* Top Left Blob */}
        <svg
          className="absolute top-[-50px] left-[-50px] w-64 h-64 opacity-30"
          viewBox="0 0 400 400"
          xmlns="http://www.w3.org/2000/svg"
          fill="#82B1FF"
        >
          <circle cx="200" cy="200" r="150" />
        </svg>

        {/* Bottom Right Blob */}
        <svg
          className="absolute bottom-[-80px] right-[-60px] w-80 h-80 opacity-20"
          viewBox="0 0 400 400"
          xmlns="http://www.w3.org/2000/svg"
          fill="#FFAB91"
        >
          <rect x="50" y="50" width="300" height="300" rx="50" />
        </svg>

        {/* Center Circle */}
        <svg
          className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-40 h-40 opacity-20"
          viewBox="0 0 400 400"
          xmlns="http://www.w3.org/2000/svg"
          fill="#F48FB1"
        >
          <circle cx="200" cy="200" r="120" />
        </svg>

        {/* Subtle Waves */}
        <svg
          className="absolute top-1/4 left-1/4 w-96 h-96 opacity-10"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          fill="#8E24AA"
        >
          <path d="M56.2,-60.1C72.3,-52.3,83.6,-31.5,80.7,-13.7C77.8,4.1,60.8,19.1,46.3,31.2C31.9,43.4,19.9,52.7,4.2,54.6C-11.6,56.6,-23.1,51.1,-34,42.2C-44.9,33.2,-55.3,21,-58.3,6.5C-61.2,-8,-56.8,-24.9,-47.1,-37.2C-37.4,-49.6,-22.4,-57.3,-4.6,-60.7C13.2,-64.2,26.3,-63.3,56.2,-60.1Z" />
        </svg>

        {/* Floating Triangles */}
        <svg
          className="absolute top-[20%] right-[10%] w-12 h-12 opacity-40"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          fill="#FFD54F"
        >
          <polygon points="50,15 90,85 10,85" />
        </svg>

        <svg
          className="absolute bottom-[10%] left-[10%] w-16 h-16 opacity-40"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          fill="#4FC3F7"
        >
          <polygon points="50,15 90,85 10,85" />
        </svg>
      </div>

      {/* Content */}
      <div className="container">
        <div style={{ marginTop: "2rem" }}>
          <Banner text="About Us" imageUrl={bannerImg} />
        </div>
        <Suspense
          fallback={
            <div>
              <SpinnerLoader />
            </div>
          }
        >
          <ExpertSkills />
        </Suspense>

        <Suspense
          fallback={
            <div>
              <SpinnerLoader />
            </div>
          }
        >
          <StatsSection />
        </Suspense>

        {/* <TeamMembers /> */}
        <Suspense
          fallback={
            <div>
              <SpinnerLoader />
            </div>
          }
        >
          <Testimonials />
        </Suspense>

        {/* <FoundersMessage/> */}
        <Suspense
          fallback={
            <div>
              {" "}
              <SpinnerLoader />
            </div>
          }
        >
          <FAQ />
        </Suspense>
      </div>
    </div>
  );
};

export default About;
