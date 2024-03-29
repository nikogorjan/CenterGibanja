import React, { useRef, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Pages from "./routes/home/Pages";
import {
  Routes,
  Route,
  BrowserRouter as Router,
  useNavigate,
} from "react-router-dom";
import Admin from "./routes/admin/admin";
import Dashboard from "./routes/dashboard/dashboard";
import PrivateRoutes from "./utils/privateRoutes";
import { AuthProvider } from "./utils/authContext";
import Ponudba from "./routes/ponudba/ponudba";
import Kontakt from "./routes/kontakt/kontakt";
import SwiperComponent from "./routes/ponudba/swiperComponent";
import Prijava from "./routes/prijava/Prijava";
import AdminPanel from "./routes/dashboard/AdminPanel";
import TimesTable from "./routes/urnik/Urnik";
import CreateEventWithNoOverlap from "./routes/urnik/Urnik";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Pages />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/kontakt" element={<Kontakt />} />
      <Route path="/ponudba" element={<SwiperComponent />} />
      <Route path="/prijava" element={<Prijava />} />
      <Route path="/urnik" element={<TimesTable />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/dashboard" element={<AdminPanel />} />
      </Route>
    </Routes>
  );
}

export default App;
