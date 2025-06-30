import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Headers/Header";
import PaymentOptions from "./Pages/Payment/PaymentOption";
import Footer from "./components/Footer/Footer";
import Home from "./Pages/Home/Home";
import Courses from "./Pages/Courses/Courses";
import CourseDetail from "./Pages/Courses/CourseDetail";
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";
import "aos/dist/aos.css";
import { useEffect } from "react";
import AOS from "aos";
import PaymentAccept from "./Pages/Payment/PaymentAccept";
import PaymentSuccess from "./Pages/Payment/PaymentSuccess";
import Blog from "./Pages/Blog/Blog";
import BlogDetails from "./Pages/Blog/BlogDetails";
import Gallery from "./Pages/Gallery/Gallery";
import AdminDashboard from "./components/Admin/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import AddCourse from "./components/Admin/AddCourse";
import AddBlog from "./components/Admin/AddBlog";
import AddGalleryImage from "./components/Admin/AddGalleryImage";
import Profile from "./Pages/Profile/Profile";
import TermsAndConditions from "./Pages/TermsAndConditions";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import Payment from "./components/Admin/Payment";
const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/workshops" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetails />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/payment/:id" element={<PaymentAccept />} />
            <Route path="/payment-options" element={<PaymentOptions />} />
            <Route path="/success" element={<PaymentSuccess />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/terms-and-conditions"
              element={<TermsAndConditions />}
            />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />

            <Route
              path="/profile"
              element={
                <ProtectedRoute roles={["user", "admin"]}>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute roles={["user", "admin"]}>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-course"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <AddCourse />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payments"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <Payment />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-images"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <AddGalleryImage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-blog"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <AddBlog />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
