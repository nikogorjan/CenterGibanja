import React, { useEffect, useState } from "react";
import "../sections/section1.css";
import Axios from "axios";
import image from "../sections/slika1.jpg";

const Section1 = () => {
  const [text, setText] = useState("");

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

  return (
    <div
      className="Scroll fade-in"
      id="bg1"
      style={{
        backgroundImage: "url('src/routes/home/sections/slika1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="textPosition">
        <div className="textPositionInner">
          <div className="hookSlider">
            <h1 className="hook">TRENIRAJ 24/7</h1>
          </div>
          <div className="text1Slider">
            <div className="text1Slider">
              <p className="text1">
                Sprejmemo vsakogar. Ne glede na stopnjo
                <br />
                pripravljenosti!
              </p>
            </div>
          </div>
          <div className="buttonsSlider">
            <div className="buttons">
              <button className="button1">
                <p className="buttonText1">PONUDBA</p>
              </button>
              <button className="button2">
                <p className="buttonText1">KONTAKT</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section1;
