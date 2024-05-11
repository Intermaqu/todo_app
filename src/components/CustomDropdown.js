import React, { useContext, useState, useEffect } from "react";
import "../style/dropdowns.css";
import ThemeContext from "../ThemeContext";

const CustomDropdown = ({ value, setValue, options, width = "100%" }) => {
  const theme = useContext(ThemeContext);
  const [selectedValue, setSelectedValue] = useState({
    id: value.columnId,
    columnName: value.columnName,
  });

  const handleChange = (e) => {
    setValue(options.find((option) => option.id === e.target.value));
    setSelectedValue(options.find((option) => option.id === e.target.value));
  };

  console.log("value:", value);
  console.log("options:", options);

  return (
    <div className="custom-dropdown-wrapper" style={{ width: width }}>
      <select
        onChange={handleChange}
        className={`custom-dropdown-content custom-dropdown-content-${theme}`}
        value={selectedValue.id}
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
