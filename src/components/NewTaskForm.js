import React, { useEffect, useState, useContext } from "react";
import CustomInput from "./CustomInput";
import iconCross from "../assets/images/icon-cross.svg";
import CustomButton from "./CustomButton";
import CustomDropdown from "./CustomDropdown";
import ThemeContext from "../ThemeContext";
import "../style/newTaskForm.css";
import { getId } from "../utils/generateId";

const NewTaskForm = ({ columns, handleAddTask, setIsAddNewTaskShown }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState({});
  const [subtasks, setSubtasks] = useState();
  const [formValid, setFormValid] = useState({
    title: true,
    subtasks: {},
  });

  const theme = useContext(ThemeContext);

  const handleChangeTitle = (value) => {
    if (value === "") setFormValid({ ...formValid, title: false });

    setTitle(value);
  };

  const initialSubtasks = () => {
    return [
      {
        id: getId(),
        subtaskName: "",
        placeholder: "e.g. Make coffee",
        status: false,
      },
      {
        id: getId(),
        subtaskName: "",
        placeholder: "e.g. Drink coffee & smile",
        status: false,
      },
    ];
  };

  const handleAddNewSubtask = () => {
    const newId = getId();
    setSubtasks([
      ...subtasks,
      {
        id: newId,
        subtaskName: "",
        placeholder: "e.g. Let's smile",
        status: false,
      },
    ]);
    setFormValid({
      ...formValid,
      subtasks: {
        ...formValid.subtasks,
        [newId]: true,
      },
    });
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
    setSubtasks(newSubtasks);
    const newValidateFormError = {
      ...formValid,
      subtasks: { ...formValid.subtasks, [id]: value !== "" },
    };
    setFormValid(newValidateFormError);
  };

  const handleRemoveSubtask = (id) => {
    const newSubtasks = subtasks.filter((subtask) => subtask.id !== id);
    const newValidateFormError = { ...formValid };
    delete newValidateFormError.subtasks[id];
    setFormValid(newValidateFormError);
    setSubtasks(newSubtasks);
  };

  const handleFinalizeAddTask = () => {
    const newFormValid = { ...formValid };
    if (title === "") {
      newFormValid.title = false;
    }

    const subtasksInvalid = subtasks.filter(
      (subtask) => subtask.subtaskName === ""
    );

    console.log("subtasksInvalid:", subtasksInvalid);

    for (let subtask of subtasksInvalid) {
      newFormValid.subtasks[subtask.id] = false;
    }

    setFormValid(newFormValid);

    if (subtasksInvalid.length === 0 && title !== "") {
      handleAddTask({
        taskName: title,
        description,
        column: status,
        subtasks,
      });
    }
  };

  useEffect(() => {
    setStatus(columns[0]);
    const initialSubtasksValue = initialSubtasks();
    const initialErrorSubtasks = initialSubtasksValue.reduce(
      (acc, subtask) => ({ ...acc, [subtask.id]: true }),
      {}
    );
    setSubtasks(initialSubtasksValue);
    setFormValid({
      title: true,
      subtasks: initialErrorSubtasks,
    });
  }, []);

  // useEffect(() => {
  //   // console.log("title:", title);
  //   // console.log("subtasks:", subtasks);
  //   // console.log("status:", status);
  //   console.log("formValid:", formValid);
  // }, [formValid, subtasks, status, title]);

  return (
    <div className="overlay" onMouseDown={() => setIsAddNewTaskShown(false)}>
      <div
        className={`new-task-form new-task-form-${theme}`}
        onMouseDown={(e) => {
          e.stopPropagation();
        }}
      >
        <p className={`headingL new-task-form-heading-${theme}`}>
          Add New Task
        </p>
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
            {subtasks &&
              subtasks.map(({ id, subtaskName, placeholder }) => (
                <div key={id} className="new-task-form--subtasks-subtask">
                  <CustomInput
                    placeholder={placeholder}
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
              onClick={() => handleAddNewSubtask()}
            />
          </div>
          <div className="new-task-form-section">
            <p className={`bodyM new-task-form-label-${theme}`}>Status</p>
            <CustomDropdown
              options={columns}
              value={status}
              setValue={setStatus}
            />
          </div>
        </div>
        <CustomButton
          text="Create Task"
          type="PrimaryS"
          onClick={() => handleFinalizeAddTask()}
        />
      </div>
    </div>
  );
};

export default NewTaskForm;
