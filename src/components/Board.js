import React, { useContext, useEffect, useState, useRef } from "react";
import "../style/board.css";
import ThemeContext from "../ThemeContext";
import Column from "./Column";
import CustomButton from "./CustomButton";
import eyeIcon from "../assets/images/icon-show-sidebar.svg";
import { MENU_TAB_INDEX, NEW_COLUMN_TAB_INDEX } from "../utils/constants";

const Board = ({
  columns,
  isSidebarOpen,
  setIsSidebarOpen,
  setIsAddNewColumnShown,
  isMobile,
  isPopupOpen,
}) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isSpaceClicked, setIsSpaceClicked] = useState(false);
  const [startX, setStartX] = useState(null);
  const [startY, setStartY] = useState(null);
  const [scrollLeft, setScrollLeft] = useState(null);
  const [scrollTop, setScrollTop] = useState(null);
  const boardRef = useRef(null);

  const theme = useContext(ThemeContext);

  const handleMouseDown = (e) => {
    setIsMouseDown(true);
    setStartX(e.pageX - boardRef.current.offsetLeft);
    setStartY(e.pageY - boardRef.current.offsetTop);
    setScrollLeft(boardRef.current.scrollLeft);
    setScrollTop(boardRef.current.scrollTop);
  };

  const handleMouseLeave = () => {
    setIsMouseDown(false);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e) => {
    if (!isMouseDown) return;
    if (!isSpaceClicked) return;
    e.preventDefault();
    const x = e.pageX - boardRef.current.offsetLeft;
    const y = e.pageY - boardRef.current.offsetTop;
    const walkX = (x - startX) * 1;
    const walkY = (y - startY) * 1;
    boardRef.current.scrollLeft = scrollLeft - walkX;
    boardRef.current.scrollTop = scrollTop - walkY;
  };

  useEffect(() => {
    const handleSpacePressed = (e) => {
      if (
        (e.key === " " || e.code === "Space" || e.keyCode === 32) &&
        !isPopupOpen
      ) {
        e.preventDefault();
        setIsSpaceClicked(true);
      }
    };
    const handleSpaceReleased = (e) => {
      if (
        (e.key === " " || e.code === "Space" || e.keyCode === 32) &&
        !isPopupOpen
      ) {
        setIsSpaceClicked(false);
      }
    };
    document.addEventListener("keydown", handleSpacePressed);
    document.addEventListener("keyup", handleSpaceReleased);

    return () => {
      document.removeEventListener("keydown", handleSpacePressed);
      document.removeEventListener("keyup", handleSpaceReleased);
    };
  }, [isPopupOpen]);

  return (
    <div className={`board-wrapper`}>
      <div
        className={`board ${
          columns.length === 0 && "board-empty"
        } board-${theme} ${!isSidebarOpen && "board-sidebar-hidden"}`}
        ref={boardRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        style={{
          cursor:
            isSpaceClicked && isMouseDown
              ? "grabbing"
              : isSpaceClicked
              ? "grab"
              : "default",
        }}
      >
        {columns.length > 0 ? (
          <div className="board-scrollable-columns">
            {columns.map(({ id, columnName, dotColor, tasks }) => (
              <Column
                key={id}
                columnName={columnName}
                dotColor={dotColor}
                tasks={tasks}
                columnId={id}
                isSpaceClicked={isSpaceClicked}
                isPopupOpen={isPopupOpen}
              />
            ))}
            <div
              className={`column board--add-column board--add-column-${theme}`}
              onClick={() => setIsAddNewColumnShown(true)}
              tabIndex={isPopupOpen ? null : NEW_COLUMN_TAB_INDEX}
              onKeyDown={(e) =>
                e.key === "Enter" && setIsAddNewColumnShown(true)
              }
            >
              <p className="headingXL">+ New Column</p>
            </div>
          </div>
        ) : (
          <>
            <p className={`headingL board-empty-text`}>
              This board is empty. Create a new column to get started.
            </p>
            <CustomButton
              text="Add New Column"
              onClick={() => {
                setIsAddNewColumnShown(true);
              }}
              // callback={addNewColumn}
              type="PrimaryL"
              width="175px"
              plus
              disabled={isPopupOpen}
              onKeyDown={(e) =>
                e.key === "Enter" && setIsAddNewColumnShown(true)
              }
            />
          </>
        )}
      </div>
      {!isMobile && !isSidebarOpen && (
        <div
          className="sidebar-toggle-button"
          onClick={() => setIsSidebarOpen(true)}
          tabIndex={NEW_COLUMN_TAB_INDEX}
          onKeyDown={(e) => e.key === "Enter" && setIsSidebarOpen(true)}
        >
          <img src={eyeIcon} alt="sidebar toggler" />
        </div>
      )}
    </div>
  );
};

export default Board;
