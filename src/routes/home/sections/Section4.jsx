import React, { useEffect, useState, useRef } from "react";
import "../sections/Section4.css";
import Axios from "axios";
import Facebook from "../../../assets/images/images/Facebook.svg";
import Instagram from "../../../assets/images/images/Instagram.svg";
import Slika from "../sections/slika2.jpg";
const Section4 = () => {
  return (
    <div className="Scroll" id="sec4">
      <div className="sekcija4-postavitev">
        <div className="postavitev-slika4">
          <img src={Slika} alt="Image description" className="image-section4" />
        </div>
        <div className="postavitev-text4">
          <h1 className="sekcija4-naslov">Začni zdaj!</h1>
          <p className="besedilo4">24/7 Open Gym</p>
          <button className="section4-button">Prijava na termin</button>
          <div className="sekcija4-socials">
            <img
              src={Facebook} // Replace IconMenuClosed with the actual image source
              alt="Menu Icon"
              className="facebook-icon-img4"
              width="40"
              height="40"
            />

            <img
              src={Instagram} // Replace IconMenuClosed with the actual image source
              alt="Menu Icon"
              className="instagram-icon-img4"
              width="40"
              height="40"
            />
          </div>
          <div className="email4">info@centergibanja.si</div>
        </div>
      </div>
    </div>
  );
};

export default Section4;
