import React, { useEffect, useState } from "react";
import "../sections/section1.css";
import Axios from "axios";
import image from "../sections/slika1.jpg";
import { useNavigate } from "react-router-dom";

const Section1 = () => {
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

 

  const handleKontaktClick = () => {
    setIsOverlayVisible(true);

    setTimeout(() => {
      navigate("/kontakt");
    }, 1000);
  };

  const handlePonudbaClick = () => {
    setIsOverlayVisible(true);

    setTimeout(() => {
      navigate("/ponudba");
    }, 1000);
  };

  return (
    <div className="Scroll fade-in" id="bg1">
      <div className="textPosition">
        <div className="textPositionInner">
          <div className="hookSlider">
            <h1 className="hook">TRENIRAJ 24/7</h1>
          </div>
          <div className="text1Slider">
            <div className="text1Slider">
              <p className="text1">
                Treniraj pod strokovnim nadzorom. Treniraj
                
                pametno. <br />Treningi prilagojeni za vsakogar.
              </p>
            </div>
          </div>
          <div className="buttonsSlider">
            <div className="buttons">
              <button className="button1" onClick={handlePonudbaClick}>
                <p className="buttonText1">Ponudba</p>
              </button>
              <button className="button2" onClick={handleKontaktClick}>
                <p className="buttonText1">Kontakt</p>
              </button>
            </div>
          </div>
        </div>
      </div>
      {isOverlayVisible && <div className="overlay drop"></div>}
    </div>
  );
};

export default Section1;
