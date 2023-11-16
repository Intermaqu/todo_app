import React, { useContext, useState } from "react";
import "../style/header.css";
import logoLight from "../assets/images/logo-light.svg";
import logoDark from "../assets/images/logo-dark.svg";
import arrowDown from "../assets/images/icon-chevron-down.svg";
import arrowUp from "../assets/images/icon-chevron-up.svg";
import mobileLogo from "../assets/images/logo-mobile.svg";
import ThemeContext from "../ThemeContext";
import CustomButton from "./CustomButton";

const Header = ({
  isSidebarOpen,
  addNewTask,
  boardName,
  isBoardEmpty,
  setIsEditBoardShown,
  setIsDeleteBoardShown,
  isMobile,
}) => {
  const theme = useContext(ThemeContext);
  const [isMenuShown, setIsMenuShown] = useState(false);

  const logo = theme === "light" ? logoDark : logoLight;

  const handleMenuClick = () => {
    setIsMenuShown(false);
  };

  return (
    <div
      className={`header header-${theme} ${
        !isSidebarOpen && "header-sidebar-closed"
      }`}
    >
      {!isSidebarOpen && (
        <div className={`header__logo header__logo-${theme}`}>
          <img src={logo} alt="logo" />
        </div>
      )}
      <div
        className={`header__title-${theme} headingXL ${
          !isSidebarOpen &&
          `header__title-border header__title-collapsed-${theme}`
        }`}
      >
        {boardName}
      </div>
      <CustomButton
        type="PrimaryL"
        text="Add new task"
        onClick={addNewTask}
        plus={true}
        width="165px"
        customStyles={{
          opacity: isBoardEmpty ? "0.25" : "1",
          pointerEvents: isBoardEmpty ? "none" : "auto",
          userSelect: "none",
        }}
      />
      <div className="hamburger" onClick={() => setIsMenuShown(true)}>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        {isMenuShown && (
          <div
            className="hamburger-menu-overlay"
            onClick={(e) => {
              e.stopPropagation();
              handleMenuClick();
            }}
          ></div>
        )}
        {isMenuShown && (
          <div className={`hamburger-menu hamburger-menu-${theme}`}>
            <span
              className="hamburger-menu-edit bodyL"
              onClick={(e) => {
                e.stopPropagation();
                setIsEditBoardShown(true);
                setIsMenuShown(false);
              }}
            >
              Edit Board
            </span>
            <span
              className="hamburger-menu-delete bodyL"
              onClick={(e) => {
                e.stopPropagation();
                setIsDeleteBoardShown(true);
                setIsMenuShown(false);
              }}
            >
              Delete Board
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
