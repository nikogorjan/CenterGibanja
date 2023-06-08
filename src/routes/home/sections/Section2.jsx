import React, { useEffect, useState, useRef } from "react";
import "../sections/Section2.css";
import Axios from "axios";
import Slika1 from "../sections/Section_2_01.jpg";
import Slika2 from "../sections/Section_2_02.jpg";

const Section2 = () => {
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);
  const [animationTriggered, setAnimationTriggered] = useState(false);

  useEffect(() => {
    const mediaQuery1 = window.matchMedia("(max-width: 850px)");
    const mediaQuery2 = window.matchMedia("(min-height: 650px)");

    const handleResize = () => {
      setIsMobile(mediaQuery1.matches && mediaQuery2.matches);
    };

    handleResize();

    mediaQuery1.addListener(handleResize);
    mediaQuery2.addListener(handleResize);

    return () => {
      mediaQuery1.removeListener(handleResize);
      mediaQuery2.removeListener(handleResize);
    };
  }, []);

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
    <div className="Scroll" ref={sectionRef}>
      <div className="textPosition2">
        {isMobile ? (
          <>
            <div className="napis_sekcija2">
              <div className="napis2slider">
                <h1 className="napis2">NAJDI SVOJE MEJE IN JIH PRESTOPI!</h1>
              </div>
              <div className="besedilo2slider">
                <p className="besedilo2">
                  Kolikokrat je “ne zmorem” zgolj izgovor za “nisem poskusil”?
                  Sprejmi odločitev, stori potezo. Manj govori in več treniraj,
                  a treniraj z glavo.
                </p>
              </div>
            </div>
            <div className="mobileimg">
              <div className="slika1">
                <img src={Slika1} alt="Image description" className="image1" />
              </div>
              <div className="slika2">
                <img src={Slika2} alt="Image description" className="image1" />
              </div>
            </div>
          </>
        ) : (
          <div className="textPositionInner2">
            <div className="slika1">
              <img src={Slika1} alt="Image description" className="image1" />
            </div>
            <div className="slika2">
              <img src={Slika2} alt="Image description" className="image1" />
            </div>
            <div className="napis_sekcija2">
              <div className="napis2slider">
                {" "}
                <h1 className="napis2">NAJDI SVOJE MEJE IN JIH PRESTOPI!</h1>
              </div>
              <div className="besedilo2slider">
                <p className="besedilo2">
                  Kolikokrat je “ne zmorem” zgolj izgovor za “nisem poskusil”?
                  Sprejmi odločitev, stori potezo. Manj govori in več treniraj,
                  a treniraj z glavo.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Section2;
