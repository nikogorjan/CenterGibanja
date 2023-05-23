import React from "react";
import "../loadingPage/loadingPage.css";

const LoadingPageMenu = ({ onAnimationFinish }) => {
  const handleAnimationEnd = () => {
    onAnimationFinish();
  };

  return (
    <div className="background">
      <div className="loading-page-menu">
        {/* Add loading animation or any other elements */}
      </div>
    </div>
  );
};

export default LoadingPageMenu;
