import React, { useContext, useState } from "react";
import CustomButton from "./CustomButton";
import ThemeContext from "../ThemeContext";
import "../style/deleteBoard.css";

const DeleteBoard = ({
    board,
    handleDeleteBoard,
    setIsDeleteBoardShown,
    numberOfBoards,
    isMobile,
}) => {
    const theme = useContext(ThemeContext);
    const [hasBeenClicked, setHasBeenClicked] = useState(false);

    const handleDeleteBoardClick = () => {
        setHasBeenClicked(true);
        if (numberOfBoards > 1) {
            handleDeleteBoard(board.id);
        }
    };

    const maxWidth = isMobile
        ? { maxWidth: "100%" }
        : { maxWidth: "48%", width: "200px" };

    return (
        <div
            className="overlay"
            onMouseDown={() => setIsDeleteBoardShown(false)}
        >
            <div
                className={`delete-board delete-board-${theme}`}
                onMouseDown={(e) => e.stopPropagation()}
            >
                <p className="headingL font-red">Delete this board?</p>
                <p className="bodyL">
                    {`Are you sure you want to delete the '${board.boardName}' board?
                    This action will remove all columns and tasks and cannot be
                    reversed.`}
                </p>
                {numberOfBoards === 1 && hasBeenClicked && (
                    <p className="bodyL font-red">
                        {`You can't delete the last board. Add a new board first.`}
                    </p>
                )}
                <div
                    className={
                        isMobile
                            ? `delete-board-buttons-mobile`
                            : `delete-board-buttons`
                    }
                >
                    <CustomButton
                        text="Delete"
                        type="Destructive"
                        onClick={() => {
                            handleDeleteBoardClick(board.id);
                        }}
                        customStyles={maxWidth}
                    />
                    <CustomButton
                        text="Cancel"
                        type="Secondary"
                        onClick={() => setIsDeleteBoardShown(false)}
                        customStyles={maxWidth}
                    />
                </div>
            </div>
        </div>
    );
};

export default DeleteBoard;
