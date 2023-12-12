import React, { useEffect, useState, useRef,useContext } from "react";
import "../sections/Section2.css";
import Axios from "axios";
import Slika1 from "../sections/projekt1.png";
import Slika2 from "../sections/projekt2.png";
import Section2Slides from "./Section2Slides";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { SelectedDataContext } from './SelectedDataContext';
import SelectedDataComponent from "./SelectedDataComponent";

SwiperCore.use([Navigation, Pagination]);

const Section2 = () => {
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);
  const [animationTriggered, setAnimationTriggered] = useState(false);
  const [showSection2Slides, setShowSection2Slides] = useState(false);
  const [slideSection2Left, setSlideSection2Left] = useState(false);
  const swiperRef = useRef(null);
  const { selectedData } = useContext(SelectedDataContext);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSlideChange = () => {
    setShowSection2Slides(true);
  };

  const handleButtonClick = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const handleItemClick = (item) => {
    setTimeout(() => {
      handleButtonClick();
    }, 0);
  };

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
    <div className="Scroll section-container">
      <Swiper
        ref={swiperRef}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        
        onSlideChange={handleSlideChange}
      >
        <SwiperSlide id="swiperslideid">
          <div
            className={`Scroll ${slideSection2Left ? "slide-left" : ""}`}
            ref={sectionRef}
          >
            <div className="textPosition2">
              {isMobile ? (
                <>
                  <div className="napis_sekcija2">
                    <div className="napis2slider">
                      <h1 className="napis2">NAJDI SVOJE MEJE IN JIH PRESTOPI!</h1>
                    </div>
                    <div className="besedilo2slider">
                      <p className="besedilo2">
                        Center gibanja omogoča različne pristope k vadbi, saj lahko treniraš individualno, v skupini pod strokovnim nadzorom ali samostojno.
                      </p>
                    </div>
                    <button className="buttononas" onClick={handleButtonClick}>
                      Kdo smo
                    </button>
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
                      <h1 className="napis2">NAJDI SVOJE MEJE IN JIH PRESTOPI!</h1>
                    </div>
                    <div className="besedilo2slider">
                      <p className="besedilo2">
                        Center gibanja je zasnovan tako, da lahko treniraš individualno ali v skupini pod strokovnim nadzorom ali samostojno.
                      </p>
                    </div>
                    <button className="buttononas" onClick={handleButtonClick}>
                      Kdo smo
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="section2-slides-container">
            <Section2Slides onItemClicked={handleItemClick}/>
          </div>
        </SwiperSlide>
        {selectedData && <SwiperSlide>
          <SelectedDataComponent selectedData={selectedData}/>
        </SwiperSlide>}

        
      </Swiper>
    </div>
  );
};

export default Section2;