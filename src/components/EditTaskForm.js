import React, { useState, useContext, useEffect } from "react";
import ThemeContext from "../ThemeContext";
import CustomButton from "./CustomButton";
import CustomInput from "./CustomInput";
import iconCross from "../assets/images/icon-cross.svg";
import CustomDropdown from "./CustomDropdown";

const EditTaskForm = ({
  task,
  columns,
  setIsEditTaskShown,
  columnName,
  columnId,
  handleEditTask,
}) => {
  const [title, setTitle] = useState(task.taskName);
  const [description, setDescription] = useState(task.taskDescription || "");
  const [currentColumn, setCurrentColumn] = useState({
    columnName,
    id: columnId,
  });
  const [subtasks, setSubtasks] = useState(task.subtasks);
  const [formValid, setFormValid] = useState({
    title: true,
    subtasks: task.subtasks.reduce((acc, subtask) => {
      acc[subtask.id] = true;
      return acc;
    }, {}),
  });

  const theme = useContext(ThemeContext);

  const handleChangeTitle = (value) => {
    setFormValid({ ...formValid, title: value !== "" });
    setTitle(value);
  };

  const handleChangeSubtasks = (id, value) => {
    const newSubtasks = subtasks.map((subtask) => {
      if (subtask.id === id) {
        return {
          ...subtask,
          subtaskName: value,
        };
      }
      return subtask;
    });
    const newFormValid = { ...formValid };
    newFormValid.subtasks[id] = value !== "";
    setFormValid(newFormValid);
    setSubtasks(newSubtasks);
  };

  const handleRemoveSubtask = (id) => {
    const newSubtasks = subtasks.filter((subtask) => subtask.id !== id);
    const newFormValid = { ...formValid };
    delete newFormValid.subtasks[id];
    setFormValid(newFormValid);
    setSubtasks(newSubtasks);
  };

  const handleEditTaskValidate = () => {
    const newFormValid = { ...formValid };
    newFormValid.title = title !== "";

    const subtasksInvalid = subtasks.filter(
      (subtask) => subtask.subtaskName === ""
    );

    for (let subtask of subtasksInvalid) {
      newFormValid.subtasks[subtask.id] = false;
    }
    console.log("subtasks", subtasks);
    console.log("subtasksInvalid", subtasksInvalid);

    setFormValid(newFormValid);

    if (subtasksInvalid.length === 0 && title !== "") {
      handleEditTask(
        title,
        description,
        subtasks,
        {
          columnName: currentColumn.columnName,
          columnId: currentColumn.id,
        },
        columnId,
        task.id
      );
      setIsEditTaskShown(false);
      return;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleEditTaskValidate();
      return;
    }
    if (e.key === "Escape") {
      setIsEditTaskShown(false);
      return;
    }
  };

  return (
    <div
      className="overlay"
      onMouseDown={() => setIsEditTaskShown(false)}
      onKeyDown={handleKeyDown}
    >
      <div
        className={`new-task-form new-task-form-${theme}`}
        onMouseDown={(e) => {
          e.stopPropagation();
        }}
      >
        <p className={`headingL new-task-form-heading-${theme}`}>Edit Task</p>
        <div className="new-task-form-scrollable">
          <div className="new-task-form-section">
            <p className={`bodyM new-task-form-label-${theme}`}>Title</p>
            <CustomInput
              type="text"
              value={title}
              onChangeValue={handleChangeTitle}
              placeholder="e.g. Take coffee break"
              isValid={!formValid.title}
            />
          </div>
          <div className="new-task-form-section">
            <p className={`bodyM new-task-form-label-${theme}`}>Description</p>
            <CustomInput
              type="textarea"
              value={description}
              onChangeValue={setDescription}
              placeholder="e.g. It's always good to take a break. This 15 minute break will 
                    recharge the batteries a little."
              customStyles={{
                height: "100px",
                padding: "8px 16px",
                width: "100%",
              }}
            />
          </div>
          <div className="new-task-form-section">
            <p className={`bodyM new-task-form-label-${theme}`}>Subtasks</p>
            {subtasks.map(({ id, subtaskName }) => (
              <div key={id} className="new-task-form--subtasks-subtask">
                <CustomInput
                  placeholder={"e.g. Let's smile"}
                  value={subtaskName}
                  onChangeValue={(value) => handleChangeSubtasks(id, value)}
                  customStyles={{
                    marginBottom: "4px",
                  }}
                  isValid={!formValid.subtasks[id]}
                />
                <img
                  src={iconCross}
                  alt="icon cross"
                  onClick={() => handleRemoveSubtask(id)}
                />
              </div>
            ))}
            <CustomButton
              text="Add New Subtask"
              type="Secondary"
              plus
              onClick={() =>
                setSubtasks([
                  ...subtasks,
                  {
                    id: subtasks.length === 0 ? 1 : subtasks.at(-1).id + 1,
                    subtaskName: "",
                    placeholder: "e.g. Let's smile",
                    status: false,
                  },
                ])
              }
            />
          </div>
          <div className="new-task-form-section">
            <p className={`bodyM new-task-form-label-${theme}`}>Status</p>
            <CustomDropdown
              options={columns}
              value={currentColumn}
              setValue={setCurrentColumn}
            />
          </div>
        </div>
        <CustomButton
          text="Edit Task"
          type="PrimaryS"
          onClick={handleEditTaskValidate}
        />
      </div>
    </div>
  );
};

export default EditTaskForm;
