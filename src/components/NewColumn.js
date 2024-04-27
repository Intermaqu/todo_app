import React, { useContext, useEffect, useState } from "react";
import ThemeContext from "../ThemeContext";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";
import "../style/newColumn.css";

const NewColumn = ({ handleAddColumn, setIsAddNewColumnShown }) => {
  const theme = useContext(ThemeContext);
  const [columnName, setColumnName] = useState("");
  const [columnNameValid, setColumnNameValid] = useState(true);

  const handleAddColumnValidated = () => {
    if (columnName === "") {
      setColumnNameValid(false);
      return;
    }
    handleAddColumn(columnName);
  };

  const handleChangeColumnName = (value) => {
    setColumnNameValid(value !== "");
    setColumnName(value);
  };

  const handleKeyboardClick = (e) => {
    if (e.key === "Enter") {
      handleAddColumnValidated();
    }
    if (e.key === "Escape") {
      setIsAddNewColumnShown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboardClick);
    return () => {
      document.removeEventListener("keydown", handleKeyboardClick);
    };
  }, []);

  return (
    <div className="overlay" onMouseDown={() => setIsAddNewColumnShown(false)}>
      <div
        className={`new-column new-column-${theme}`}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <p className={`headingL new-column-heading-${theme}`}>Add new column</p>
        <span>
          <p className={`bodyM new-column-section-title-${theme}`}>Name</p>
          <CustomInput
            type="text"
            value={columnName}
            onChangeValue={handleChangeColumnName}
            placeholder="e.g. In Progress"
            isValid={!columnNameValid}
          />
        </span>
        <CustomButton
          text="Add New Column"
          type="PrimaryS"
          onClick={() => handleAddColumnValidated(columnName)}
        />
      </div>
    </div>
  );
};

export default NewColumn;
