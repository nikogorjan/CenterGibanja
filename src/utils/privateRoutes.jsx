import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "./authContext";
import { useContext } from "react";

const PrivateRoutes = () => {
  //let auth = { token: false };
  const { auth } = useContext(AuthContext);
  return auth.token ? <Outlet /> : <Navigate to="/admin" />;
};

export default PrivateRoutes;
