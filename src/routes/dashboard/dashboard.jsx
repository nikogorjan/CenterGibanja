import React, { useEffect, useState } from "react";
import axios from "axios";
import "./dashboard.css";
import { Buffer } from "buffer"; // Import buffer library
import Spreadsheet from "./spreadsheet";
import ImageIcon from "../dashboard/image.svg";
import DragDrop from "./dragdrop";
import fetchData2 from './dragdrop';


const Dashboard = ({ component: Component, isAuthenticated, ...rest }) => {
  const [mainTableData, setMainTableData] = useState([]);
  const [otherTableData, setOtherTableData] = useState([]);
  const [isPopupOpen, setPopupOpen] = useState(false); // Add state variable
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [textField2Value, setTextField2Value] = useState("");
  const [textField1Value, setTextField1Value] = useState("");
  const [textField3Value, setTextField3Value] = useState("");
  const [textField4Value, setTextField4Value] = useState("");
  const [showSpreadsheet, setShowSpreadsheet] = useState(false);
  const [spreadsheetData, setSpreadsheetData] = useState([]);

  const handleSpreadsheetDataChange = (data) => {
    setSpreadsheetData(data);
  };

  const handleCheckboxChange = (event) => {
    setShowSpreadsheet(event.target.checked);
  };

  const handleImageContainerClick = () => {
    document.getElementById("image-input").click();
  };
  const handleTextField3Change = (event) => {
    setTextField3Value(event.target.value);
  };

  const handleTextField4Change = (event) => {
    setTextField4Value(event.target.value);
  };


  const handleTextField1Change = (event) => {
    setTextField1Value(event.target.value);
  };

  const handleTextField2Change = (event) => {
    setTextField2Value(event.target.value);
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

  const handleAddButtonClick = () => {
    setPopupOpen(true); // Open the pop-up window
  };

  const handleCloseButtonClick = () => {
    setPopupOpen(!true); // Open the pop-up window
    setSelectedImage(null);
    setTextField1Value("");
    setTextField2Value("");
    setTextField3Value("");
    setTextField4Value("");
    setSpreadsheetData([]);
    setShowSpreadsheet(false);
    setPopupOpen(false);
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
    const combinedSpreadsheetData = spreadsheetData
    .map(row => row.filter(cell => cell !== "").join(";"))
    .filter(row => row !== "")
    .join("|");

   const newVal = textField4Value + ';' + textField3Value;

  
  const imageBlob = await convertImageToBlob(selectedImage);
  console.log("Image Blob:", imageBlob);

  const formData = new FormData();
  formData.append("image", imageBlob, "image.jpg");
  formData.append("textField1", textField1Value);
  formData.append("textField2", textField2Value);
  formData.append("textField3", newVal);
  formData.append("showSpreadsheet", showSpreadsheet);
  formData.append("spreadsheetData", combinedSpreadsheetData);

  console.log(formData);

  axios
    .post("https://centergibanja.si/api/data", formData, {
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
      setTextField4Value("");
      setSpreadsheetData([]);
      setShowSpreadsheet(false);
      setPopupOpen(false);
    })
    .catch(error => {
      console.error(error);
      // Handle error
    });
  };


  return (
    <div className="dashboard-main">
      <div>
        <div className="header-container">
        <p className="ponudba-header">PONUDBA</p>
        <button className="add-button" onClick={handleAddButtonClick}>
              <p>DODAJ</p>
            </button>
            </div>
        <div className="ponudba-content">
          <div className="add-button-div">
            
          </div>
          <div className="ponudba-items">
            <DragDrop ></DragDrop>
          </div>
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
            <div className="input-container">
              <input type="text" className="input-field" placeholder="Naslov" value={textField1Value} onChange={handleTextField1Change} />
              <input type="text" className="input-field" placeholder="Podnaslov" value={textField2Value} onChange={handleTextField2Change} />
              {!showSpreadsheet && (
                <><input type="text" className="input-field" placeholder="Cena" value={textField3Value} onChange={handleTextField3Change} /><input type="text" className="input-field" placeholder="Opis" value={textField4Value} onChange={handleTextField4Change} /></>

              )}
              <label htmlFor="showSpreadsheetCheckbox">
                <input
                  type="checkbox"
                  id="showSpreadsheetCheckbox"
                  onChange={handleCheckboxChange}
                />
                <p>Več možnosti</p>
              </label>
            </div>
            {showSpreadsheet && <Spreadsheet initialData={[
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]} onDataChange={handleSpreadsheetDataChange} />}

            <div className="buttons-row">
              <button className="add-form-button" onClick={handleAddFormButtonClick}>Dodaj</button>
              <button className="popup-button" onClick={handleCloseButtonClick}>Zapri</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default Dashboard;
