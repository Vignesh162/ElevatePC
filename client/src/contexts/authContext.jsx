// contexts/AuthContext.js
import { createContext, useState, useEffect } from "react";
const backendApiURL = import.meta.env.VITE_BACKEND_API_URL || "http://localhost:4000/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(false);

  // JWT decoding function
  const decodeJWT = (token) => {
    if (!token || typeof token !== 'string') {
      console.error('Invalid token provided');
      return null;
    }

    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid JWT format');
      }

      const payload = parts[1];
      const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
      const decodedPayload = JSON.parse(atob(base64));

      // console.log('Decoded JWT Payload:', decodedPayload);
      
      const currentTime = Math.floor(Date.now() / 1000);
      // console.log('Current time (seconds):', currentTime);
      // console.log('Token expiration time:', decodedPayload.exp);
      // console.log('Time until expiration:', decodedPayload.exp - currentTime, 'seconds');
      // console.log('Is token expired?', currentTime >= decodedPayload.exp);

      return {
        id: decodedPayload.id,
        name: decodedPayload.name,
        role: decodedPayload.role,
        exp: decodedPayload.exp,
        iat: decodedPayload.iat
      };

    } catch (error) {
      console.error('Error decoding JWT:', error);
      return null;
    }
  };

  // Save to localStorage and decode user from token
  useEffect(() => {
    if (token) {
      const decodedUser = decodeJWT(token);
      if (decodedUser) {
        setUser(decodedUser);
        localStorage.setItem("user", JSON.stringify(decodedUser));
        localStorage.setItem("token", token);
      } else {
        console.warn('Invalid token, clearing auth data');
        setToken(null);
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    } else {
      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }, [token]);

  // Check if JWT token is expired
  const isTokenExpired = () => {
    if (!user || !user.exp) {
      console.log('No user or exp - cannot determine expiration');
      return false;
    }
    
    const currentTime = Math.floor(Date.now() / 1000);
    const isExpired = currentTime >= user.exp;
    
    // console.log('Expiration check:', {
    //   hasUser: !!user,
    //   hasExp: !!user.exp,
    //   currentTime,
    //   userExp: user.exp,
    //   isExpired
    // });
    
    return isExpired;
  };

  // Login user
  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${backendApiURL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Login failed");
      }
      
      const data = await res.json();
      
      if (data.token) {
        setToken(data.token);
      } else {
        throw new Error("No token received from server");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Register user
  const register = async (name, email, password) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${backendApiURL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Register failed");
      }
      
      const data = await res.json();
      
      if (data.id) {
        await login(email, password);
      } else {
        throw new Error("Registration failed - no user data received");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  // Auto-logout if token is expired
  useEffect(() => {
    
    if (user && token) {     
      const checkTokenExpiry = () => {
        if (isTokenExpired()) {
          console.log('Token expired, logging out');
          logout();
        }
      };
      checkTokenExpiry();
      const interval = setInterval(checkTokenExpiry, 30000);
      return () => {
        clearInterval(interval);
      };
    } 
  }, [user, token]);

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      login, 
      register, 
      logout,
      isLoading,
      isAuthenticated: !!token && !isTokenExpired()
    }}>
      {children}
    </AuthContext.Provider>
  );
}