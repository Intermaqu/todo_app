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

  const handleClickEditTask = (e) => {
    e.stopPropagation();
    setIsEditTaskShown(true);
    setIsInspectTaskShown(false);
  };

  const handleClickDeleteTask = (e) => {
    e.stopPropagation();
    setIsDeleteTaskShown(true);
    setIsInspectTaskShown(false);
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
          <button
            className="hamburger"
            onMouseDown={(e) => {
              e.stopPropagation();
              setIsTaskMenuShown(!isTaskMenuShown);
            }}
            onKeyDown={(e) => {
              e.stopPropagation();
              e.key === "Enter" && setIsTaskMenuShown(!isTaskMenuShown);
            }}
          >
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </button>
        </div>
        {isTaskMenuShown && (
          <div className={`hamburger-menu hamburger-menu-${theme}`}>
            <button
              className="hamburger-menu-edit bodyL"
              onMouseDown={handleClickEditTask}
              onKeyDown={(e) => e.key === "Enter" && handleClickEditTask(e)}
            >
              Edit Task
            </button>
            <button
              className="hamburger-menu-delete bodyL"
              onMouseDown={handleClickDeleteTask}
              onKeyDown={(e) => {
                e.key === "Enter" && handleClickDeleteTask(e);
              }}
            >
              Delete Task
            </button>
          </div>
        )}
        <p className={`bodyL inspect-task-description-${theme}`}>
          {description}
        </p>
        <div className="inspect-task-section inspect-task-scrollable">
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
