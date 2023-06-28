import React, { useState, useEffect } from "react";
import { ReactSortable } from "react-sortablejs";
import styled from "styled-components";
import "./dragdrop.css";
import { Buffer } from "buffer";
import settingsIcon from './settings.png';
import ImageIcon from "../dashboard/image.svg";
import Spreadsheet from "./spreadsheet";
import axios from 'axios';



const StyledBlockWrapper = styled.div`
  position: relative;
  background: white;
  padding: 20px;
  margin-bottom: 10px;
  border: 1px solid lightgray;
  border-radius: 4px;
  cursor: move;
  &:hover {
    //background: #eeeeee;
  }
`;

const sortableOptions = {
  animation: 150,
  fallbackOnBody: true,
  swapThreshold: 0.65,
  ghostClass: "ghost",
  group: "shared",
  forceFallback: true
};



export default function DragDrop() {

  const [blocks, setBlocks] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState(null);


  useEffect(() => {
    fetchData2(setBlocks);
  }, []);



  const fetchData = async () => {
    try {
      const response = await fetch("https://centergibanja.si/api/getdata");
      const data = await response.json();
      console.log("response: ", response);
      console.log("data: ", data);

      const sortedData = data.sort((a, b) => a.zaporedje - b.zaporedje);

      const formattedData = sortedData.map((item) => {
        // Convert buffer to data URL
        const imageBuffer = Buffer.from(item.slika);
        const imageDataURL = `data:image/jpeg;base64,${imageBuffer.toString("base64")}`;

        return {
          id: item.iddata,
          content: (
            <div>
              <h2>{item.naslov}</h2>
              <p>{item.podnaslov}</p>
            </div>
          ),
          image: imageDataURL,
          otherData: item,
          width: 3,
          type: "text",
          parent_id: 1,
        };
      });

      setBlocks(formattedData);
    } catch (error) {
      console.error(error);
    }
  };


  const handleSort = async (newBlocks) => {
    // Update the "zaporedje" values in the newBlocks array
    const updatedBlocks = newBlocks.map((block, index) => ({
      ...block,
      zaporedje: index + 1, // Set the new "zaporedje" value based on the index
    }));

    // Extract the IDs from the updated blocks
    const ids = updatedBlocks.map((block) => block.id);

    // Update the "zaporedje" values in the database
    try {
      await fetch("https://centergibanja.si/api/updatezaporedje", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBlocks),
      });
 

      setBlocks(updatedBlocks); // Update the state with the new order
    } catch (error) {
      console.error(error);
    }
  };

  const getImageUrl = (imageData) => {
    return new Promise((resolve, reject) => {
      if (Buffer.isBuffer(imageData)) {
        const base64Image = imageData.toString("base64");
        const mimeType = "image/jpeg"; // Adjust the MIME type according to your image format
        const dataUrl = `data:${mimeType};base64,${base64Image}`;
        resolve(dataUrl);
      } else if (typeof imageData === "string") {
        resolve(imageData); // Already a URL
      } else {
        reject(new Error("Invalid image data"));
      }
    });
  };

  return (
    <div>
      <ReactSortable list={blocks} setList={handleSort} {...sortableOptions}>
        {blocks.map((block) => (
          <BlockWrapper key={block.id} block={block} setBlocks={setBlocks} setSelectedBlock={setSelectedBlock}
          />
        ))}
      </ReactSortable>
      {selectedBlock && (
        <BlockForm block={selectedBlock} setBlocks={setBlocks} setSelectedBlock={setSelectedBlock} />
      )}
    </div>
  );
}
function Container({ block, blockIndex, setBlocks }) {
  return (
    <>
      <ReactSortable
        key={block.id}
        list={block.children}
        setList={(currentList) => {
          setBlocks((sourceList) => {
            const tempList = [...sourceList];
            const _blockIndex = [...blockIndex];
            const lastIndex = _blockIndex.pop();
            const lastArr = _blockIndex.reduce(
              (arr, i) => arr[i]["children"],
              tempList
            );
            console.log(lastIndex);
            lastArr[lastIndex]["children"] = currentList;
            return tempList;
          });
        }}
        {...sortableOptions}
      >
        {block.children &&
          block.children.map((childBlock, index) => {
            return (
              <BlockWrapper
                key={childBlock.id}
                block={childBlock}
                blockIndex={[...blockIndex, index]}
                setBlocks={setBlocks}
              />
            );
          })}
      </ReactSortable>
    </>
  );
}
function BlockWrapper({ block, blockIndex, setBlocks, setSelectedBlock }) {

  const handleBlockClick = () => {
    setSelectedBlock(block);
  };

  if (!block) return null;
  if (block.type === "container") {
    return (
      <StyledBlockWrapper className="block">
        container: {block.content}
        <img src={block.image} alt="Image" />
        <Container block={block} setBlocks={setBlocks} blockIndex={blockIndex} />
      </StyledBlockWrapper>
    );
  } else {
    return (
      <StyledBlockWrapper className="block" id="set-block-radius">
        <div className="container-rules">
          <div className="image-container-drag-drop" style={{
            backgroundImage: `url(${block.image})`,
            backgroundSize: "cover", // Adjust the background size as needed
            backgroundPosition: "center", // Adjust the background position as needed
          }}>

          </div>
          <div className="content-container">{block.content}</div>
          <div className="settings-icon" onClick={handleBlockClick}>
            <img src={settingsIcon} alt="Settings Icon" />

          </div>

        </div>
      </StyledBlockWrapper>
    );
  }
}

