import React, { useContext } from "react";
import "../style/task.css";
import ThemeContext from "../ThemeContext";
import InspectTaskContext from "../InspectTaskContext";

const Task = ({ name, subtasks, columnId, taskId, isSpaceCliced = false }) => {
  const theme = useContext(ThemeContext);
  const handleInspectTask = useContext(InspectTaskContext);

  return (
    <div
      className={`task task-${theme}`}
      onClick={() => {
        handleInspectTask({
          taskId,
          columnId,
        });
      }}
      style={{
        userSelect: isSpaceCliced ? "none" : "auto",
      }}
    >
      <p className={`headingM task--title-${theme}`}>{name}</p>
      <p className="bodyM task--subtasks">
        {`${subtasks.filter(({ status }) => status).length} of
                ${subtasks.length} subtasks`}
      </p>
    </div>
  );
};

export default Task;
