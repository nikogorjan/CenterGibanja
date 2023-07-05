import React, { useEffect, useState } from "react";
import "./kontakt.css";
import Navbar from "../home/navbar/navbar";
import "../home/navbar/navbar.css";
import LoadingPage from "../home/loadingPage/loadingPage";
import LoadingPageMenu from "../home/loadingPage/loadingPageMenu";
import Slika from "../kontakt/Slika2.jpg";

const Kontakt = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Adjust the duration as needed
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 899);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMobileNumberClick = () => {
    window.location.href = "tel:+386 31 643 234"; // Replace with your mobile number
  };

  const handleEmailClick = () => {
    window.location.href = "mailto:info@centergibanja.si"; // Replace with your email address
  };

  const handleLocationClick = () => {
    window.open(
      "https://www.google.com/maps/place/Plese+2,+9000+Murska+Sobota/@46.6582915,16.1743139,17z/data=!3m1!4b1!4m6!3m5!1s0x476f3edd3d038ae1:0xf6198a935e5a661!8m2!3d46.6582915!4d16.1765026!16s%2Fg%2F11crx0fx8d"
    ); // Replace with the desired location or address
  };
 
  useEffect(() => {
    const handleResize = () => {
      const kontaktMain = document.querySelector(".kontakt-main");
      if (kontaktMain.scrollHeight > window.innerHeight) {
        kontaktMain.classList.add("scrollable");
      } else {
        kontaktMain.classList.remove("scrollable");
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check on component mount

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="kontakt-main">
      <div className="kontakt-animation"></div>
      <Navbar />
      {isMobile ? (
        <div className="kontakt-grid">
          <div className="kontakt-naslov-slider">
            <div className="kontakt-naslov" id="naslov">
              KONTAKT
            </div>
          </div>

          <div className="kontakt-image">
            <img
              src={Slika}
              alt="Image description"
              className="kontakt-image1"
            />
          </div>
          <div className="kontakt-podatki">
            <div className="kontakt-telefon">
              <div className="telefon-gray-slider">
                <p className="telefon-gray" onClick={handleEmailClick}>
                  info@centergibanja.si
                </p>
              </div>
              <div className="telefon-gray-slider">
                <p className="telefon-gray" onClick={handleMobileNumberClick}>
                  +386 31 643 234
                </p>
              </div>
            </div>
            <div className="kontakt-naslov">
              <div className="telefon-gray-slider">
                <p className="telefon-gray" onClick={handleLocationClick}>
                  Plese 2
                </p>
              </div>
              <div className="telefon-gray-slider">
                {" "}
                <p className="telefon-gray" onClick={handleLocationClick}>
                  9000 Murska Sobota
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="kontakt-grid">
          <div className="kontakt-podatki">
            <div className="kontakt-naslov-slider">
              <div className="kontakt-naslov" id="naslov">
                KONTAKT
              </div>
            </div>
            <div className="kontakt-telefon">
              <div className="telefon-white-slider">
                <p className="telefon-white">Poklici ali poslji sporocilo</p>
              </div>
              <div className="telefon-gray-slider">
                <p className="telefon-gray" onClick={handleEmailClick}>
                  info@centergibanja.si
                </p>
              </div>
              <div className="telefon-gray-slider">
                <p className="telefon-gray" onClick={handleMobileNumberClick}>
                  +386 31 643 234
                </p>
              </div>
            </div>
            <div className="kontakt-naslov">
              <div className="telefon-white-slider">
                <p className="telefon-white">Najdes nas na naslovu</p>
              </div>
              <div className="telefon-gray-slider">
                <p className="telefon-gray" onClick={handleLocationClick}>
                  Plese 2
                </p>
              </div>
              <div className="telefon-gray-slider">
                <p className="telefon-gray" onClick={handleLocationClick}>
                  9000 Murska Sobota
                </p>
              </div>
            </div>
          </div>
          <div className="kontakt-image">
            <img
              src={Slika}
              alt="Image description"
              className="kontakt-image1"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Kontakt;
