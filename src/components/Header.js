import React, { useContext, useEffect, useState } from "react";
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
  windowWidth,
}) => {
  const theme = useContext(ThemeContext);
  const [isMenuShown, setIsMenuShown] = useState(false);

  const logo = theme === "light" ? logoDark : logoLight;

  const handleMenuClick = () => {
    setIsMenuShown(false);
  };

  useEffect(() => {
    console.log(windowWidth);
  }, [windowWidth]);

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
          text={windowWidth < 700 ? "" : "Add new task"}
          onClick={addNewTask}
          plus={true}
          customStyles={{
            opacity: isBoardEmpty ? "0.25" : "1",
            pointerEvents: isBoardEmpty ? "none" : "auto",
            userSelect: "none",
          }}
          width={windowWidth < 700 ? "75px" : "165px"}
        />
        <button className="hamburger" onClick={() => setIsMenuShown(true)}>
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
//   return (
//     <div
//       className={`header header-${theme} ${
//         !isSidebarOpen ? "header-sidebar-closed" : ""
//       }`}
//     >
//       {!isSidebarOpen && (
//         <div className={`header__logo header__logo-${theme}`}>
//           <img src={logo} alt="logo" />
//         </div>
//       )}
//       <div className="header__title-wrapper">
//         <p
//           className={`header__title-${theme} headingXL ${
//             !isSidebarOpen &&
//             `header__title-border header__title-collapsed-${theme}`
//           }`}
//         >
//           {boardName}
//         </p>
//       </div>
//       <div
//         className="header__buttons-wrapper"
//         style={{
//           width: windowWidth < 700 ? "auto" : "200px",
//         }}
//       >
//         <CustomButton
//           type="PrimaryL"
//           text={windowWidth > 700 ? "Add new task" : ""}
//           onClick={addNewTask}
//           plus={true}
//           width={windowWidth > 700 ? "165px" : "70px"}
//           customStyles={{
//             opacity: isBoardEmpty ? "0.25" : "1",
//             pointerEvents: isBoardEmpty ? "none" : "auto",
//             userSelect: "none",
//           }}
//         />
//         <button className="hamburger" onClick={() => setIsMenuShown(true)}>
//           <div className="dot"></div>
//           <div className="dot"></div>
//           <div className="dot"></div>
//           {isMenuShown && (
//             <div
//               className="hamburger-menu-overlay"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleMenuClick();
//               }}
//             ></div>
//           )}
//         </button>
//         {isMenuShown && (
//           <div className={`hamburger-menu hamburger-menu-${theme}`}>
//             <button
//               className="hamburger-menu-edit bodyL"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setIsEditBoardShown(true);
//                 setIsMenuShown(false);
//               }}
//             >
//               Edit Board
//             </button>
//             <button
//               className="hamburger-menu-delete bodyL"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setIsDeleteBoardShown(true);
//                 setIsMenuShown(false);
//               }}
//             >
//               Delete Board
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

export default Header;
