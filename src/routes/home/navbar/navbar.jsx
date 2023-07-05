import React, { useEffect, useState, useRef } from "react";
import "./navbar.css";
import Section1 from "../sections/section1";
import IconMenuClosed from "../../../assets/images/images/Menu_01.png";
import IconMenuOpen from "../../../assets/images/images/Menu_02.png";
import Facebook from "../../../assets/images/images/Facebook.svg";
import Instagram from "../../../assets/images/images/Instagram.svg";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handlePonudbaClick = () => {
    if (window.location.pathname !== "/ponudba") {
      const kontaktMenuItems = document.querySelectorAll(".menu-item.animate");
      kontaktMenuItems.forEach((menuItem) =>
        menuItem.classList.add("move-down")
      );
      const lokacijaItem = document.querySelector(".kontakt-lokacija");
      lokacijaItem.classList.add("out");

      setTimeout(() => {
        const overlay = document.querySelector(".overlay");
        overlay.classList.add("drop");
      }, 200);

      setTimeout(() => {
        navigate("/ponudba");
      }, 1000);
    } else {
      handleMenuToggle();
    }
  };

  const handlePrijavaClick = () => {
    if (window.location.pathname !== "/prijava") {
      const kontaktMenuItems = document.querySelectorAll(".menu-item.animate");
      kontaktMenuItems.forEach((menuItem) =>
        menuItem.classList.add("move-down")
      );
      const lokacijaItem = document.querySelector(".kontakt-lokacija");
      lokacijaItem.classList.add("out");

      setTimeout(() => {
        const overlay = document.querySelector(".overlay");
        overlay.classList.add("drop");
      }, 200);

      setTimeout(() => {
        navigate("/prijava");
      }, 1000);
    } else {
      handleMenuToggle();
    }
  };

  const handleDomovClick = () => {
    navigate("/");
  };

  const handleKontaktClick = () => {
    if (window.location.pathname !== "/kontakt") {
      const kontaktMenuItems = document.querySelectorAll(".menu-item.animate");
      kontaktMenuItems.forEach((menuItem) =>
        menuItem.classList.add("move-down")
      );
      const lokacijaItem = document.querySelector(".kontakt-lokacija");
      lokacijaItem.classList.add("out");

      setTimeout(() => {
        const overlay = document.querySelector(".overlay");
        overlay.classList.add("drop");
      }, 200);

      setTimeout(() => {
        navigate("/kontakt");
      }, 1000);
    } else {
      handleMenuToggle();
    }
  }; 

  useEffect(() => {
    const handleScroll = () => {
      const container = document.querySelector(".container");
      if (container) {
        const scrollTop = container.scrollTop;
        const threshold = 100; // Adjust this value as needed

        if (scrollTop > threshold) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      }
    };

    const container = document.querySelector(".container");
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    console.log(isScrolled);
  }, [isScrolled]);

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

  

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="fitnes-domov" onClick={handleDomovClick}>CENTER GIBANJA</div>
      <div
        className={`menu-icon ${isMenuOpen ? "open" : ""}`}
        onClick={handleMenuToggle}
      >
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <div className={`menu ${isMenuOpen ? "open" : ""}`}>
        <div className="menuNavbar">
          <a className="social-link" href="https://www.facebook.com/Mocgibanja"
                target="_blank"
                rel="noopener noreferrer">
          <img
            src={Facebook} // Replace IconMenuClosed with the actual image source
            alt="Menu Icon"
            className="facebook-icon-img"
            width="40"
            height="40"
          />
          </a>
          <a href="https://www.instagram.com/center_gibanja_murskasobota/"
                target="_blank"
                rel="noopener noreferrer">
          <img
            src={Instagram} // Replace IconMenuClosed with the actual image source
            alt="Menu Icon"
            className="instagram-icon-img"
            width="40"
            height="40"
          />
          </a>
          <div className="navbar-menu-icon" onClick={handleMenuToggle}>
            <div className="linex"></div>
            <div className="linex"></div>
          </div>
        </div>
        <div className="menu-items">
          <div className="menu-item-slider">
            <p
              onClick={handleDomovClick}
              className={`menu-item ${isMenuOpen ? "animate" : ""}`}
            >
              DOMOV
            </p>
          </div>
          <div className="menu-item-slider">
            <p
              onClick={handlePonudbaClick}
              className={`menu-item ${isMenuOpen ? "animate" : ""}`}
            >
              PONUDBA
            </p>
          </div>
          <div className="menu-item-slider">
            <p onClick={handlePrijavaClick} className={`menu-item ${isMenuOpen ? "animate" : ""}`}>
              PRIJAVA NA VADBE
            </p>
          </div>
          <div className="menu-item-slider">
            <p className={`menu-item ${isMenuOpen ? "animate" : ""}`}>
              URNIK VADB
            </p>
          </div>
          <div className="menu-item-slider">
            <p
              onClick={handleKontaktClick}
              className={`menu-item ${isMenuOpen ? "animate" : ""}`}
            >
              KONTAKT
            </p>
          </div>
        </div>
        <div className="kontakt-lokacija">
          <div className="kontakt">
            <p className="kontakt-item">KONTAKT</p>
            <p
              className="kontakt-item"
              id="click-item"
              onClick={handleEmailClick}
            >
              info@centergibanja.si
            </p>
            <p
              className="kontakt-item"
              id="click-item"
              onClick={handleMobileNumberClick}
            >
              +386 31 643 234
            </p>
          </div>
          <div className="lokacija">
            <p className="lokacija-item">LOKACIJA</p>
            <p
              className="lokacija-item"
              id="click-item"
              onClick={handleLocationClick}
            >
              Plese 2
            </p>
            <p
              className="lokacija-item"
              id="click-item"
              onClick={handleLocationClick}
            >
              9000 Murska Sobota
            </p>
          </div>
        </div>
        <div className="overlay"></div>
      </div>
    </nav>
  );
};

export default Navbar;
