import React, { useContext } from "react";
import ThemeContext from "../ThemeContext";
import "../style/buttons.css";

const CustomButton = ({
  text,
  type,
  onClick,
  width = "100%",
  plus = false,
  customStyles = {},
}) => {
  const theme = useContext(ThemeContext);

  const types = {
    PrimaryL: "button-primary-l",
    PrimaryS: "button-primary-s",
    Secondary: "button-secondary",
    Destructive: "button-destructive",
    ThemeToggler: "button-theme-toggler",
  };
  const buttonType = types[type] || types["PrimaryL"];
  const themeStyle = theme === "light" ? buttonType : `${buttonType}-dark`;

  return (
    <button
      onClick={onClick}
      className={themeStyle}
      style={{ width: width, ...customStyles }}
    >
      {plus ? `+ ${text}` : text}
    </button>
  );
};

export default CustomButton;
