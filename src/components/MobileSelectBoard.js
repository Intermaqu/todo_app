import React, { useContext } from "react";
import ThemeContext from "../ThemeContext";
import boardIcon from "../assets/images/icon-board.svg";
import lightThemeIcon from "../assets/images/icon-light-theme.svg";
import darkThemeIcon from "../assets/images/icon-dark-theme.svg";
import "../style/mobileSelectBoard.css";

const MobileSelectBoard = ({
  boards,
  selectBoard,
  selectedId,
  toggleTheme,
  setIsAddNewBoardShown,
  setIsMobileSelectBoardShown,
}) => {
  const theme = useContext(ThemeContext);

  return (
    <div
      className="overlay"
      onMouseDown={() => setIsMobileSelectBoardShown(false)}
    >
      <div
        className={`mobile-select-board mobile-select-board-${theme}`}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <p className="mobile-select-board-title">
          {`ALL BOARDS (${boards && boards.length})`}
        </p>
        {boards &&
          boards.map(({ boardName, id }) => (
            <div
              className={`mobile-select-board-board ${
                id === selectedId
                  ? "mobile-select-board-board-selected"
                  : `mobile-select-board-board-${theme}`
              }`}
              key={id}
              onClick={() => {
                selectBoard(id);
                setIsMobileSelectBoardShown(false);
              }}
            >
              <img src={boardIcon} alt="board icon" />
              <p
                className={`headingM ${
                  id === selectedId && "mobile-select-board-board-selected"
                }`}
              >
                {boardName}
              </p>
            </div>
          ))}
        {/* ADD NEW BOARD */}
        <div
          className="mobile-select-board-board mobile-select-board-board-add"
          onClick={() => {
            setIsAddNewBoardShown(true);
            setIsMobileSelectBoardShown(false);
          }}
        >
          <img src={boardIcon} alt="board icon" />
          <p className="headingM">+Create New Board</p>
        </div>
        {/* THEME TOGGLER */}
        <div
          className={`sidebar-toggle-theme sidebar-toggle-theme-${theme} sidebar-toggle-theme-mobile`}
        >
          <img src={lightThemeIcon} alt="light theme" />
          <div className="theme-switch" onClick={() => toggleTheme()}>
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
      </div>
    </div>
  );
};

export default MobileSelectBoard;
