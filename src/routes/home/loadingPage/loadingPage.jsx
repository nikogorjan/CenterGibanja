import React from "react";
import "../loadingPage/loadingPage.css";

const LoadingPage = ({ onAnimationFinish }) => {
  const handleAnimationEnd = () => {
    onAnimationFinish();
  };

  return (
    <div className="background">
      <div className="loading-page" onAnimationEnd={handleAnimationEnd}>
        <div className="loading-animation"></div>
        <div className="loading-bar"></div>

        {/* Add loading animation or any other elements */}
      </div>
    </div>
  );
};

export default LoadingPage;
