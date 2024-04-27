import React, { useContext, useState } from "react";
import CustomButton from "./CustomButton";
import ThemeContext from "../ThemeContext";
import CustomInput from "./CustomInput";
import { getId } from "../utils/generateId.js";
import "../style/editBoard.css";
import iconCross from "../assets/images/icon-cross.svg";

const EditBoardForm = ({ board, handleEditBoard, setIsEditBoardShown }) => {
  const [title, setTitle] = useState(board.boardName);
  const [columns, setColumns] = useState(board.columns);

  const theme = useContext(ThemeContext);

  const handleAddColumn = () => {
    const newColumns = [
      ...columns,
      {
        columnName: "",
        id: getId(),
        tasks: [],
      },
    ];
    setColumns(newColumns);
  };

  const handleRemoveColumn = (id) => {
    const newColumns = columns.filter((column) => column.id !== id);
    setColumns(newColumns);
  };

  const handleChangeColumnName = (id, value) => {
    const newColumns = columns.map((column) => {
      if (column.id !== id) return column;

      return {
        ...column,
        columnName: value,
      };
    });
    setColumns(newColumns);
  };

  return (
    <div className="overlay" onMouseDown={() => setIsEditBoardShown(false)}>
      <div
        className={`edit-board edit-board-${theme}`}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="edit-board-scrollable">
          <p className={`headingL edit-board-heading-${theme}`}>Edit Board</p>
          <div className="edit-board-section">
            <p className={`bodyM edit-board-section-title-${theme}`}>
              Board Name
            </p>
            <CustomInput
              value={title}
              onChangeValue={setTitle}
              placeholder="Board Name"
            />
          </div>
          <div className="edit-board-section">
            <p className={`bodyM edit-board-section-title-${theme}`}>
              Board columns
            </p>
            {columns.map((column) => (
              <div className="edit-board-column" key={column.id}>
                <CustomInput
                  value={column.columnName}
                  onChangeValue={(value) =>
                    handleChangeColumnName(column.id, value)
                  }
                  placeholder="Column Name"
                />
                <button
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={() => handleRemoveColumn(column.id)}
                >
                  <img src={iconCross} alt="icon cross" />
                </button>
              </div>
            ))}
            <CustomButton
              text="Add New Column"
              onClick={() => handleAddColumn()}
              type="Secondary"
              plus
            />
          </div>
        </div>
        <CustomButton
          text="Save Changes"
          onClick={() => handleEditBoard(title, columns)}
          type="PrimaryS"
        />
      </div>
    </div>
  );
};

export default EditBoardForm;
