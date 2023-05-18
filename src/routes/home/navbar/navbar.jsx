import React, { useEffect, useState, useRef } from "react";
import "./navbar.css";
import Section1 from "../sections/section1";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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

  return <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}></nav>;
};

export default Navbar;
