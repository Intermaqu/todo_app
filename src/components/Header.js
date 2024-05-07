import React, { useContext, useState, useEffect } from "react";
import "../style/header.css";
import logoLight from "../assets/images/logo-light.svg";
import logoDark from "../assets/images/logo-dark.svg";
import ThemeContext from "../ThemeContext";
import CustomButton from "./CustomButton";
import { DESKTOP_BREAKPOINT } from "../utils/constants";

const TAB_INDEX = 1;

const Header = ({
  isSidebarOpen,
  addNewTask,
  boardName,
  isBoardEmpty,
  setIsEditBoardShown,
  setIsDeleteBoardShown,
  windowWidth,
  isPopupOpen,
}) => {
  const theme = useContext(ThemeContext);
  const [isMenuShown, setIsMenuShown] = useState(false);

  const logo = theme === "light" ? logoDark : logoLight;

  const handleMenuClick = () => {
    setIsMenuShown(false);
  };

  // useEffect(() => {
  //   const handleHideAllModals = (e) => {
  //     e.key === "Escape" && setIsMenuShown(false);
  //   };
  //   window.addEventListener("click", handleHideAllModals);
  //   return () => {
  //     window.removeEventListener("click", handleHideAllModals);
  //   };
  // }, []);

  return (
    <div
      className={`header header-${theme} ${
        !isSidebarOpen ? "header-sidebar-closed" : "header-sidebar-open"
      }`}
    >
      {!isSidebarOpen && (
        <div className={`header__logo header__logo-${theme}`}>
          <img src={logo} alt="logo" />
        </div>
      )}

      <div
        className={`header__title-wrapper ${
          !isSidebarOpen && "header__title-border"
        }`}
      >
        <p className={`header__title-${theme} headingXL`}>{boardName}</p>
      </div>
      <div className="header__buttons-wrapper">
        <CustomButton
          type="PrimaryL"
          text={windowWidth < DESKTOP_BREAKPOINT ? "" : "Add new task"}
          onClick={addNewTask}
          plus={true}
          customStyles={{
            opacity: isBoardEmpty ? "0.25" : "1",
            pointerEvents: isBoardEmpty ? "none" : "auto",
            userSelect: "none",
          }}
          width={windowWidth < DESKTOP_BREAKPOINT ? "75px" : "165px"}
          onKeyDown={(e) => e.key === "Enter" && addNewTask()}
          // disabled={isPopupOpen}
        />
        <button
          className="hamburger"
          onClick={() => setIsMenuShown(true)}
          onKeyDown={(e) => e.key === "Enter" && setIsMenuShown(true)}
          // disabled={isPopupOpen}
        >
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
        </button>
        {isMenuShown && (
          <div className={`hamburger-menu hamburger-menu-${theme}`}>
            <button
              className="hamburger-menu-edit bodyL"
              onClick={(e) => {
                e.stopPropagation();
                setIsEditBoardShown(true);
                setIsMenuShown(false);
              }}
            >
              Edit Board
            </button>
            <button
              className="hamburger-menu-delete bodyL"
              onClick={(e) => {
                e.stopPropagation();
                setIsDeleteBoardShown(true);
                setIsMenuShown(false);
              }}
            >
              Delete Board
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
