import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import './SlidesCarousel.css'; // Import your custom CSS file
import { Buffer } from 'buffer';
import { SelectedDataContext } from './SelectedDataContext';

const SlidesCarousel = ({ onItemClicked }) => {
  const [ekipaData, setEkipaData] = useState([]);
  const { selectedData, setSelectedData } = useContext(SelectedDataContext);

  const handleItemClick = (data) => {
    setSelectedData(data);
    onItemClicked(data); // Call the callback function with the selected item data

  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://centergibanja.si/api/getAllEkipa');
        setEkipaData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const getSlideBackground = (slika) => {
    if (!slika) return '';
    const base64Image = `data:image/jpeg;base64,${Buffer.from(slika).toString('base64')}`;
    return base64Image;
  };

  const slidesPerView = window.innerWidth < 600 && window.innerHeight > 519 ? 1 : 3;
  const screenWidth = window.innerWidth;
  const width = screenWidth > 1921 ? '2000px' : '1200px';

  return (
    <div className="slides-container">
      <div className="swiper-wrapper" id='swrapper'>
        <Swiper slidesPerView={slidesPerView} spaceBetween={10} style={{ width: width, height: '565px' }}  className="custom-swiper"
        >
          {ekipaData.map((item) => (
            <SwiperSlide key={item.id} onClick={() => handleItemClick(item)} id='swiperslideid'>
              <div className="slidesclass">
                <div className="slide-image" style={{ backgroundImage: `url(${getSlideBackground(item.slika)})` }}>
                  <div className="slide-overlay">
                    <div className="line-horizontal"></div>
                    <div className="line-vertical"></div>
                    <div className="line-vertical2"></div>
                  </div>
                </div>
                <div className="slide-content">
                  <p className="slides-name-paragraph">{item.ime}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SlidesCarousel;