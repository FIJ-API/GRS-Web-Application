import React, { useState } from "react";
import './SwitchButton.css';

const SwitchButton = ({ chip, setChip }) => {

    const toggleSwitch = () => {
        setChip(!chip);
    };

    return (
        <div className="switch-container">
            <div className={`switch ${chip ? "on" : "off"}`} onClick={toggleSwitch}>
                <div className={`circle ${chip ? "circle-on" : "circle-off"}`} />
            </div>
        </div>
    );
};

export default SwitchButton;
