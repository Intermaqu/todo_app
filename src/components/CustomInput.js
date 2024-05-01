import React, { useContext, useEffect, useRef, useState } from "react";
import ThemeContext from "../ThemeContext";
import "../style/inputs.css";

const CustomInput = ({
  value,
  onChangeValue,
  placeholder = "Name",
  width = "100%",
  type = "text",
  customStyles = {},
  isValid,
}) => {
  const theme = useContext(ThemeContext);
  const inputRef = useRef(null);

  const handleClickParent = () => {
    inputRef.current && inputRef.current.focus();
  };

  const className = `custom-input-wrapper custom-input-wrapper-${theme} ${
    isValid && "custom-input-wrapper-invalid"
  }`;

  return (
    <div
      className={className}
      style={{ width: width, ...customStyles }}
      onClick={handleClickParent}
    >
      {type === "textarea" ? (
        <textarea
          onChange={(e) => onChangeValue(e.target.value)}
          value={value}
          placeholder={placeholder}
          style={{ width: width, height: "100%" }}
          className="custom-input-input"
          ref={inputRef}
        />
      ) : (
        <input
          type={type}
          onChange={(e) => onChangeValue(e.target.value)}
          value={value}
          placeholder={placeholder}
          style={{ width: width }}
          className="custom-input-input"
          ref={inputRef}
        />
      )}
      {isValid && <p className="custom-input-invalid-text">Can't be empty</p>}
    </div>
  );
};

export default CustomInput;
