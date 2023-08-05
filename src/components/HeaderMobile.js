import React, { useContext, useState } from "react";
import "../style/headerMobile.css";
import arrowDown from "../assets/images/icon-chevron-down.svg";
import arrowUp from "../assets/images/icon-chevron-up.svg";
import mobileLogo from "../assets/images/logo-mobile.svg";
import ThemeContext from "../ThemeContext";
import CustomButton from "./CustomButton";

const Header = ({
    boardName,
    isBoardEmpty,
    setIsAddNewTaskShown,
    setIsEditBoardShown,
    setIsDeleteBoardShown,
    setIsDeleteTaskShown,
    isMobileSelectBoardShown,
    setIsMobileSelectBoardShown,
    setIsEditTaskShown,
}) => {
    const theme = useContext(ThemeContext);
    const [isMenuShown, setIsMenuShown] = useState(false);

    const handleMenuClick = () => {
        setIsMenuShown(false);
        console.log("menu clicked");
    };

    return (
        <div
            className={`mobile-header mobile-header-${theme}`}
            onMouseDown={() => {
                isMobileSelectBoardShown && setIsMobileSelectBoardShown(false);
                setIsAddNewTaskShown(false);
                setIsEditTaskShown(false);
                setIsEditBoardShown(false);
                setIsDeleteTaskShown(false);
                setIsDeleteBoardShown(false);
            }}
        >
            <img src={mobileLogo} alt="logo" className="mobile-logo" />
            <div
                className={`mobile-header-title-${theme} headingXL mobile-header-title`}
                onMouseDown={() =>
                    setIsMobileSelectBoardShown(!isMobileSelectBoardShown)
                }
            >
                {boardName}
                <img
                    src={isMenuShown ? arrowUp : arrowDown}
                    alt="arrow"
                    className="arrow"
                />
            </div>
            <div className="mobile-header-buttons">
                <CustomButton
                    type="PrimaryL"
                    text=""
                    onClick={() => setIsAddNewTaskShown(true)}
                    plus={true}
                    width="48px"
                    customStyles={{
                        opacity: isBoardEmpty ? "0.25" : "1",
                        pointerEvents: isBoardEmpty ? "none" : "auto",
                        userSelect: "none",
                        height: "32px",
                        lineHeight: "32px",
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
                        <div
                            className={`hamburger-menu hamburger-menu-${theme} hamburger-menu-mobile`}
                        >
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
        </div>
    );
};

export default Header;
