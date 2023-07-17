import React, { useEffect, useRef, useState } from 'react';
import Swiper from 'swiper';
import Navbar from '../home/navbar/navbar';
import { Buffer } from 'buffer';

import './swiperComponent.css';

import 'simplebar'; // Import the simplebar library
import 'simplebar/dist/simplebar.min.css'; // Import the simplebar styles

const SwiperComponent = () => {
  const swiperRef = useRef(null); // Create a ref to store the swiper instance
  const [data, setData] = useState([]);

  const calculateSpaceBetween = () => {
    const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    let spaceBetween = 100; // Default value

    if (screenWidth < 1300 && screenWidth > 600) {
      spaceBetween = 60;
    } else if (screenWidth < 600 && screenHeight > 519) {
      spaceBetween = 20;
    }

    return spaceBetween;
  };

  const handleResize = () => {
    const newSpaceBetween = calculateSpaceBetween();
    swiperRef.current.params.spaceBetween = newSpaceBetween;
    swiperRef.current.update();
  };

  useEffect(() => {
    // Fetch data
    fetch('https://centergibanja.si/api/getdata')
      .then((response) => response.json())
      .then((result) => {
        const modifiedResult = result.map((item) => ({
          ...item,
          slika: `data:image/jpeg;base64,${Buffer.from(item.slika).toString('base64')}`,
          selectedButton: 0, // Initialize selectedButton for each item
        }));
        const sortedData = modifiedResult.sort((a, b) => a.zaporedje - b.zaporedje);

        setData(sortedData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    if (data.length === 0) return;

    // Calculate the initial spaceBetween value based on the screen width
    const spaceBetween = calculateSpaceBetween();

    // Initialize the swiper
    swiperRef.current = new Swiper('.swiper-container', {
      slidesPerView: 1,
      spaceBetween: spaceBetween,
      speed: 800,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });

    // Update spaceBetween value when screen size changes
    const handleResize = () => {
      const newSpaceBetween = calculateSpaceBetween();
      swiperRef.current.params.spaceBetween = newSpaceBetween;
      swiperRef.current.update();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      // Clean up the event listener
      window.removeEventListener('resize', handleResize);
    };
  }, [data]);

  useEffect(() => {
    // Attach touch and mouse event listeners to the swiper container
    const swiperContainer = document.querySelector('.swiper-container');
    swiperContainer.addEventListener('touchstart', handleTouchStart);
    swiperContainer.addEventListener('touchmove', handleTouchMove);
    swiperContainer.addEventListener('mousedown', handleTouchStart);
    swiperContainer.addEventListener('mousemove', handleTouchMove);
    swiperContainer.addEventListener('mouseup', handleTouchEnd);

    return () => {
      // Clean up the event listeners
      swiperContainer.removeEventListener('touchstart', handleTouchStart);
      swiperContainer.removeEventListener('touchmove', handleTouchMove);
      swiperContainer.removeEventListener('mousedown', handleTouchStart);
      swiperContainer.removeEventListener('mousemove', handleTouchMove);
      swiperContainer.removeEventListener('mouseup', handleTouchEnd);
    };
  }, []);

  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  const handleTouchStart = (event) => {
    setTouchStartX(getEventXPosition(event));
  };

  const handleTouchMove = (event) => {
    setTouchEndX(getEventXPosition(event));
  };

  const handleTouchEnd = (event) => {
    const swipeDistance = touchEndX - touchStartX;

    if (Math.abs(swipeDistance) < 1999950) {
      const target = event.target;

      // Check if the touch event occurred within a button
      if (target.classList.contains('custom-button')) {
        return; // Prevent sliding if clicking a button
      }
    }

    if (swipeDistance > 0) {
      swiperRef.current.slidePrev();
    } else if (swipeDistance < 0) {
      swiperRef.current.slideNext();
    }
  };

  const getEventXPosition = (event) => {
    if (event.touches && event.touches.length > 0) {
      return event.touches[0].clientX;
    } else if (event.clientX) {
      return event.clientX;
    }
    return 0;
  };

  const handleButtonClick = (itemIndex, buttonIndex) => {
    setData((prevData) => {
      const newData = [...prevData];
      newData[itemIndex].selectedButton = buttonIndex;
      return newData;
    });
  };

  const renderButtons = (item, itemIndex) => {
    if (item.izbira === 1 && item.izbira_vrednost) {
      const values = item.izbira_vrednost.split('|');
      const rows = Math.ceil(values.length / 2);

      return (
        <>
          <div className='buttons-postavitev'>
            {Array.from({ length: rows }, (_, rowIndex) => {
              const start = rowIndex * 2;
              const end = start + 2;
              const rowValues = values.slice(start, end);

              return (
                <div className="button-row" key={rowIndex}>
                  {rowValues.map((value, colIndex) => {
                    const parts = value.split(';');
                    const buttonValue = parts[0];
                    const buttonIndex = start + colIndex; // Calculate unique buttonIndex

                    return (
                      <button
                        className={`custom-button ${buttonIndex === item.selectedButton ? 'selected' : ''}`}
                        key={buttonIndex}
                        onClick={() => handleButtonClick(itemIndex, buttonIndex)}
                      >
                        {buttonValue}
                      </button>
                    );
                  })}
                </div>
              );
            })}
            <div className="values-container">
              {values.map((value, index) => {
                const parts = value.split(';');
                const buttonValue = parts[0];
                const additionalValues = parts.slice(1).join(', ');
                const firstAdditionalValue = additionalValues.split(',')[0];
                const remainingAdditionalValues = additionalValues.slice(firstAdditionalValue.length + 2);

                if (index === item.selectedButton) {
                  return (
                    <div key={index}>
                      <div className="additional-values">
                        <div className='napis'>( {firstAdditionalValue} )</div>
                        {remainingAdditionalValues && <div className='cena'>{remainingAdditionalValues}€</div>}
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </>
      );
    } else if (item.izbira === 0 && item.cena_takoj_vrednost) {
      const values = item.cena_takoj_vrednost.split(';');

      return (
        <div className="additional-values">
          <div className="napis">( {values[0]} )</div>
          <div className="cena">{isNaN(Number(values[1].replace(',', '.'))) ? values[1] : `${values[1]}€`}</div>
        </div>
      );
    }
    return null;
  }; 

  return (
    <div className="swiper-main">
      <Navbar />
      <div className="ponudba-animation"></div>
      <div className="ponudba-grid">
        <div className="ponudba-naslov-slider">
          <div className="ponudba-naslov" id="ponudba">
            PONUDBA
          </div>
        </div>
      </div>

      <div className="swiper-container" ref={swiperRef}>
        <div className="carousel-button-left-new" onClick={() => swiperRef.current.slidePrev()}>
          <div className="line1" />
          <div className="line2" />
        </div>
        <div className="carousel-button-right-new" onClick={() => swiperRef.current.slideNext()}>
          <div className="line3" />
          <div className="line4" />
        </div>
        <div className="swiper-wrapper">
          {data.map((item, index) => (
            <div
              className="swiper-slide ponudba-slide"
              id="slider"

              key={item.iddata}
            >
              <div
                className="ponudba-image"
                style={{
                  backgroundImage: `url(${item.slika})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <div className="ponudba-data">
                <div className="ponudba-header">{item.naslov}</div>
                {item.podnaslov.includes(",") ? (
                  item.podnaslov.split(",").map((subTitle, index) => (
                    <p className={`ponudba-paragraph u${index + 1}`} key={index}>
                      {subTitle.trim()} {/* Trim whitespace from each part */}
                    </p>
                  ))
                ) : (
                  <p className="ponudba-paragraph">{item.podnaslov}</p>
                )}
                <div className="ponudba-line" />
                <div className="buttons-container">{renderButtons(item, index)}</div>
              </div>
            </div>
          ))}
        </div>
        {/*<div className="swiper-pagination" />*/}
      </div>
    </div>
  );
};

export default SwiperComponent;