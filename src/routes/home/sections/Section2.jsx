import React, { useEffect, useState, useRef } from "react";
import "../sections/Section2.css";
import Axios from "axios";

const Section2 = () => {
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);
  const [animationTriggered, setAnimationTriggered] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 850 && window.innerHeight > 650);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
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
    <div className="Scroll" id="bg1" ref={sectionRef}>
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
                <img
                  src="src/routes/home/sections/Section_2_01.jpg"
                  alt="Image description"
                  className="image1"
                />
              </div>
              <div className="slika2">
                <img
                  src="src/routes/home/sections/Section_2_02.jpg"
                  alt="Image description"
                  className="image1"
                />
              </div>
            </div>
          </>
        ) : (
          <div className="textPositionInner2">
            <div className="slika1">
              <img
                src="src/routes/home/sections/Section_2_01.jpg"
                alt="Image description"
                className="image1"
              />
            </div>
            <div className="slika2">
              <img
                src="src/routes/home/sections/Section_2_02.jpg"
                alt="Image description"
                className="image1"
              />
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
