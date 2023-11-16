import React, { useContext, useState } from "react";
import ThemeContext from "../ThemeContext";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";
import "../style/newColumn.css";

const NewColumn = ({ handleAddColumn, setIsAddNewColumnShown }) => {
  const theme = useContext(ThemeContext);
  const [columnName, setColumnName] = useState("");

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
            onChangeValue={setColumnName}
            placeholder="e.g. In Progress"
          />
        </span>
        <CustomButton
          text="Add New Column"
          type="PrimaryS"
          onClick={() => handleAddColumn(columnName)}
        />
      </div>
    </div>
  );
};

export default NewColumn;
