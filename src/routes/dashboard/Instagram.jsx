import React, { useEffect, useState, useContext } from 'react';
import './Instagram.css'
import axios from 'axios';
import { Buffer } from 'buffer';

const Instagram = () => {
    const [instaData, setInstaData] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://centergibanja.si/api/getInsta');
                setInstaData(response.data);
                console.log(instaData)
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

    const handleImageSelect = (id) => {
        // Create an input element to trigger the file selection dialog
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*'; // Allow only image files
        input.onchange = async (event) => {
          const file = event.target.files[0];
          if (file) {
            try {
              const formData = new FormData();
              formData.append('image', file);
      
              // Make a POST request to your server to update the image
              await axios.post(`https://centergibanja.si/api/updateInstagram?id=${id}`, formData);
      
              setSelectedImage(URL.createObjectURL(file)); // Update the selectedImage state
            } catch (error) {
              console.error(error);
            }
          }
        };
        input.click(); // Simulate a click to open the file dialog
      };

      function convertImageToBlob(imageUrl) {
        return new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open('GET', imageUrl, true);
          xhr.responseType = 'blob';
    
          xhr.onload = function () {
            if (this.status === 200) {
              resolve(this.response);
            } else {
              reject(new Error('Failed to convert image to blob.'));
            }
          };
    
          xhr.onerror = function () {
            reject(new Error('Failed to convert image to blob.'));
          };
    
          xhr.send();
        });
      }


    return (
        <div className="ekipa-container">
            <div className='images-wrapper'>
                {instaData.map(item => (
                    <div
                        key={item.id}
                        className='img-holder-ig'
                        style={{ backgroundImage: `url(${getSlideBackground(item.slika)})`, backgroundSize: "cover" }}
                        onClick={() => handleImageSelect(item.id)} // Pass item.id as a parameter
                        ></div>
                ))}
            </div>
        </div>
    );
};


export default Instagram;
