import React, { useState } from "react";
import './SwitchButton.css';

const SwitchButton = ({ isOn, setIsOn }) => {

    const toggleSwitch = () => {
        setIsOn(!isOn);
    };

    return (
        <div className="switch-container">
            <div className={`switch ${isOn ? "on" : "off"}`} onClick={toggleSwitch}>
                <div className={`circle ${isOn ? "circle-on" : "circle-off"}`} />
            </div>
        </div>
    );
};

export default SwitchButton;
