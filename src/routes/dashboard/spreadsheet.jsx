import React, { useState, useEffect } from "react";
import "./spreadsheet.css";

const Spreadsheet = ({ initialData, onDataChange }) => {
  const [data, setData] = useState(initialData);

  const handleChange = (event, rowIndex, colIndex) => {
    const newValue = event.target.value;

    setData((prevData) => {
      const newData = [...prevData];
      newData[rowIndex][colIndex] = newValue;
      return newData;
    });

    // Call the onDataChange prop with the updated data
    onDataChange(data);
  };

  const handleAddRow = () => {
    const newData = [...data];
    newData.push(["", "", ""]);
    setData(newData);
  };

  

  return (
    <div>
      <table className="spreadsheet">
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td key={colIndex}>
                  {rowIndex === 0 ? (
                    <p className="checkbox-para">
                      {colIndex === 0
                        ? "Ponudba"
                        : colIndex === 1
                        ? "Opis"
                        : "Cena"}
                    </p>
                  ) : (
                    <input
                      type="text"
                      value={cell}
                      onChange={(e) => handleChange(e, rowIndex, colIndex)}
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button className="button-click" onClick={handleAddRow}>
        Add Row
      </button>
    </div>
  );
};

export default Spreadsheet;