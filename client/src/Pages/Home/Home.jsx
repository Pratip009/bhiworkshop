// src/components/Home.js

import { lazy, Suspense } from "react";
import SpinnerLoader from "../../components/Loader";

// Lazy loaded components

const PopularCourses = lazy(() =>
  import("../../components/HomeComponents/PopularCourses")
);

const FloatingButtons = lazy(() =>
  import("../../components/HomeComponents/FloatingButtons")
);
const Home = () => {
  return (
    <div className="container-fluid space-y-4 overflow-hidden bg-white text-black min-h-screen">
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
