import React, { useState, useContext, useEffect } from "react";
import "../style/newBoard.css";
import ThemeContext from "../ThemeContext";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";
import iconCross from "../assets/images/icon-cross.svg";
import { getId } from "../utils/generateId";

const NewBoard = ({ handleAddBoard, setIsAddNewBoardShown }) => {
  const TodoId = getId();
  const DoingId = getId();
  const [title, setTitle] = useState("");
  const [columns, setColumns] = useState([
    { columnName: "Todo", id: TodoId },
    { columnName: "Doing", id: DoingId },
  ]);

  const theme = useContext(ThemeContext);
  const [formValid, setFormValid] = useState({
    title: true,
    columns: {
      [TodoId]: true,
      [DoingId]: true,
    },
  });

  const handleChangeBoardName = (value) => {
    setFormValid({ ...formValid, title: value !== "" });
    setTitle(value);
  };

  const handleAddNewColumn = () => {
    const id = getId();
    const newColumns = [...columns, { columnName: "", id: id }];

    const newFormValid = { ...formValid };
    newFormValid.columns[id] = true;

    setFormValid(newFormValid);
    setColumns(newColumns);
  };

  const handleRemoveColumn = (index) => {
    const newColumns = [...columns];
    newColumns.splice(index, 1);

    const newFormValid = { ...formValid };
    delete newFormValid.columns[columns[index].id];

    setFormValid(newFormValid);
    setColumns(newColumns);
  };

  const handleChangeColumnName = (index, value) => {
    const newColumns = [...columns];
    newColumns[index].columnName = value;

    const newFormValid = { ...formValid };
    newFormValid.columns[columns[index].id] = value !== "";

    setFormValid(newFormValid);
    setColumns(newColumns);
  };

  const handleAddBoardValidated = () => {
    const newFormValid = { ...formValid };

    if (title === "") {
      newFormValid.title = false;
    }

    const invalidColumns = columns.filter((column) => column.columnName === "");
    invalidColumns.forEach((column) => {
      newFormValid.columns[column.id] = false;
    });

    setFormValid(newFormValid);

    if (title !== "" && invalidColumns.length === 0) {
      handleAddBoard(title, columns);
    }
  };

  return (
    <div className={`overlay`} onMouseDown={() => setIsAddNewBoardShown(false)}>
      <div
        className={`add-new-board add-new-board-${theme}`}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <p className={`headingL add-new-board--header-${theme}`}>
          Add new board
        </p>
        <div className="add-new-board-scrollable">
          <div className={`add-new-board--section`}>
            <p className={`bodyM new-task-form-label-${theme}`}>Name</p>
            <CustomInput
              placeholder={`e.g. Web Design`}
              value={title}
              onChangeValue={handleChangeBoardName}
              isValid={!formValid.title}
            />
          </div>
          <div className={`add-new-board--section`}>
            <p className={`bodyM new-task-form-label-${theme}`}>Columns</p>
            {columns.map((column, index) => {
              return (
                <div className={`new-board-form--columns-column`} key={index}>
                  <CustomInput
                    placeholder="e.g. Column Name"
                    value={column.columnName}
                    onChangeValue={(value) => {
                      handleChangeColumnName(index, value);
                    }}
                    isValid={!formValid.columns[column.id]}
                  />
                  <button
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onClick={() => handleRemoveColumn(index)}
                  >
                    <img src={iconCross} alt="icon cross" />
                  </button>
                </div>
              );
            })}
            <CustomButton
              text={`Add New Column`}
              onClick={handleAddNewColumn}
              plus
              type="Secondary"
            />
          </div>
        </div>
        <CustomButton
          text={`Create New Board`}
          type="PrimaryS"
          onClick={handleAddBoardValidated}
        />
      </div>
    </div>
  );
};

export default NewBoard;
