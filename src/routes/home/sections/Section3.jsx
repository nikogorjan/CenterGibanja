import React, { useEffect, useState, useRef } from "react";
import "../sections/Section3.css";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import SlikaGym from "../sections/gym.jpg";

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
              USTVARJAMO SKUPNOST
            </h1>
          </div>
          <div className="besedilo33-slider">
            <p className="besedilo33">
            V našem centru se osredotočamo na trening mladih športnikov, rekreativnih športnikov kot tudi starejših oseb, ki si želijo izboljšati svojo telesno kondicijo. Naše poslanstvo vključuje tudi kineziološko vadbo in rehabilitacijo po poškodbah. Za nas je pomembno, da ste se pripravljeni soočiti z realnostjo ter se odločiti za spremembo pod strokovnim nadzorom.
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
                src={SlikaGym}
                alt="Image description"
                className="image-section3"
              />
            </span>
            <span style={{ "--i": "2" }}>
              <img
                src={SlikaGym}
                alt="Image description"
                className="image-section3"
              />
            </span>
            <span style={{ "--i": "3" }}>
              <img
                src={SlikaGym}
                alt="Image description"
                className="image-section3"
              />
            </span>
            <span style={{ "--i": "4" }}>
              <img
                src={SlikaGym}
                alt="Image description"
                className="image-section3"
              />
            </span>
            <span style={{ "--i": "5" }}>
              <img
                src={SlikaGym}
                alt="Image description"
                className="image-section3"
              />
            </span>
            <span style={{ "--i": "6" }}>
              <img
                src={SlikaGym}
                alt="Image description"
                className="image-section3"
              />
            </span>
            <span style={{ "--i": "7" }}>
              <img
                src={SlikaGym}
                alt="Image description"
                className="image-section3"
              />
            </span>
            <span style={{ "--i": "8" }}>
              <img
                src={SlikaGym}
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
