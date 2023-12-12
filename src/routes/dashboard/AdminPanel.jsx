import React, { useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import Dashboard from "./dashboard";
import EkipaComponent from "./EkipaComponent";
import "./AdminPanel.css"; // Import CSS file for styling
import TTable from "./TTable";
import Instagram from "./Instagram";

const AdminPanel = () => {
    const [selectedComponent, setSelectedComponent] = useState(null);
  
    const handleButtonClick = (component) => {
      setSelectedComponent(component);
    };
  
    return (
      <div className="admin-panel">
        <div className="sidebar">
          <button className="adminpanelbutton" onClick={() => handleButtonClick(null)}>PONUDBA</button>
          <button className="adminpanelbutton" onClick={() => handleButtonClick("ekipa")}>EKIPA</button>
          <button className="adminpanelbutton" onClick={() => handleButtonClick("urnik")}>URNIK</button>
          <button className="adminpanelbutton" onClick={() => handleButtonClick("ig")}>INSTAGRAM</button>

        </div>
        <div className="content">
        {selectedComponent === "ekipa" ? (
          <EkipaComponent />
        ) : selectedComponent === "urnik" ? (
          <TTable />
        ): selectedComponent === "ig" ? (
          <Instagram/>
        )  : (
          <Dashboard />
        )}
        </div>
      </div>
    );
  };
  
  export default AdminPanel;