import React, { useState } from "react";
import "../sections/Section4.css";
import Axios from "axios";
import Facebook from "../../../assets/images/images/Facebook.svg";
import Instagram from "../../../assets/images/images/Instagram.svg";
import Slika from "../sections/Slika2.jpg";
import Insta1 from "../sections/insta1.jpg";
import Insta2 from "../sections/insta2.jpg";
import Insta3 from "../sections/insta3.jpg";
import { useNavigate } from "react-router-dom";

const Section4 = () => {
  const [activeRotate, setActiveRotate] = useState(null);
  const navigate = useNavigate();
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const handleRotateHover = (index) => {
    setActiveRotate(index);
  };

  const handlePrijavaClick = () => {
    setIsOverlayVisible(true);

    setTimeout(() => {
      navigate("/prijava");
    }, 1000);
  };

  return (
    <div className="Scroll" id="sec4">
      <div className="sekcija4-postavitev2">
        <div className="sekcija4-postavitev">
          <div className="sekcija4-instagram">
            <h1 className="sekcija4-naslov">NAŠ INSTAGRAM</h1>
            <div className="insta-row">
              <a
                href="https://www.instagram.com/center_gibanja_murskasobota/"
                target="_blank"
                rel="noopener noreferrer"
                className={`insta-slika1 rotate ${activeRotate === 0 ? "active" : "inactive"
                  }`}
                style={{
                  backgroundImage: `url(${Insta1})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                onMouseEnter={() => handleRotateHover(0)}
                onMouseLeave={() => handleRotateHover(null)}
              ></a>

              <div className="insta-column">
                <a
                href="https://www.instagram.com/center_gibanja_murskasobota/"
                target="_blank"
                rel="noopener noreferrer"
                  className={`insta-slika2 rotate ${activeRotate === 1 ? "active" : "inactive"
                    }`}
                  style={{
                    backgroundImage: `url(${Insta2})`,
                    backgroundSize: "cover", // Adjust the background size as needed
                    backgroundPosition: "center", // Adjust the background position as needed
                  }}
                  onMouseEnter={() => handleRotateHover(1)}
                  onMouseLeave={() => handleRotateHover(null)}
                ></a>
                <a
                href="https://www.instagram.com/center_gibanja_murskasobota/"
                target="_blank"
                rel="noopener noreferrer"
                  className={`insta-slika3 rotate ${activeRotate === 2 ? "active" : "inactive"
                    }`}
                  style={{
                    backgroundImage: `url(${Insta3})`,
                    backgroundSize: "cover", // Adjust the background size as needed
                    backgroundPosition: "center", // Adjust the background position as needed
                  }}
                  onMouseEnter={() => handleRotateHover(2)}
                  onMouseLeave={() => handleRotateHover(null)}
                ></a>
              </div>
            </div>
          </div>
          <div className="postavitev-text4">
            <div className="naslov4-posta" id="posta4">
              <h1 className="sekcija4-naslov">VSAK ZAČETEK JE TEŽAK</h1>
            </div>
            <p className="besedilo4" id="besedilo44">
            Brez skrbi! V našem centru se ne prične z vadbo takoj. Prednost dajemo temu, da najprej spoznamo posameznike in jih temeljito diagnosticiramo. Naš pristop se začne s sproščenim klepetom ob kavi, kjer skupaj postavimo cilje, nato pa se lotimo vadbe. Vabimo te, da se prijaviš na brezplačen posvet in postaneš del naše skupnosti.
            </p>
            <button className="section4-button" onClick={handlePrijavaClick}>Prijava na vadbe</button>
          </div>
        </div>
        
      </div>
      {isOverlayVisible && <div className="overlay drop"></div>}
    </div>
  );
};

export default Section4;