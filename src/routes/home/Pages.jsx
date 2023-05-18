import React, { useEffect, useState } from "react";
import "./pages.css";
import Axios from "axios";
import Section1 from "./sections/section1";
import Navbar from "./navbar/navbar";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import LoadingPage from "./loadingPage/loadingPage";

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

  useEffect(() => {
    // Make the API call to retrieve the text from the server
    Axios.get("http://localhost:5174/text/1")
      .then((response) => {
        setText(response.data.text);
      })
      .catch((error) => {
        console.error(error);
      });
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

          <div className="Scroll">Third Page</div>
          <div className="Scroll">Fourth Page</div>
        </div>
      )}
    </div>
  );
};

export default Pages;
