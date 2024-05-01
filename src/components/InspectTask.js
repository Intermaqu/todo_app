import React, { useContext, useEffect, useState } from "react";
import ThemeContext from "../ThemeContext";
import CustomCheckbox from "./CustomCheckbox";
import CustomDropdown from "./CustomDropdown";
import "../style/inspectTask.css";

const InspectTask = ({
  task: { taskName, description, subtasks, id },
  columns,
  status,
  setIsInspectTaskShown,
  handleEditTask,
  setIsDeleteTaskShown,
  setIsEditTaskShown,
}) => {
  const theme = useContext(ThemeContext);
  const [currentSubtasks, setCurrentSubtasks] = useState(subtasks);
  const [currentStatus, setCurrentStatus] = useState(status);
  const [isTaskMenuShown, setIsTaskMenuShown] = useState(false);

  const handleChangeTask = (payload) => {
    if (payload.id) {
      handleEditTask(
        taskName,
        description,
        currentSubtasks,
        {
          columnId: payload.id,
          columnName: payload.columnName,
        },
        currentStatus.columnId,
        id
      );

      setCurrentStatus({
        columnId: payload.id,
        columnName: payload.columnName,
      });
      return;
    }

    // payload = subtaskId
    if (typeof payload === "string") {
      const newSubtasks = currentSubtasks.map((subtask) => {
        if (subtask.id === payload) {
          return {
            ...subtask,
            status: !subtask.status,
          };
        }
        return subtask;
      });

      handleEditTask(
        taskName,
        description,
        newSubtasks,
        {
          columnId: currentStatus.columnId,
          columnName: currentStatus.columnName,
        },
        currentStatus.columnId,
        id
      );
      setCurrentSubtasks(newSubtasks);
      return;
    }
  };

  const handleCloseModal = (e) => {
    if (e.key === "Escape") {
      setIsInspectTaskShown(false);
      setIsTaskMenuShown(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleCloseModal);
    return () => {
      window.removeEventListener("keydown", handleCloseModal);
    };
  }, []);

  return (
    <div
      className="overlay"
      onMouseDown={() => {
        setIsInspectTaskShown(false);
      }}
    >
      <div
        className={`inspect-task inspect-task-${theme}`}
        onMouseDown={(e) => {
          e.stopPropagation();
          setIsTaskMenuShown(false);
        }}
      >
        <div className="inspect-task-header">
          <p className={`headingL inspect-task-heading-${theme}`}>{taskName}</p>
          <div
            className="hamburger"
            onClick={() => {
              setIsTaskMenuShown(true);
            }}
          >
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            {isTaskMenuShown && (
              <div
                className={`task-menu task-menu-${theme}`}
                onMouseDown={(e) => {
                  e.stopPropagation();
                }}
              >
                <span
                  className="task-menu-edit bodyL"
                  onClick={() => {
                    setIsEditTaskShown(true);
                    setIsInspectTaskShown(false);
                  }}
                >
                  Edit Task
                </span>
                <span
                  className="task-menu-delete bodyL"
                  onClick={() => {
                    setIsDeleteTaskShown(true);
                    setIsInspectTaskShown(false);
                  }}
                >
                  Delete Task
                </span>
              </div>
            )}
          </div>
        </div>
        <p className={`bodyL inspect-task-description-${theme}`}>
          {description}
        </p>
        <div className="inspect-task-section">
          <p className={`bodyM inspect-task-form-label-${theme}`}>{`Subtasks (${
            currentSubtasks.filter((subtask) => subtask.status).length
          } of ${currentSubtasks.length})`}</p>
          {currentSubtasks.map(({ id, subtaskName, status }) => {
            return (
              <CustomCheckbox
                key={id}
                text={subtaskName}
                checked={status}
                onClickCheck={handleChangeTask}
                additionalParam={id}
              />
            );
          })}
        </div>
        <div className="inspect-task-section">
          <p className={`bodyM inspect-task-form-label-${theme}`}>
            Current Status
          </p>
          <CustomDropdown
            options={columns}
            value={currentStatus}
            setValue={handleChangeTask}
          />
        </div>
      </div>
    </div>
  );
};

export default InspectTask;
