import React from "react";
import "../style/column.css";
import Task from "./Task";

const Column = ({
  columnId,
  columnName,
  dotColor,
  tasks,
  isSpaceCliced = false,
  isPopupOpen,
}) => {
  return (
    <div className="column">
      <div className="headingS column--header">
        <p className="dot" style={{ backgroundColor: dotColor }}></p>
        <p className="column--header--name">{columnName}</p>
        <p>
          {` (${tasks.reduce((acc, { subtasksDone, subtasksAll }) => {
            return subtasksDone === subtasksAll ? acc + 1 : acc;
          }, 0)})`}
        </p>
      </div>
      <div className="column--tasks">
        {tasks.map(({ id, taskName, subtasks }) => {
          return (
            <Task
              key={id}
              name={taskName}
              subtasks={subtasks}
              columnId={columnId}
              taskId={id}
              isSpaceCliced={isSpaceCliced}
              isPopupOpen={isPopupOpen}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Column;
