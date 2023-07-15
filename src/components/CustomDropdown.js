import React, { useContext, useState } from "react";
import "../style/dropdowns.css";
import ThemeContext from "../ThemeContext";
import arrowDown from "../assets/images/icon-chevron-down.svg";
import arrowUp from "../assets/images/icon-chevron-up.svg";

const CustomDropdown = ({ value, setValue, options, width = "100%" }) => {
    const [isOpen, setIsOpen] = useState(false);

    const theme = useContext(ThemeContext);

    return (
        <div
            className="custom-dropdown-wrapper"
            style={{ width: width }}
            onClick={() => setIsOpen(!isOpen)}
        >
            <div
                className={`custom-dropdown-content ${
                    isOpen && "custom-dropdown-content-opened"
                } custom-dropdown-content-${theme}`}
            >
                <p>{value.columnName}</p>
                <img
                    src={isOpen ? arrowUp : arrowDown}
                    className="dropdown-arrow"
                    alt="that is dropdown arrow"
                />
            </div>
            {isOpen && (
                <div
                    className={`custom-dropdown-options custom-dropdown-options-${theme}`}
                >
                    {options.map((option) => (
                        <span
                            className="custom-dropdown-option"
                            onClick={() => {
                                setValue(option);
                                setIsOpen(false);
                            }}
                            key={option.id}
                        >
                            {option.columnName}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomDropdown;