function BlockForm({ block, setBlocks, setSelectedBlock }) {
  const [selectedImage, setSelectedImage] = useState(block.image);
  const [textField2Value, setTextField2Value] = useState(block.podnaslov);
  const [textField1Value, setTextField1Value] = useState(block.naslov);
  const [textField3Value, setTextField3Value] = useState(
    block.cena_takoj === 1 && block.cena_takoj_vrednost !== null ? block.cena_takoj_vrednost.split(";")[1] : ""
  );
  const [textField4Value, setTextField4Value] = useState(
    block.cena_takoj === 1 && block.cena_takoj_vrednost !== null ? block.cena_takoj_vrednost.split(";")[0] : ""
  );
  const [showSpreadsheet, setShowSpreadsheet] = useState(block.cena_takoj === 0);

  const [spreadsheetData, setSpreadsheetData] = useState(
    block.izbira_vrednost
      ? [
          ["", "", ""], // Empty row at the beginning
          ...block.izbira_vrednost.split("|").map((row, index) => {
            if (row.includes(";")) {
              return row.split(";");
            } else {
              return ["", row];
            }
          }),
          ["", "", ""], // Empty row at the end
          ["", "", ""] // Another empty row at the end
        ]
      : Array.from(Array(5), () => ["", "", ""]) // Five rows with empty cells
  );

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const handleDeleteClick2 = () => {
    setShowDeletePopup(true);
  };

  const handleConfirmation = (confirmation) => {
    if (confirmation) {
      // User confirmed deletion
      // Perform delete operation or any other logic here
      // ...
      console.log('Deleted!');
    }

    // Close the popup and reset the confirmation
    setShowDeletePopup(false);
    setDeleteConfirmation(false);
  };


  const handleSpreadsheetDataChange = (data) => {
    setSpreadsheetData(data);
  };



  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    setShowSpreadsheet(isChecked);

    // Update block.cena_takoj based on the checkbox state
    block.cena_takoj = isChecked ? 0 : 1;
    block.izbira = isChecked ? 1 : 0;
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

  const handleTextField4Change = (event) => {
    setTextField4Value(event.target.value);
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

  const handleImageContainerClick = () => {
    document.getElementById("image-input").click();
  };


  const handleBlockCloseClick = () => {
    setSelectedBlock(null);
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Perform any necessary form submission actions
    // Here you can access the block data and process it as needed
    console.log(block);

    // Clear the selected block after processing
    setSelectedBlock(null);
  };

  const handleDeleteClick = () => {
    const iddata = block.iddata;

    // Send a POST request to the server to delete the data
    axios
      .post('https://centergibanja.si/api/deleteData', { iddata })
      .then((response) => {
        console.log(response.data.message);
        // Update the block list after successful deletion
        setBlocks((prevBlocks) => prevBlocks.filter((b) => b.iddata !== iddata));
        // Clear the selected block after deletion
        setSelectedBlock(null);
      })
      .catch((error) => {
        console.error(error);
      });
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
  formData.append("iddata", block.iddata);
  formData.append("image", imageBlob, "image.jpg");
  formData.append("textField1", textField1Value);
  formData.append("textField2", textField2Value);
  formData.append("textField3", newVal);
  formData.append("showSpreadsheet", showSpreadsheet);
  formData.append("spreadsheetData", combinedSpreadsheetData);

  console.log(formData);

  axios
    .post("https://centergibanja.si/api/updateData", formData, {
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
    })
    .catch(error => {
      console.error(error);
      // Handle error
    });
  };


  return (
    <form onSubmit={handleFormSubmit}>
      <div className="popup-overlay">
        <div className={`popup-window`}>
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
          </div>

          {!showSpreadsheet && (
            <><input type="text" className="input-field" placeholder="Cena" value={textField3Value} onChange={handleTextField3Change} />
            <input type="text" className="input-field" placeholder="Opis" value={textField4Value} onChange={handleTextField4Change} /></>

          )}

          <label htmlFor="showSpreadsheetCheckbox">
            <input
              type="checkbox"
              id="showSpreadsheetCheckbox"
              onChange={handleCheckboxChange}
              checked={block.cena_takoj === 0}


            />
            <p className="checkbox-para">Več možnosti</p>
          </label>

          {showSpreadsheet && (
            <Spreadsheet
              initialData={
                block.izbira_vrednost
                  ? [
                    ["", "", ""], // Empty row at the beginning
                    ...block.izbira_vrednost
                      .split("|")
                      .map((row, index) => {
                        if (row.includes(";")) {
                          return row.split(";");
                        } else {
                          return ["", row];
                        }
                      }),
                      ["", "", ""], // Empty row at the end
                      ["", "", ""] // Another empty row at the end
                  ]
                  : Array.from(Array(5), () => ["", "", ""]) // Five rows with empty cells
              }
              onDataChange={handleSpreadsheetDataChange}
            />
          )}

          <div className="buttons-row">
            <button className="add-form-button" onClick={handleAddFormButtonClick}>Spremeni</button>
            <button className="delete-button" onClick={handleDeleteClick}>Izbriši</button>
            <button className="popup-button" onClick={handleBlockCloseClick}>Zapri</button>
          </div>
        </div>
        
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}


export async function fetchData2(setBlocks) {
  try {
    const response = await fetch("https://centergibanja.si/api/getdata");
    const data = await response.json();
    console.log("response: ", response);
    console.log("data: ", data);

    const sortedData = data.sort((a, b) => a.zaporedje - b.zaporedje);

    const formattedData = sortedData.map((item) => {
      // Convert buffer to data URL
      const imageBuffer = Buffer.from(item.slika);
      const imageDataURL = `data:image/jpeg;base64,${imageBuffer.toString("base64")}`;

      return {
        id: item.iddata,
        iddata: item.iddata,
        cena_takoj_vrednost: item.cena_takoj_vrednost,
        cena_takoj: item.cena_takoj,
        izbira: item.izbira,
        izbira_vrednost: item.izbira_vrednost,
        naslov: item.naslov,
        podnaslov: item.podnaslov,
        zaporedje: item.zaporedje,
        content: (
          <div>
            <h2>{item.naslov}</h2>
            <p>{item.podnaslov}</p>
          </div>
        ),
        image: imageDataURL,
        otherData: item.cena_takoj + "/" + item.cena_takoj_vrednost + "/" + item.iddata + "/" + item.izbira + "/" + item.naslov + "/" + item.podnaslov + "/" + item.zaporedje + "/" + item.izbira_vrednost,
        width: 3,
        type: "text",
        parent_id: 1,
      };
    });
    console.log("Formated data: " + formattedData);
    setBlocks(formattedData);
  } catch (error) {
    console.error(error);
  }
}