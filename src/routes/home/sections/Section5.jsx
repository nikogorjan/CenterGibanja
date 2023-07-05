import React, { useEffect, useState, useRef } from "react";
import "../sections/Section5.css";
import Axios from "axios";
import image from "../sections/slika1.jpg";
import { useNavigate } from "react-router-dom";
import video from "../sections/gymVideo.mp4";
import Facebook from "../../../assets/images/images/Facebook.svg";
import Instagram from "../../../assets/images/images/Instagram.svg";
import Slika from "../sections/Slika2.jpg";

const Section5 = () => {
    const videoRef = useRef(null);
    const [isUserInteracted, setIsUserInteracted] = useState(false);
  
    const handlePlayVideo = () => {
      setIsUserInteracted(true);
      videoRef.current.play();
    };
  
    useEffect(() => {
      if (isUserInteracted) {
        videoRef.current.play();
      }
    }, [isUserInteracted]);

    const handleMobileNumberClick = () => {
      window.location.href = "tel:+386 31 643 234"; // Replace with your mobile number
    };
  
    const handleEmailClick = () => {
      window.location.href = "mailto:info@centergibanja.si"; // Replace with your email address
    };
  
    return (
      <div className="Scroll" id="sec5">
        <div className="sekcija5-naslov">PRIDRUŽITE SE NAM</div>
        <div className="video5">
          <video
            ref={videoRef}
            controls
            
            onClick={handlePlayVideo}
          >
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div onClick={handleEmailClick} className="email4">info@centergibanja.si</div>
        <div onClick={handleMobileNumberClick} className="phone4">+386 41 752 460</div>

        
        <div className="sekcija4-socials">
        <a className="social-link" href="https://www.facebook.com/Mocgibanja"
                target="_blank"
                rel="noopener noreferrer">
          <img
            src={Facebook}
            alt="Menu Icon"
            className="facebook-icon-img4"
            width="40"
            height="40"
          />
          </a>

          <a className="social-link" href="https://www.instagram.com/center_gibanja_murskasobota/"
                target="_blank"
                rel="noopener noreferrer">
          <img
            src={Instagram}
            alt="Menu Icon"
            className="instagram-icon-img4"
            width="40"
            height="40"
          />
          </a>
        </div>
      </div>
    );
  };
  
  export default Section5;
