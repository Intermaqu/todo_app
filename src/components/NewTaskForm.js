import React, { useEffect, useState, useContext } from "react";
import CustomInput from "./CustomInput";
import iconCross from "../assets/images/icon-cross.svg";
import CustomButton from "./CustomButton";
import CustomDropdown from "./CustomDropdown";
import ThemeContext from "../ThemeContext";
import "../style/newTaskForm.css";
import { getId } from "../utils/generateId";

const NewTaskForm = ({
    columns,
    handleAddTask,
    setIsAddNewTaskShown,
    isMobile,
}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState({});
    const [subtasks, setSubtasks] = useState([
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
    ]);

    const theme = useContext(ThemeContext);

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
    };

    const handleRemoveSubtask = (id) => {
        const newSubtasks = subtasks.filter((subtask) => subtask.id !== id);
        setSubtasks(newSubtasks);
    };

    useEffect(() => {
        setStatus(columns[0]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            className="overlay"
            onMouseDown={() => setIsAddNewTaskShown(false)}
        >
            <div
                className={`new-task-form new-task-form-${theme} ${
                    isMobile && "new-task-form--mobile"
                }`}
                onMouseDown={(e) => {
                    e.stopPropagation();
                }}
            >
                <p className={`headingL new-task-form-heading-${theme}`}>
                    Add New Task
                </p>
                <div className="add-new-board-scrollable">
                    <div className="new-task-form-section">
                        <p className={`bodyM new-task-form-label-${theme}`}>
                            Title
                        </p>
                        <CustomInput
                            type="text"
                            value={title}
                            onChangeValue={setTitle}
                            placeholder="e.g. Take coffee break"
                        />
                    </div>
                    <div className="new-task-form-section">
                        <p className={`bodyM new-task-form-label-${theme}`}>
                            Description
                        </p>
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
                        <p className={`bodyM new-task-form-label-${theme}`}>
                            Subtasks
                        </p>
                        {subtasks.map(({ id, subtaskName, placeholder }) => (
                            <div
                                key={id}
                                className="new-task-form--subtasks-subtask"
                            >
                                <CustomInput
                                    placeholder={placeholder}
                                    value={subtaskName}
                                    onChangeValue={(value) =>
                                        handleChangeSubtasks(id, value)
                                    }
                                    customStyles={{
                                        marginBottom: "4px",
                                    }}
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
                                        id: getId(),
                                        subtaskName: "",
                                        placeholder: "e.g. Let's smile",
                                        status: false,
                                    },
                                ])
                            }
                        />
                    </div>
                    <div className="new-task-form-section">
                        <p className={`bodyM new-task-form-label-${theme}`}>
                            Status
                        </p>
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
                    onClick={() =>
                        handleAddTask({
                            taskName: title,
                            description,
                            column: status,
                            subtasks,
                        })
                    }
                />
            </div>
        </div>
    );
};

export default NewTaskForm;
