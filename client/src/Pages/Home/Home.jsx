// src/components/Home.js

import { lazy, Suspense } from "react";
import SpinnerLoader from "../../components/Loader";

// Lazy loaded components
const HeroSection = lazy(() => import("../../components/HomeComponents/HeroSection"));
const FeaturesSection = lazy(() => import("../../components/HomeComponents/FeaturesSection"));
const BlogSection = lazy(() => import("../../components/HomeComponents/BlogSection"));
const BusinessInitiatives = lazy(() => import("../../components/HomeComponents/BusinessInitiative"));
const PopularCourses = lazy(() => import("../../components/HomeComponents/PopularCourses"));
const FlexibleStudySection = lazy(() => import("../../components/HomeComponents/FlexibleStudySection"));
const CertificationBanner = lazy(() => import("../../components/HomeComponents/CertificationBanner"));
const FloatingButtons = lazy(() => import("../../components/HomeComponents/FloatingButtons"));
const MissionVission = lazy(() => import("../../components/HomeComponents/MissionVission"));
const Home = () => {
  return (
    <div className="container-fluid space-y-4 overflow-hidden">
      <Suspense
        fallback={
          <div className="min-h-screen flex justify-center items-center">
            <SpinnerLoader size={45}/>
          </div>
        }
      >
        <HeroSection />
        <FeaturesSection />
        <BlogSection />
        <BusinessInitiatives />
        {/* <CourseCard /> */}
        <PopularCourses />
        <FlexibleStudySection />
        <MissionVission/>
        <CertificationBanner />
        <FloatingButtons />
      </Suspense>
    </div>
  );
};

export default Home;
