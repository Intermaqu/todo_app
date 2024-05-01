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
  const [formValid, setFormValid] = useState({
    title: true,
    columns: board.columns.reduce((acc, column) => {
      acc[column.id] = true;
      return acc;
    }, {}),
  });

  const theme = useContext(ThemeContext);

  const handleChangeBoardName = (value) => {
    setFormValid({ ...formValid, title: value !== "" });
    setTitle(value);
  };

  const handleAddColumn = () => {
    const id = getId();
    const newColumns = [
      ...columns,
      {
        columnName: "",
        id: id,
        tasks: [],
      },
    ];
    setColumns(newColumns);
    setFormValid({
      ...formValid,
      columns: {
        ...formValid.columns,
        [id]: true,
      },
    });
  };

  const handleRemoveColumn = (id) => {
    const newColumns = columns.filter((column) => column.id !== id);
    const newFormValid = { ...formValid };
    delete newFormValid.columns[id];
    setFormValid(newFormValid);
    setColumns(newColumns);
  };

  const handleChangeColumnName = (id, value) => {
    const newColumns = columns.map((column) => {
      if (column.id !== id) return column;

      const newFormValid = { ...formValid };
      newFormValid.columns[id] = value !== "";
      setFormValid(newFormValid);

      return {
        ...column,
        columnName: value,
      };
    });
    setColumns(newColumns);
  };

  const handleEditBoardValidated = () => {
    const newFormValid = { ...formValid };
    newFormValid.title = title !== "";

    const columnsInvalid = columns.filter((column) => column.columnName === "");

    columnsInvalid.forEach((column) => {
      newFormValid.columns[column.id] = false;
    });

    setFormValid(newFormValid);

    if (newFormValid.title && columnsInvalid.length === 0) {
      handleEditBoard(title, columns);
      return;
    }
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
              onChangeValue={handleChangeBoardName}
              placeholder="Board Name"
              isValid={!formValid.title}
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
                  isValid={!formValid.columns[column.id]}
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
          onClick={handleEditBoardValidated}
          type="PrimaryS"
        />
      </div>
    </div>
  );
};

export default EditBoardForm;
