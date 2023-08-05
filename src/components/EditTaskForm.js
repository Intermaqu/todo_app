import React, { useState, useContext } from "react";
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
    isMobile,
}) => {
    const [title, setTitle] = useState(task.taskName);
    const [description, setDescription] = useState(task.taskDescription || "");
    const [status, setStatus] = useState({
        columnName,
        id: columnId,
    });
    const [subtasks, setSubtasks] = useState(task.subtasks);

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

    // useEffect(() => {
    //     console.log(subtasks);
    //     console.log(getId());
    // }, [subtasks]);

    return (
        <div className="overlay" onMouseDown={() => setIsEditTaskShown(false)}>
            <div
                className={`new-task-form new-task-form-${theme} ${
                    isMobile && "new-task-form--mobile"
                }`}
                onMouseDown={(e) => {
                    e.stopPropagation();
                }}
            >
                <p className={`headingL new-task-form-heading-${theme}`}>
                    Edit Task
                </p>
                <div className="new-task-form-scrollable">
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
                        {subtasks.map(({ id, subtaskName }) => (
                            <div
                                key={id}
                                className="new-task-form--subtasks-subtask"
                            >
                                <CustomInput
                                    placeholder={"e.g. Let's smile"}
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
                                        id:
                                            subtasks.length === 0
                                                ? 1
                                                : subtasks.at(-1).id + 1,
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
                    text="Edit Task"
                    type="PrimaryS"
                    onClick={() => {
                        handleEditTask(
                            title,
                            description,
                            subtasks,
                            {
                                columnName: status.columnName,
                                columnId: status.id,
                            },
                            columnId,
                            task.id,
                        );
                        setIsEditTaskShown(false);
                    }}
                />
            </div>
        </div>
    );
};

export default EditTaskForm;
