import React, { useState } from 'react';
import "./ClassInfo.css";

const classOneName = "No Class Scheduled";
const classOneLocation = "";
const classOneTime = "";
const classOneDescription = "";

const classTwoName = "No Class Scheduled";
const classTwoLocation = "";
const classTwoTime = "";
const classTwoDescription = "";

const classThreeName = "No Class Scheduled";
const classThreeLocation = "";
const classThreeTime = "";
const classThreeDescription = "";

const classFourName = "No Class Scheduled";
const classFourLocation = "";
const classFourTime = "";
const classFourDescription = "";

const ClassInfo = ({ dayOfWeek }) => {

    const handleOnClick = (longitude, latitude) => {
        // Handle the click event to show the map with the given coordinates
        console.log(`Showing longitude: ${longitude}, latitude: ${latitude}`);
    };

    return (
        <div className="class-info-container">
            <div className="class-item">
                <h2 className="class-name">{classOneName}</h2>
                <p className="class-location">{classOneLocation}</p>
                <p className="class-time">{classOneTime}</p>
                <p className="class-description">{classOneDescription}</p>
                <button onClick={() => handleOnClick({ longitude: -77.305, latitude: 38.830 })}>
                    View on Map
                </button>
            </div>

            <div className="class-item">
                <h2 className="class-name">{classTwoName}</h2>
                <p className="class-location">{classTwoLocation}</p>
                <p className="class-time">{classTwoTime}</p>
                <p className="class-description">{classTwoDescription}</p>
                <button onClick={() => handleOnClick({ longitude: -77.306, latitude: 38.831 })}>
                    View on Map
                </button>
            </div>

            <div className="class-item">
                <h2 className="class-name">{classThreeName}</h2>
                <p className="class-location">{classThreeLocation}</p>
                <p className="class-time">{classThreeTime}</p>
                <p className="class-description">{classThreeDescription}</p>
                <button onClick={() => handleOnClick({ longitude: -77.307, latitude: 38.832 })}>
                    View on Map
                </button>
            </div>

            <div className="class-item">
                <h2 className="class-name">{classFourName}</h2>
                <p className="class-location">{classFourLocation}</p>
                <p className="class-time">{classFourTime}</p>
                <p className="class-description">{classFourDescription}</p>
                <button onClick={() => handleOnClick({ longitude: -77.308, latitude: 38.833 })}>
                    View on Map
                </button>
            </div>
        </div>
    );
}

export default ClassInfo;