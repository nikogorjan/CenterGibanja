import React, { useState, useEffect, useRef } from "react";
import "./ponudba.css";
import Navbar from "../home/navbar/navbar";
import "../home/navbar/navbar.css";
import { motion, useMotionValue, useTransform } from "framer-motion";
import SwiperCarousel from "./swiper";
import backgroundImage from "./Ponudba_Slika.jpg";

const Ponudba = () => {
  const [width, setWidth] = useState(0);
  const carousel = useRef();
  const [currentSlide, setCurrentSlide] = useState(0); // Track current slide
  const [slideWidth, setSlideWidth] = useState(1240);
  const [isHovered, setIsHovered] = useState(false);
  const additionalButtonRef = useRef(null);
  const [selectedButton, setSelectedButton] = useState("Mesečna karta"); // State for tracking the selected button
  const [variable1, setVariable1] = useState("Vsak dan"); // Example variable 1
  const [variable2, setVariable2] = useState("39,90");

  const [selectedButton2, setSelectedButton2] = useState("2x tedensko"); // State for tracking the selected button
  const [variable3, setVariable3] = useState("Mesečna karta"); // Example variable 1
  const [variable4, setVariable4] = useState("80,00");

  const dragX = useMotionValue(0);
  const dragDistance = useTransform(dragX, [-width, 0, width], [-1, 0, 1]);

  useEffect(() => {
    const unsubscribeDragX = dragX.onChange((value) => {
      const newSlideIndex = Math.round(value / slideWidth);
      setCurrentSlide(newSlideIndex);
    });
    return () => {
      unsubscribeDragX();
    };
  }, [dragX, slideWidth]);

  const handleDragEnd = () => {
    const dragXValue = dragX.get();
    console.log("x value " + dragXValue);
    const currentSlideIndex = Math.round(-dragXValue / slideWidth);
    var targetSlideIndex = 0;
    if (currentSlideIndex == 0) {
      targetSlideIndex = 1;
    } else {
      targetSlideIndex = Math.min(
        Math.max(currentSlideIndex, 0),
        Math.floor(width / slideWidth)
      );
    }

    console.log(
      "current " + currentSlideIndex + " target: " + targetSlideIndex
    );
    const targetPosition = targetSlideIndex * slideWidth;
    setCurrentSlide(targetSlideIndex);
    console.log("target: " + targetPosition);
    console.log("dragx: " + dragXValue);

    carousel.current.scrollTo({
      left: targetPosition + dragXValue,
      behavior: "smooth",
    });
  };

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName); // Update the selected button state
    // Perform any other actions based on the selected button
    if (buttonName === "Mesečna karta") {
      setVariable1("Vsak dan");
      setVariable2("39,90");
    } else if (buttonName === "Vikend karta") {
      setVariable1("Petek - nedelja");
      setVariable2("16,90");
    } else if (buttonName === "Dopoldanska karta") {
      setVariable1("5:00 - 13:00");
      setVariable2("26,90");
    } else if (buttonName === "Nočna karta") {
      setVariable1("21:00 - 7:00");
      setVariable2("19,90");
    } else if (buttonName === "Dnevna karta") {
      setVariable1("Cel dan");
      setVariable2("5,90");
    }
    // Add conditions for other buttons as needed
  };

  const handleButtonClick2 = (buttonName) => {
    setSelectedButton2(buttonName); // Update the selected button state
    // Perform any other actions based on the selected button
    if (buttonName === "2x tedensko") {
      setVariable3("Mesečna karta");
      setVariable4("80,00");
    } else if (buttonName === "Neomejeno") {
      setVariable3("Mesečna karta");
      setVariable4("100,00");
    }
    // Add conditions for other buttons as needed
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    console.log("enter " + isHovered);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    const handleResize = () => {
      const screenWidth =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;

      const screenHeight =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;

      console.log(screenWidth, screenHeight);

      if (screenWidth > 1300) {
        setSlideWidth(1240); // Width for screens larger than or equal to 1920px
      } else if (screenWidth <= 1300 && screenWidth > 1024) {
        setSlideWidth(900); // Width for screens larger than or equal to 1080px
      } else if (
        screenWidth <= 1024 &&
        screenWidth > 717 &&
        screenHeight < 601
      ) {
        setSlideWidth(700); // Width for screens larger than or equal to 768px
      } else if (
        screenWidth <= 717 &&
        screenWidth > 317 &&
        screenHeight < 618
      ) {
        setSlideWidth(600); // Width for screens larger than or equal to 768px
      } else if (
        screenWidth <= 821 &&
        screenWidth > 451 &&
        screenHeight > 618
      ) {
        setSlideWidth(640); // Width for screens larger than or equal to 768px
      } else if (screenWidth <= 450 && screenHeight > 618) {
        setSlideWidth(284); // Width for screens larger than or equal to 768px
      } else {
        setSlideWidth(600); // Width for screens smaller than 768px (mobile)
      }
    };

    // Call handleResize initially to set slideWidth on component mount
    handleResize();

    // Add event listener to handle resize
    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    console.log(carousel.current.scrollWidth, carousel.current.offsetWidth);
    setWidth(3721);
  }, []);

  const handleSlideChange = (slideIndex) => {
    setCurrentSlide(slideIndex);
    console.log(slideIndex * slideWidth);
    carousel.current.scrollTo({
      left: slideIndex * slideWidth,
      behavior: "smooth",
    });
  };

  const handleNextSlide = () => {
    const nextSlide = currentSlide + 1;
    if (nextSlide <= 3) {
      setCurrentSlide(nextSlide);
      carousel.current.scrollTo({
        left: nextSlide * slideWidth,
        behavior: "smooth",
      });
    }
  };

  const handlePreviousSlide = () => {
    const nextSlide = currentSlide - 1;
    if (nextSlide >= 0) {
      setCurrentSlide(nextSlide);
      carousel.current.scrollTo({
        left: nextSlide * slideWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="ponudba-main">
      <div className="ponudba-animation"></div>
      <Navbar />

      {/*Test*/}

      <div className="ponudba-grid">
        <div className="ponudba-naslov-slider">
          <div className="ponudba-naslov" id="ponudba">
            PONUDBA
          </div>
        </div>
      </div>

      <div className="carousel-button-left" onClick={handlePreviousSlide}>
        <div className="line1"></div>
        <div className="line2"></div>
      </div>
      <div className="carousel-button-right" onClick={handleNextSlide}>
        <div className="line3"></div>
        <div className="line4"></div>
      </div>

      <div className="carousel-container">
        <motion.div
          ref={carousel}
          className={`carousel ${isHovered ? "hovered" : ""}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          whileTap={{ cursor: "grabbing" }}
        >
          <motion.div
            dragConstraints={{ right: 0, left: -width }}
            className="inner-carousel"
            style={{
              x: dragX,
            }}
          >
            <motion.div className="item absolute">
              <div className="image">
                <div className="image-div"></div>
                <div className="data-div">
                  <h1 className="data-header">24/7 Open Gym</h1>
                  <p className="data-paragraph">Treniraj kadar hočeš</p>
                  <div className="data-line"></div>
                  <div className="data-button-container">
                    <div className="button-column1">
                      <button
                        className={`data-button ${
                          selectedButton === "Mesečna karta" ? "selected" : ""
                        }`}
                        onClick={() => handleButtonClick("Mesečna karta")}
                      >
                        Mesečna karta
                      </button>
                      <button
                        className={`data-button ${
                          selectedButton === "Vikend karta" ? "selected" : ""
                        }`}
                        onClick={() => handleButtonClick("Vikend karta")}
                      >
                        Vikend karta
                      </button>
                      <button
                        className={`data-button ${
                          selectedButton === "Dopoldanska karta"
                            ? "selected"
                            : ""
                        }`}
                        onClick={() => handleButtonClick("Dopoldanska karta")}
                      >
                        Dopoldanska karta
                      </button>
                    </div>
                    <div className="button-column2">
                      <button
                        className={`data-button ${
                          selectedButton === "Nočna karta" ? "selected" : ""
                        }`}
                        onClick={() => handleButtonClick("Nočna karta")}
                      >
                        Nočna karta
                      </button>
                      <button
                        className={`data-button ${
                          selectedButton === "Dnevna karta" ? "selected" : ""
                        }`}
                        onClick={() => handleButtonClick("Dnevna karta")}
                      >
                        Dnevna karta
                      </button>
                    </div>
                    <div className="data-column">
                      <div className="napis">( {variable1} )</div>
                      <div className="cena">{variable2}€</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div className="item">
              <motion.div className="image">
                <div className="image-div"></div>
                <div className="data-div">
                  <h1 className="data-header">Skupinska vadba</h1>
                  <p className="data-paragraph">
                    Individualni program do 8 ljudi
                  </p>
                  <div className="data-line"></div>
                  <div className="data-button-container">
                    <div className="button-column1">
                      <button
                        className={`data-button ${
                          selectedButton2 === "2x tedensko" ? "selected" : ""
                        }`}
                        onClick={() => handleButtonClick2("2x tedensko")}
                      >
                        2x tedensko
                      </button>
                    </div>
                    <div className="button-column2">
                      <button
                        className={`data-button ${
                          selectedButton2 === "Neomejeno" ? "selected" : ""
                        }`}
                        onClick={() => handleButtonClick2("Neomejeno")}
                      >
                        Neomejeno
                      </button>
                    </div>
                    <div className="data-column">
                      <div className="napis">( {variable3} )</div>
                      <div className="cena">{variable4}€</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
            <motion.div className="item">
              <div className="image">
                <div className="image-div"></div>
                <div className="data-div">
                  <h1 className="data-header">Funkcionalna vadba</h1>
                  <p className="data-paragraph">Skupinska vadba do 15 ljudi</p>
                  <div className="data-line"></div>
                  <div className="data-button-container">
                    <div className="button-column1"></div>
                    <div className="button-column2"></div>
                    <div className="data-column">
                      <div className="napis">( Neomejeno )</div>
                      <div className="cena">60€</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div className="item">
              <div className="image">
                <div className="image-div"></div>
                <div className="data-div">
                  <h1 className="data-header">
                    Individualna vadba in vadba v paru
                  </h1>

                  <div className="data-line"></div>
                  <div className="data-button-container">
                    <div className="button-column1"></div>
                    <div className="button-column2"></div>
                    <div className="data-column">
                      <div className="napis">( Kontaktirajte nas )</div>
                      <div className="cena">Po dogovoru</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div className="item2">
              <div className="image2"></div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      <div className="dot-indicators">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className={`dot ${currentSlide === index ? "active" : ""}`}
            onClick={() => handleSlideChange(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Ponudba;
