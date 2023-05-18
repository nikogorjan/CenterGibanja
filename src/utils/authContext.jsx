import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: false });
  const navigate = useNavigate();

  const updateAuth = () => {
    console.log("changing token");
    setAuth({ token: true });
    console.log(auth);
  };

  useEffect(() => {
    console.log(auth.token);
    if (auth.token == true) {
      navigate("/dashboard");
    }
  }, [auth.token, navigate]);

  return (
    <AuthContext.Provider value={{ auth, updateAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
