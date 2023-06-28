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
        <div className="email4">info@centergibanja.si</div>
        <div className="phone4">+386 41 752 460</div>
  
        <div className="sekcija4-socials">
          <img
            src={Facebook}
            alt="Menu Icon"
            className="facebook-icon-img4"
            width="40"
            height="40"
          />
  
          <img
            src={Instagram}
            alt="Menu Icon"
            className="instagram-icon-img4"
            width="40"
            height="40"
          />
        </div>
      </div>
    );
  };
  
  export default Section5;
