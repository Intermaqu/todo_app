import React, { useState, useContext, useEffect } from "react";
import "../style/newBoard.css";
import ThemeContext from "../ThemeContext";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";
import iconCross from "../assets/images/icon-cross.svg";

const NewBoard = ({ handleAddBoard, setIsAddNewBoardShown }) => {
    const [title, setTitle] = useState("");
    const [columns, setColumns] = useState(["Todo", "Doing"]);

    const theme = useContext(ThemeContext);

    const handleRemoveSubtask = (index) => {
        const newColumns = [...columns];
        newColumns.splice(index, 1);
        setColumns(newColumns);
    };

    return (
        <div
            className={`overlay`}
            onMouseDown={() => setIsAddNewBoardShown(false)}
        >
            <div
                className={`add-new-board add-new-board-${theme}`}
                onMouseDown={(e) => e.stopPropagation()}
            >
                <p className={`headingL add-new-board--header-${theme}`}>
                    Add new board
                </p>
                <div className="add-new-board-scrollable">
                    <div className={`add-new-board--section`}>
                        <p className={`bodyM new-task-form-label-${theme}`}>
                            Name
                        </p>
                        <CustomInput
                            placeholder={`e.g. Web Design`}
                            value={title}
                            onChangeValue={setTitle}
                        />
                    </div>
                    <div className={`add-new-board--section`}>
                        <p className={`bodyM new-task-form-label-${theme}`}>
                            Columns
                        </p>
                        {columns.map((column, index) => {
                            return (
                                <div
                                    className={`new-board-form--columns-column`}
                                    key={index}
                                >
                                    <CustomInput
                                        placeholder="e.g. Column Name"
                                        value={column}
                                        onChangeValue={(value) => {
                                            const newColumns = [...columns];
                                            newColumns[index] = value;
                                            setColumns(newColumns);
                                        }}
                                    />
                                    <img
                                        src={iconCross}
                                        alt="icon cross"
                                        onClick={() =>
                                            handleRemoveSubtask(index)
                                        }
                                    />
                                </div>
                            );
                        })}
                        <CustomButton
                            text={`Add New Column`}
                            onClick={() => {
                                setColumns([...columns, ""]);
                            }}
                            plus
                            type="Secondary"
                        />
                    </div>
                </div>
                <CustomButton
                    text={`Create New Board`}
                    type="PrimaryS"
                    onClick={() => {
                        handleAddBoard(title, columns);
                    }}
                />
            </div>
        </div>
    );
};

export default NewBoard;
