import React, { useContext } from "react";
import "../style/task.css";
import ThemeContext from "../ThemeContext";
import InspectTaskContext from "../InspectTaskContext";
import { TASK_TAB_INDEX } from "../utils/constants";

const Task = ({
  name,
  subtasks,
  columnId,
  taskId,
  isSpaceCliced = false,
  isPopupOpen,
}) => {
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
      tabIndex={isPopupOpen ? null : TASK_TAB_INDEX}
      style={{
        userSelect: isSpaceCliced ? "none" : "auto",
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter")
          handleInspectTask({
            taskId,
            columnId,
          });
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
