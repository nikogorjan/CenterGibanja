import React, { useState, useEffect } from "react";
import axios from "axios";

import '../urnik/Urnik.css';
import Navbar from "../home/navbar/navbar";

  
  const TimesTable = () => {
    const daysOfWeek = ['PO', 'TO', 'SR', 'ČE', 'PE', 'SO', 'NE'];
    const timeIntervals = ['8:00 - 10:00', '10:00 - 12:00', '12:00 - 14:00', '14:00 - 16:00', '16:00 - 18:00', '18:00 - 20:00'];
    const [events, setEvents] = useState([]);

    useEffect(() => {
      // Fetch data from the server
      axios.get("https://centergibanja.si/api/getAllUrnik")
        .then((response) => {
          // Format the data into the "events" array
          console.log("getting data");
          const formattedEvents = response.data.map((event) => ({
            id: event.id, // Assuming you have an "id" column in the "urnik" table
            day: event.dan,
            time: `${event.zacetek} - ${event.konec}`,
            description: event.opis,
          }));
          setEvents(formattedEvents);
        })
        .catch((error) => {
          console.error(error);
          // Handle error if needed
        });
    }, []);

    // Function to find the nearest time interval for an event
    const findNearestTimeInterval = (time) => {
      const timeIntervalsInMinutes = timeIntervals.map((interval) => {
        const [startTime, endTime] = interval.split(' - ');
        const [startHour, startMinute] = startTime.split(':').map((str) => parseInt(str));
        return startHour * 60 + startMinute;
      });
  
      const [eventHour, eventMinute] = time.split(' - ')[0].split(':').map((str) => parseInt(str));
      const eventTimeInMinutes = eventHour * 60 + eventMinute;
  
      let nearestIndex = 0;
      let minDifference = Math.abs(eventTimeInMinutes - timeIntervalsInMinutes[0]);
  
      timeIntervalsInMinutes.forEach((intervalMinutes, index) => {
        const difference = Math.abs(eventTimeInMinutes - intervalMinutes);
        if (difference < minDifference) {
          minDifference = difference;
          nearestIndex = index;
        }
      });
  
      return timeIntervals[nearestIndex];
    };

    const timeToMinutes = (time) => {
      const [hour, minute] = time.split(':').map((part) => parseInt(part, 10));
      return hour * 60 + minute;
    };
  
    const timeIntervals2 = [
      '8:00 - 10:00',
      '10:00 - 12:00',
      '12:00 - 14:00',
      '14:00 - 16:00',
      '16:00 - 18:00',
      '18:00 - 20:00'
    ];
    
    const groupEventsByTime = () => {
      const groupedEvents = {};
      events.forEach((event) => {
        let matchingInterval = timeIntervals2.find((interval) => {
          const [start, end] = interval.split(' - ');
          const eventStartTime = event.time.split(' - ')[0];
          return eventStartTime >= start && eventStartTime < end;
        });
    
        // If there is no exact match, find the nearest interval
        if (!matchingInterval) {
          const eventStartTime = timeToMinutes(event.time.split(' - ')[0]);
          let minDiff = Infinity;
          timeIntervals2.forEach((interval) => {
            const [start] = interval.split(' - ');
            const intervalStartTime = timeToMinutes(start);
            const diff = Math.abs(eventStartTime - intervalStartTime);
            if (diff < minDiff) {
              minDiff = diff;
              matchingInterval = interval;
            }
          });
        }
    
        if (matchingInterval) {
          const key = `${event.day}-${matchingInterval}`;
          if (groupedEvents[key]) {
            groupedEvents[key].push(event);
          } else {
            groupedEvents[key] = [event];
          }
        }
      });
    
      return groupedEvents;
    };

  
  
    const renderContent = () => {
      const groupedEvents = groupEventsByTime();
    
      return timeIntervals.map((time, rowIndex) => {
        const startMinutes = timeToMinutes(time);
        const nextTime = rowIndex + 1 < timeIntervals.length ? timeToMinutes(timeIntervals[rowIndex + 1]) : 24 * 60;
    
        return (
          <React.Fragment key={rowIndex}>
            {daysOfWeek.map((day, colIndex) => {
              const key = `${day}-${time}`;
              const dayEvents = groupedEvents[key] || [];
    
              // Sort events by start time
              dayEvents.sort((a, b) => {
                const startTimeA = timeToMinutes(a.time.split(' - ')[0]);
                const startTimeB = timeToMinutes(b.time.split(' - ')[0]);
                return startTimeA - startTimeB;
              });
    
              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`content-cell ${day === 'saturday' || day === 'sunday' ? 'weekend' : ''}`}
                  style={{ gridArea: `${time.replace(':', '-').split(' ').join('')} / ${day}` }}
                >
                  {dayEvents.map((event, index) => {
                    const eventStart = timeToMinutes(event.time.split(' - ')[0]);
                    const eventEnd = timeToMinutes(event.time.split(' - ')[1]);
                    const duration = eventEnd - eventStart;
                    const rowspan = Math.ceil(duration / 30);
                    const topOffset = (eventStart - startMinutes) / 30;
    
                    return (
                      <div
                        key={event.id}
                        className={`accent-cyan-gradient2 accent-${event.day === 'sunday' ? 'cyan' : event.day}-gradient ${
                          dayEvents.length > 1 ? 'multiple-events' : ''
                        }`}
                        style={{
                          borderRadius: '4px',
                          padding: '4px',
                          marginBottom: dayEvents.length > 1 ? '4px' : '0',
                          gridColumn: dayEvents.length > 1 ? '1 / -1' : undefined,
                          gridRow: `${topOffset + 1} / span ${rowspan}`,
                        }}
                      >
                        <div>
                        <div>{event.time}</div>
                        <div>{event.description}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </React.Fragment>
        );
      });
    };
  
    return (
      <div>
      
      <div className="timetable">
      
        <div className="week-names">
          {daysOfWeek.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>
        <div className="time-interval">
          {timeIntervals.map((time) => (
            <div key={time}>{time}</div>
          ))}
        </div>
        <div className="content">{renderContent()}</div>
      </div>
      </div>
    );
  };
  
  export default TimesTable;