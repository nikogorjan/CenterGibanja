import './TTable.css'; // Import CSS file for styling
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TTable = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        // Fetch data from the server
        axios.get("https://centergibanja.si/api/getAllUrnik")
            .then((response) => {
                // Format the data into the "events" array
                console.log("getting data");
                const formattedEvents = response.data.map((event) => ({
                    id: event.id, // Assuming you have an "id" column in the "urnik" table
                    dan: event.dan,
                    zacetek: event.zacetek,
                    konec: event.konec,
                    opis: event.opis,
                }));
                setEvents(formattedEvents);
            })
            .catch((error) => {
                console.error(error);
                // Handle error if needed
            });
    }, []);

    const handleCellChange = (event, rowIndex, key) => {
        const { value } = event.target;
        setEvents((prevEvents) => {
            const updatedEvents = [...prevEvents];
            updatedEvents[rowIndex][key] = value;
            return updatedEvents;
        });
    };

    const handleDeleteRow = (rowIndex, id) => {
        // Update the events state by removing the event at the specified rowIndex
        setEvents((prevEvents) => {
          const updatedEvents = [...prevEvents];
          updatedEvents.splice(rowIndex, 1);
          return updatedEvents;
        });
      
        // Remove the event from the database
        axios.post("https://centergibanja.si/api/deleteUrnikData", { iddata: id })
          .then((response) => {
            console.log("deleted");
            // Handle successful deletion if needed
          })
          .catch((error) => {
            console.error(error);
          });
      };

    const handleAddRow = () => {
        setEvents((prevEvents) => [
            ...prevEvents,
            {
                id: null,
                day: "",
                zacetek: "",
                konec: "",
                description: "",
            },
        ]);
    };

    const handleApplyChanges = () => {
        events.forEach((event) => {
          if (event.id) {
            // Update existing event in the database
            axios.post("https://centergibanja.si/api/updateUrnikData", event)
              .then((response) => {
                console.log("updated")
              })
              .catch((error) => {
                console.error(error);
              });
          } else {
            // Add new event to the database
            axios.post("https://centergibanja.si/api/urnikData", event)
              .then((response) => {
                console.log("saved")
              })
              .catch((error) => {
                console.error(error);
              });
          }
        });
      };
      

    return <div className="ekipa-container">
        <table className='event-table'>
            <thead>
                <tr>
                    <th className='urnik-th'>Dan</th>
                    <th className='urnik-th'>Zacetek</th>
                    <th className='urnik-th'>Konec</th>
                    <th className='urnik-th'>Opis</th>
                    <th className='urnik-th'>Delete</th>
                </tr>
            </thead>
            <tbody>
                {events.map((event, index) => (
                    <tr key={index}>
                        <td className='urnik-th'>
                            <select
                                value={event.dan}
                                onChange={(e) => handleCellChange(e, index, "dan")}
                            >
                                <option value="PO">PO</option>
                                <option value="TO">TO</option>
                                <option value="SR">SR</option>
                                <option value="ČE">ČE</option>
                                <option value="PE">PE</option>
                                <option value="SO">SO</option>
                                <option value="NE">NE</option>
                            </select>
                        </td>
                        <td className='urnik-th'>
                            <input
                                type="text"
                                value={event.zacetek}
                                onChange={(e) => handleCellChange(e, index, "zacetek")}
                            />
                        </td>
                        <td className='urnik-th'>
                            <input
                                type="text"
                                value={event.konec}
                                onChange={(e) => handleCellChange(e, index, "konec")}
                            />
                        </td>
                        <td className='urnik-th-long'>
                            <input
                                type="text"
                                value={event.opis}
                                onChange={(e) => handleCellChange(e, index, "opis")}
                            />
                        </td>
                        <td className='urnik-th'>
                            <button onClick={() => handleDeleteRow(index, event.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        <button className='urnik-button' onClick={handleAddRow}>Add Row</button>
        <button className='urnik-button' onClick={handleApplyChanges}>Apply</button>
    </div>;
};

export default TTable;