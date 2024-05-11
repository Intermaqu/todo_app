import React, { useContext, useEffect } from "react";
import CustomButton from "./CustomButton";
import ThemeContext from "../ThemeContext";
import "../style/deleteTask.css";

const DeleteTask = ({
  task,
  handleDeleteTask,
  setIsDeleteTaskShown,
  columnId,
  isMobile,
}) => {
  const theme = useContext(ThemeContext);

  const maxWidth = isMobile
    ? { maxWidth: "100%" }
    : { maxWidth: "48%", width: "200px" };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setIsDeleteTaskShown(false);
      return;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="overlay" onMouseDown={() => setIsDeleteTaskShown(false)}>
      <div
        className={`delete-task delete-task-${theme}`}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <p className="headingL font-red">Delete this task?</p>
        <p className="bodyL">
          {`Are you sure you want to delete the '${task.taskName}' task and its subtasks? This action cannot be reversed`}
        </p>
        <div
          className={
            isMobile ? `delete-task-buttons-mobile` : `delete-task-buttons`
          }
        >
          <CustomButton
            text="Delete"
            type="Destructive"
            onClick={() => {
              handleDeleteTask(task.id, columnId);
              setIsDeleteTaskShown(false);
            }}
            customStyles={maxWidth}
          />
          <CustomButton
            text="Cancel"
            type="Secondary"
            onClick={() => setIsDeleteTaskShown(false)}
            customStyles={maxWidth}
          />
        </div>
      </div>
    </div>
  );
};

export default DeleteTask;
