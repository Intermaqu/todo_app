import React from "react";
import "../style/column.css";
import Task from "./Task";

const Column = ({
  columnId,
  columnName,
  dotColor,
  tasks,
  isSpaceCliced = false,
}) => {
  return (
    <div className="column">
      <div className="headingS column--name">
        <p className="dot" style={{ backgroundColor: dotColor }}></p>
        <p>
          {columnName}
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
              columnName={columnName}
              taskId={id}
              isSpaceCliced={isSpaceCliced}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Column;
