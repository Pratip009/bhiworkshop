/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded Token on Load:", decoded); // Debugging
        return {
          id: decoded.id || null,
          username: decoded.username || "Guest",
          email: decoded.email || "No Email",
          role: decoded.role || "user",
        };
      } catch (error) {
        console.error("Invalid token", error);
        localStorage.removeItem("token");
      }
    }
    return null;
  });

  useEffect(() => {
    console.log("User data from context:", user);
  }, [user]);

  const login = (token) => {
    try {
      const decoded = jwtDecode(token);
      console.log("Decoded Token on Login:", decoded);
  
      setUser({
        id: decoded.id,
        username: decoded.username || "Guest",
        email: decoded.email || "No Email",
        role: decoded.role,
      });
  
      localStorage.setItem("token", token);
    } catch (error) {
      console.error("Invalid token", error);
    }
  };
  

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
