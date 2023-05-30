import React, { useEffect, useState, useRef } from "react";
import "../sections/Section3.css";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const Section3 = () => {
  const sectionRef = useRef(null);
  const [animationTriggered, setAnimationTriggered] = useState(false);
  const navigate = useNavigate();
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const handlePonudbaClick = () => {
    setIsOverlayVisible(true);

    setTimeout(() => {
      navigate("/ponudba");
    }, 1000);
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.03, // Trigger when 50% of the section is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animationTriggered) {
          entry.target.classList.add("animate-section");
          setAnimationTriggered(true); // Set animationTriggered to true once animation is triggered
        } else {
          entry.target.classList.remove("animate-section");
        }
      });
    }, options);

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div className="Scroll" id="sec3" ref={sectionRef}>
      <div className="sekcija3-postavitev">
        <div className="postavitev-text">
          <div className="sekcija3-naslov-slider">
            <h1 className="sekcija3-naslov">
              USTVARJAMO MOČ, VZDRŽLJIVOST IN NEVERJETNE DOSEŽKE!
            </h1>
          </div>
          <div className="besedilo33-slider">
            <p className="besedilo33">
              Na več kot 500 kvadratnih metrih prostora vam ponujamo popolno
              telovadno izkušnjo, ki združuje crossfit, funkcionalno vadbo,
              dvigovanje uteži in druge vadbene programe. Pridružite se nam
              lahko tudi pri skupinski ali individualni vadbi.
            </p>
          </div>
          <button className="section3-button" onClick={handlePonudbaClick}>
            Ponudba
          </button>
        </div>
        <div className="postavitev-animacija">
          <div className="box">
            <span style={{ "--i": "1" }}>
              <img
                src="src/routes/home/sections/gym.jpg"
                alt="Image description"
                className="image-section3"
              />
            </span>
            <span style={{ "--i": "2" }}>
              <img
                src="src/routes/home/sections/gym.jpg"
                alt="Image description"
                className="image-section3"
              />
            </span>
            <span style={{ "--i": "3" }}>
              <img
                src="src/routes/home/sections/gym.jpg"
                alt="Image description"
                className="image-section3"
              />
            </span>
            <span style={{ "--i": "4" }}>
              <img
                src="src/routes/home/sections/gym.jpg"
                alt="Image description"
                className="image-section3"
              />
            </span>
            <span style={{ "--i": "5" }}>
              <img
                src="src/routes/home/sections/gym.jpg"
                alt="Image description"
                className="image-section3"
              />
            </span>
            <span style={{ "--i": "6" }}>
              <img
                src="src/routes/home/sections/gym.jpg"
                alt="Image description"
                className="image-section3"
              />
            </span>
            <span style={{ "--i": "7" }}>
              <img
                src="src/routes/home/sections/gym.jpg"
                alt="Image description"
                className="image-section3"
              />
            </span>
            <span style={{ "--i": "8" }}>
              <img
                src="src/routes/home/sections/gym.jpg"
                alt="Image description"
                className="image-section3"
              />
            </span>
          </div>
        </div>
      </div>
      {isOverlayVisible && <div className="overlay drop"></div>}
    </div>
  );
};

export default Section3;
