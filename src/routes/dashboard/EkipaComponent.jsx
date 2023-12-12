import React, { useEffect, useState, useContext } from 'react';
import "./EkipaComponent.css"; // Import CSS file for styling
import axios from 'axios';
import { Buffer } from 'buffer';
import settingsIcon from './settings.png';
import ImageIcon from "../dashboard/image.svg";

const EkipaComponent = () => {
  const [ekipaData, setEkipaData] = useState([]);
  const [isPopupOpen, setPopupOpen] = useState(false); // Add state variable
  const [selectedImage, setSelectedImage] = useState(null);
  const [textField2Value, setTextField2Value] = useState("");
  const [textField1Value, setTextField1Value] = useState("");
  const [textField3Value, setTextField3Value] = useState("");
  const [selectedItem, setSelectedItem] = useState(null); // Add state variable

  const handleAddButtonClick = () => {
    setPopupOpen(true); // Open the pop-up window
  };

  const handleTextField1Change = (event) => {
    setTextField1Value(event.target.value);
  };

  const handleTextField2Change = (event) => {
    setTextField2Value(event.target.value);
  };

  const handleTextField3Change = (event) => {
    setTextField3Value(event.target.value);
  };

  const handleCloseButtonClick = () => {
    setPopupOpen(!true); // Open the pop-up window
    setSelectedImage(null);
    setTextField1Value("");
    setTextField2Value("");
    setTextField3Value("");
    setPopupOpen(false);
  };

  const handleImageContainerClick = () => {
    document.getElementById("image-input").click();
  };

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
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

  const handleAddFormButtonClick = async () => {
    const imageBlob = await convertImageToBlob(selectedImage);
    console.log("Image Blob:", imageBlob);

    const formData = new FormData();
    formData.append("image", imageBlob, "image.jpg");
    formData.append("textField1", textField1Value);
    formData.append("textField2", textField2Value);
    formData.append("textField3", textField3Value);


    console.log(formData);

    axios
      .post("https://centergibanja.si/api/ekipaData", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(response => {
        console.log(response.data.message);
        setSelectedImage(null);
        setTextField1Value("");
        setTextField2Value("");
        setTextField3Value("");
        setPopupOpen(false);
      })
      .catch(error => {
        console.error(error);
        // Handle error
      });
  };

  const SettingsComponent = ({ item }) => {
    // Handle logic for the settings component here
    const [selectedImageBase64, setSelectedImageBase64] = useState(null);
    const [textField4Value, setTextField4Value] = useState(item.ime);
    const [textField5Value, setTextField5Value] = useState(item.poklic);
    const [textField6Value, setTextField6Value] = useState(item.opis);

    const handleTextField4Change = (event) => {
      setTextField4Value(event.target.value);
    };
  
    const handleTextField5Change = (event) => {
      setTextField5Value(event.target.value);
    };
  
    const handleTextField6Change = (event) => {
      setTextField6Value(event.target.value);
    };

    useEffect(() => {
      setSelectedImageBase64(getSlideBackground(item.slika));
    }, [item.slika]);

    const handleImageSelect = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setSelectedImageBase64(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };

    const handleCloseButtonClick = () => {
      setPopupOpen(!true); // Open the pop-up window
      setSelectedImage(null);
      setTextField4Value("");
      setTextField5Value("");
      setTextField6Value("");
      setPopupOpen(false);
      setSelectedItem(null)
    };

    const handleAddFormButtonClick = async () => {
      const imageBlob = await convertImageToBlob(selectedImageBase64);
      console.log("Image Blob:", imageBlob);
  
      const formData = new FormData();
      formData.append("iddata", item.id); // Add the item id to the form data
      formData.append("image", imageBlob, "image.jpg");
      formData.append("textField1", textField4Value);
      formData.append("textField2", textField5Value);
      formData.append("textField3", textField6Value);
  
      console.log(formData);
  
      axios
        .post("https://centergibanja.si/api/updateEkipaData", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response.data.message);
          setSelectedImageBase64(null);
          setTextField4Value("");
          setTextField5Value("");
          setTextField6Value("");
          setSelectedItem(null);
        })
        .catch((error) => {
          console.error(error);
          // Handle error
        });
    };

    const handleDeleteButtonClick = () => {
      axios
        .post("https://centergibanja.si/api/deleteEkipaData", { iddata: item.id })
        .then((response) => {
          console.log(response.data.message);
          setSelectedItem(null);
        })
        .catch((error) => {
          console.error(error);
          // Handle error
        });
    };

    return (
      <div>
        <div>
          <div
            className="image-container"
            onClick={handleImageContainerClick}
            style={{ backgroundImage: selectedImageBase64 ? `url(${selectedImageBase64})` : "" }}
          >
            {!selectedImageBase64 && <img src={ImageIcon} className="icon" />}
          </div>
          <input
            id="image-input"
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            style={{ display: "none" }}
          />
        </div>

        <input type="text" className="input-field" placeholder="Ime" value={textField4Value} onChange={handleTextField4Change} />
          <input type="text" className="input-field" placeholder="Poklic" value={textField5Value} onChange={handleTextField5Change} />
          <input type="text" className="input-field" placeholder="Opis" value={textField6Value} onChange={handleTextField6Change} />

        <div className="buttons-row">
          <button className="add-form-button" onClick={handleAddFormButtonClick}>Spremeni</button>
          <button className="delete-button" onClick={handleDeleteButtonClick}>Izbriši</button>
          <button className="popup-button" onClick={handleCloseButtonClick}>Zapri</button>
        </div>
      </div>
    );
  };

  return <div className="ekipa-container">
    <div className='ekipa-postavitev'>
      <div className="header-container-ekipa">
        <p className="ponudba-header">PONUDBA</p>
        <button className="add-button" onClick={handleAddButtonClick}>
          <p>DODAJ</p>
        </button>
      </div>


      <div className='ponudba-content'>
        {ekipaData.map((item, index) => (
          <div key={index} className="ekipa-item" id='set-block-radius'>
            <div className='image-container-drag-drop' style={{
              backgroundImage: `url(${getSlideBackground(item.slika)})`, backgroundSize: "cover"
            }}></div>
            <div className='ekipa-ime'>{item.ime}</div>
            <div className="settings-icon" onClick={() => setSelectedItem(item)}>
              <img src={settingsIcon} alt="Settings Icon" />

            </div>
          </div>
        ))}
      </div>
    </div>

    {isPopupOpen && (
      <div className="popup-overlay">
        <div className={`popup-window ${isPopupOpen ? 'open' : ''}`}>

          <div>
            <div
              className="image-container"
              onClick={handleImageContainerClick}
              style={{ backgroundImage: selectedImage ? `url(${selectedImage})` : "" }}
            >
              {!selectedImage && <img src={ImageIcon} className="icon" />}
            </div>
            <input
              id="image-input"
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              style={{ display: "none" }}
            />
          </div>

          <input type="text" className="input-field" placeholder="Ime" value={textField1Value} onChange={handleTextField1Change} />
          <input type="text" className="input-field" placeholder="Poklic" value={textField2Value} onChange={handleTextField2Change} />
          <input type="text" className="input-field" placeholder="Opis" value={textField3Value} onChange={handleTextField3Change} />

          <div className="buttons-row">
            <button className="add-form-button" onClick={handleAddFormButtonClick}>Dodaj</button>
            <button className="popup-button" onClick={handleCloseButtonClick}>Zapri</button>
          </div>
        </div>
      </div>

    )}


    {selectedItem && (
      <div className="popup-overlay">
        <div className={`popup-window ${isPopupOpen ? 'open' : ''}`}>
          <SettingsComponent item={selectedItem} />

        </div>
      </div>
    )}

  </div>;
};

export default EkipaComponent;