const jwt = require("jsonwebtoken");

const auth =
  (roles = []) =>
  (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res
          .status(401)
          .json({ message: "No token, authorization denied" });
      }

      const token = authHeader.split(" ")[1];
      if (!process.env.JWT_SECRET) {
        console.error("JWT_SECRET is missing from environment variables!");
        return res.status(500).json({ message: "Internal server error" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      console.log("🔐 Decoded user in auth middleware:", decoded);
      console.log("🔐 Roles passed to auth():", roles);
      console.log("🔐 Decoded user role:", decoded.role);
      // ✅ Only check role if roles are provided
      // if (roles.length > 0 && !roles.includes(decoded.role)) {
      //   return res
      //     .status(403)
      //     .json({ message: "Access denied: Insufficient role" });
      // }

      req.user = decoded;
      next();
    } catch (error) {
      console.error("❌ Token Verification Error:", error);
      if (error.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ message: "Token expired, please login again" });
      } else if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Invalid token" });
      } else {
        return res.status(401).json({ message: "Authentication failed" });
      }
    }
  };

const adminAuth = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ error: "Access restricted to admins." });
  }
  next();
};

module.exports = { auth, adminAuth };
