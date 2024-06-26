import React, { useContext, useEffect, useState } from "react";
import logoLight from "../assets/images/logo-light.svg";
import logoDark from "../assets/images/logo-dark.svg";
import boardIcon from "../assets/images/icon-board.svg";
import lightThemeIcon from "../assets/images/icon-light-theme.svg";
import darkThemeIcon from "../assets/images/icon-dark-theme.svg";
import hideSidebarIcon from "../assets/images/icon-hide-sidebar.svg";
import { MENU_TAB_INDEX } from "../utils/constants";

import ThemeContext from "../ThemeContext";

import "../style/sidebar.css";

const Sidebar = ({
  boards,
  selectBoard,
  hideSidebar,
  selectedId,
  toggleTheme,
  setIsAddNewBoardShown,
  isPopupOpen,
}) => {
  const theme = useContext(ThemeContext);

  const isEnterPressed = (e) => {
    return e.key === "Enter";
  };

  return (
    <div className={`sidebar sidebar-${theme}`}>
      {/* LOGO */}
      <div className="sidebar-logo">
        <img alt="logo" src={theme === "light" ? logoDark : logoLight} />
      </div>
      {/* ALL BOARDS */}
      <p className="sidebar-boards--title">
        {`ALL BOARDS (${boards && boards.length})`}
      </p>
      <div className="sidebar-boards">
        {boards &&
          boards.map(({ boardName, id }) => (
            <div
              className={`sidebar-boards--board ${
                id === selectedId
                  ? "sidebar-boards--board--selected"
                  : `sidebar-boards--board--${theme}`
              }`}
              key={id}
              onClick={() => selectBoard(id)}
              onKeyDown={(e) => {
                isEnterPressed(e) && selectBoard(id);
              }}
              tabIndex={isPopupOpen ? null : MENU_TAB_INDEX}
            >
              <img src={boardIcon} alt="board icon" />
              <p
                className={`headingM ${
                  id === selectedId && "sidebar-boards--board--selected"
                }`}
              >
                {boardName}
              </p>
            </div>
          ))}
        {/* ADD NEW BOARD */}
        <div
          className="sidebar-boards--board sidebar-boards--add"
          onClick={() => setIsAddNewBoardShown(true)}
          tabIndex={isPopupOpen ? null : MENU_TAB_INDEX}
          onKeyDown={(e) => {
            isEnterPressed(e) && setIsAddNewBoardShown(true);
          }}
        >
          <img src={boardIcon} alt="board icon" />
          <p className="headingM">+Create New Board</p>
        </div>
      </div>
      {/* THEME TOGGLER */}
      <div className={`sidebar-toggle-theme sidebar-toggle-theme-${theme}`}>
        <img src={lightThemeIcon} alt="light theme" />
        <div
          className="theme-switch"
          onClick={toggleTheme}
          tabIndex={isPopupOpen ? null : MENU_TAB_INDEX}
          onKeyDown={(e) => {
            isEnterPressed(e) && toggleTheme();
          }}
        >
          <div
            className={`theme-switch--track ${
              theme === "light"
                ? "theme-switch--track-light"
                : "theme-switch--track-dark"
            }`}
          ></div>
        </div>
        <img src={darkThemeIcon} alt="dark  theme" />
      </div>
      {/* SIDEBAR SWITCH OFF */}
      <div
        className={`sidebar-hide sidebar-hide-${theme}`}
        onClick={hideSidebar}
        tabIndex={isPopupOpen ? null : MENU_TAB_INDEX}
        onKeyDown={(e) => {
          isEnterPressed(e) && hideSidebar();
        }}
      >
        <img src={hideSidebarIcon} alt="Hide sidebar icon" />
        <p className="headingM">Hide Sidebar</p>
      </div>
    </div>
  );
};

export default Sidebar;
