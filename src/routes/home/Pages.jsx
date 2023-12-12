import React, { useEffect, useState } from "react";
import "./pages.css";
import Axios from "axios";
import Section1 from "./sections/section1";
import Navbar from "./navbar/navbar";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import LoadingPage from "./loadingPage/loadingPage";
import Section2 from "./sections/Section2";
import Section3 from "./sections/Section3";
import Section4 from "./sections/Section4";
import Section5 from "./sections/Section5";
import { SelectedDataProvider } from "./sections/SelectedDataContext";

const Pages = () => {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [animationFinished, setAnimationFinished] = useState(false);

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust the duration as needed
  }, []);

  

  const handleAnimationFinish = () => {
    setTimeout(() => {
      setAnimationFinished(true);
    }, 2000);
  };

  return (
    <div className="appFix">
      {isLoading ? (
        <LoadingPage onAnimationFinish={handleAnimationFinish} />
      ) : (
        <div
          className={`container ${
            animationFinished ? "animation-finished" : ""
          }`}
        >
          <Navbar />
          <Section1 className="fade-in" />
          <SelectedDataProvider>
          <Section2 />
          </SelectedDataProvider>
          <Section3 />
          <Section4 />
          <Section5/>
        </div>
      )}
    </div>
  );
};

export default Pages;
