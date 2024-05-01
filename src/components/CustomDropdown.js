import React, { useContext, useState, useEffect } from "react";
import "../style/dropdowns.css";
import ThemeContext from "../ThemeContext";

const CustomDropdown = ({ value, setValue, options, width = "100%" }) => {
  const theme = useContext(ThemeContext);

  const handleChange = (index) => {
    setValue(options[index]);
  };

  return (
    <div className="custom-dropdown-wrapper" style={{ width: width }}>
      <select
        value={value.id}
        onChange={(e) => handleChange(e.target.selectedIndex)}
        className={`custom-dropdown-content custom-dropdown-content-${theme}`}
      >
        {options.map((option) => (
          <option
            className={`custom-dropdown-option custom-dropdown-option-${theme}`}
            key={option.id}
            value={option.id}
          >
            {option.columnName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomDropdown;
