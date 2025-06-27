import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ClerkProvider } from "@clerk/clerk-react";

createRoot(document.getElementById("root")).render(
  <ClerkProvider publishableKey="pk_test_Y2xvc2luZy1zdGluZ3JheS05NS5jbGVyay5hY2NvdW50cy5kZXYk">
    <App />
  </ClerkProvider>
);
// pk_test_Y2xvc2luZy1zdGluZ3JheS05NS5jbGVyay5hY2NvdW50cy5kZXYk
