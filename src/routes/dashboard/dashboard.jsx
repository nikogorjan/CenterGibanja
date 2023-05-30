import React, { useEffect, useState } from "react";
import axios from "axios";
import "./dashboard.css";
import { Buffer } from "buffer"; // Import buffer library

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
  const [textField5Value, setTextField5Value] = useState("");
  const [textField6Value, setTextField6Value] = useState("");
  const [textField7Value, setTextField7Value] = useState("");
  const [textField8Value, setTextField8Value] = useState("");
  const [textField9Value, setTextField9Value] = useState("");
  const [textField10Value, setTextField10Value] = useState("");
  const [textField11Value, setTextField11Value] = useState("");
  const [textField12Value, setTextField12Value] = useState("");
  const [textField13Value, setTextField13Value] = useState("");
  const [textField14Value, setTextField14Value] = useState("");
  const [textField15Value, setTextField15Value] = useState("");
  const [textField16Value, setTextField16Value] = useState("");
  const [textField17Value, setTextField17Value] = useState("");

  const handleTextField15Change = (event) => {
    setTextField15Value(event.target.value);
  };
  const handleTextField16Change = (event) => {
    setTextField16Value(event.target.value);
  };
  const handleTextField17Change = (event) => {
    setTextField17Value(event.target.value);
  };
  const handleTextField12Change = (event) => {
    setTextField12Value(event.target.value);
  };
  const handleTextField13Change = (event) => {
    setTextField13Value(event.target.value);
  };
  const handleTextField14Change = (event) => {
    setTextField14Value(event.target.value);
  };
  const handleTextField9Change = (event) => {
    setTextField9Value(event.target.value);
  };
  const handleTextField10Change = (event) => {
    setTextField10Value(event.target.value);
  };
  const handleTextField11Change = (event) => {
    setTextField11Value(event.target.value);
  };
  const handleTextField6Change = (event) => {
    setTextField6Value(event.target.value);
  };
  const handleTextField7Change = (event) => {
    setTextField7Value(event.target.value);
  };
  const handleTextField8Change = (event) => {
    setTextField8Value(event.target.value);
  };
  const handleTextField3Change = (event) => {
    setTextField3Value(event.target.value);
  };
  const handleTextField4Change = (event) => {
    setTextField4Value(event.target.value);
  };
  const handleTextField5Change = (event) => {
    setTextField5Value(event.target.value);
  };

  const handleTextField1Change = (event) => {
    setTextField1Value(event.target.value);
  };

  const handleTextField2Change = (event) => {
    setTextField2Value(event.target.value);
  };

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setSelectedImage(file);
    setImageUrl(url);
  };

  const handleAddButtonClick = () => {
    setPopupOpen(true); // Open the pop-up window
  };

  const handleCloseButtonClick = () => {
    setPopupOpen(!true); // Open the pop-up window
  };

  useEffect(() => {
    // Fetch main_table data
    const fetchMainTableData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5174/api/main_table"
        ); // Replace with your API endpoint URL for main_table data
        setMainTableData(response.data);
      } catch (error) {
        console.error("Error fetching main_table data:", error);
      }
    };

    // Fetch other_table data
    const fetchOtherTableData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5174/api/other_table"
        ); // Replace with your API endpoint URL for other_table data
        setOtherTableData(response.data);
      } catch (error) {
        console.error("Error fetching other_table data:", error);
      }
    };

    fetchMainTableData();
    fetchOtherTableData();
  }, []);

  useEffect(() => {
    console.log(mainTableData); // Log the mainTableData
  }, [mainTableData]);

  useEffect(() => {
    console.log(otherTableData); // Log the mainTableData
  }, [otherTableData]);

  const handleAddFormSubmit = async () => {
    const formData = new FormData();
    formData.append("textField1Value", textField1Value);
    formData.append("textField2Value", textField2Value);
    formData.append("image", selectedImage); // Append the selected image file

    try {
      const response = await axios.post(
        "http://localhost:5174/api/main_table",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      setPopupOpen(false); // Close the pop-up window
      // Refresh main_table data if needed
      fetchMainTableData();
    } catch (error) {
      console.error("Error adding row to main_table:", error);
    }
  };

  return (
    <div className="dashboard-main">
      <div>
        <p className="ponudba-header">PONUDBA</p>
        <div className="ponudba-content">
          <div className="add-button-div">
            <button className="add-button" onClick={handleAddButtonClick}>
              <p>DODAJ</p>
            </button>
          </div>
          <div className="ponudba-items">
            {mainTableData.map((item) => (
              <Widget
                key={item.id}
                mainTableItem={item}
                otherTableData={otherTableData.filter(
                  (data) => data.id === item.other_table_id
                )}
              />
            ))}
          </div>
        </div>
      </div>
      {isPopupOpen && (
        <div className="popup-window">
          <input type="file" accept="image/*" onChange={handleImageSelect} />
          {imageUrl && (
            <div
              className="image-container"
              style={{ backgroundImage: `url(${imageUrl})` }}
            ></div>
          )}
          <p className="para">Naslov</p>
          <div className="input-text">
            <input
              type="text"
              value={textField1Value}
              onChange={handleTextField1Change}
            />
          </div>
          <p className="para">Podnaslov</p>
          <div className="input-text">
            <input
              type="text"
              value={textField2Value}
              onChange={handleTextField2Change}
            />
          </div>

          <div className="input-row">
            <div className="input-row-field">
              <input
                type="text"
                value={textField3Value}
                onChange={handleTextField3Change}
              />
            </div>
            <div className="input-row-field">
              <input
                type="text"
                value={textField4Value}
                onChange={handleTextField4Change}
              />
            </div>
            <div className="input-row-field">
              <input
                type="text"
                value={textField5Value}
                onChange={handleTextField5Change}
              />
            </div>
          </div>

          <div className="input-row">
            <div className="input-row-field">
              <input
                type="text"
                value={textField6Value}
                onChange={handleTextField6Change}
              />
            </div>
            <div className="input-row-field">
              <input
                type="text"
                value={textField7Value}
                onChange={handleTextField7Change}
              />
            </div>
            <div className="input-row-field">
              <input
                type="text"
                value={textField8Value}
                onChange={handleTextField8Change}
              />
            </div>
          </div>

          <div className="input-row">
            <div className="input-row-field">
              <input
                type="text"
                value={textField9Value}
                onChange={handleTextField9Change}
              />
            </div>
            <div className="input-row-field">
              <input
                type="text"
                value={textField10Value}
                onChange={handleTextField10Change}
              />
            </div>
            <div className="input-row-field">
              <input
                type="text"
                value={textField11Value}
                onChange={handleTextField11Change}
              />
            </div>
          </div>

          <div className="input-row">
            <div className="input-row-field">
              <input
                type="text"
                value={textField12Value}
                onChange={handleTextField12Change}
              />
            </div>
            <div className="input-row-field">
              <input
                type="text"
                value={textField13Value}
                onChange={handleTextField13Change}
              />
            </div>
            <div className="input-row-field">
              <input
                type="text"
                value={textField14Value}
                onChange={handleTextField14Change}
              />
            </div>
          </div>

          <div className="input-row">
            <div className="input-row-field">
              <input
                type="text"
                value={textField15Value}
                onChange={handleTextField15Change}
              />
            </div>
            <div className="input-row-field">
              <input
                type="text"
                value={textField16Value}
                onChange={handleTextField16Change}
              />
            </div>
            <div className="input-row-field">
              <input
                type="text"
                value={textField17Value}
                onChange={handleTextField17Change}
              />
            </div>
          </div>

          <div className="button-row-yes">
            <button className="add-button-form" onClick={handleAddFormSubmit}>
              DODAJ
            </button>

            <button className="close-button" onClick={handleCloseButtonClick}>
              ZAPRI
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Widget = ({ mainTableItem, otherTableData }) => {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const imageArray = Uint8Array.from(mainTableItem.image.data);
    const imageBuffer = Buffer.from(imageArray);
    const imageBase64 = imageBuffer.toString("base64");
    const imageUrl = `data:image/jpeg;base64,${imageBase64}`;
    setImageSrc(imageUrl);
  }, [mainTableItem.image]);

  return (
    <div className="widget">
      {/* Display image */}
      <div className="widget-row">
        <div
          className="widget-image"
          style={{
            backgroundImage: `url(${imageSrc})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/*<img src={imageSrc} alt="Image" />*/}
        </div>

        {/* Display paragraph1 and paragraph2 */}
        <div className="widget-paragraphs">
          <p>Naslov</p>
          <div className="paragraph-container">
            <p>{mainTableItem.paragraph1}</p>
          </div>
          <p>Podnaslov</p>
          <div className="paragraph-container">
            <p>{mainTableItem.paragraph2}</p>
          </div>
        </div>
        <div className="other-data">
          {otherTableData.map((data) => (
            <div key={data.id}>
              {data.character_array.split("|").map((item, index) => (
                <p key={index}>
                  {item.split(";").map((part, partIndex) => (
                    <span key={partIndex}>
                      {part}
                      {partIndex !== item.split(";").length - 1 && " - "}
                    </span>
                  ))}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
      {/* Display other table data */}
    </div>
  );
};

export default Dashboard;
