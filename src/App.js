import "./App.css";
import ThemeContext from "./ThemeContext";
import InspectTaskContext from "./InspectTaskContext";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import CustomButton from "./components/CustomButton";
import CustomCheckbox from "./components/CustomCheckbox";
import CustomInput from "./components/CustomInput";
import CustomDropdown from "./components/CustomDropdown";
import Task from "./components/Task";
import Column from "./components/Column";
import Board from "./components/Board";
import initialState from "./data.json";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import HeaderMobile from "./components/HeaderMobile";
import NewTaskForm from "./components/NewTaskForm";
import NewBoard from "./components/NewBoard";
import EditTaskForm from "./components/EditTaskForm";
import EditBoardForm from "./components/EditBoardForm";
import DeleteBoard from "./components/DeleteBoard";
import DeleteTask from "./components/DeleteTask";
import colorPalette from "./utils/colorPalette";

import { getId } from "./utils/generateId";
import InspectTask from "./components/InspectTask";
import NewColumn from "./components/NewColumn";
import MobileSelectBoard from "./components/MobileSelectBoard";

// INSPECT THAT IN GOOGLE

function App() {
    const [theme, setTheme] = useState(null);
    const [state, setState] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const [windowWidth, setWindowWidth] = useState(null);

    const [isAddNewTaskShown, setIsAddNewTaskShown] = useState(false);
    const [isAddNewBoardShown, setIsAddNewBoardShown] = useState(false);
    const [isAddNewColumnShown, setIsAddNewColumnShown] = useState(false);
    const [isEditTaskShown, setIsEditTaskShown] = useState(false);
    const [isEditBoardShown, setIsEditBoardShown] = useState(false);
    const [isDeleteBoardShown, setIsDeleteBoardShown] = useState(false);
    const [isDeleteTaskShown, setIsDeleteTaskShown] = useState(false);
    const [isInspectTaskShown, setIsInspectTaskShown] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobileSelectBoardShown, setIsMobileSelectBoardShown] =
        useState(false);

    const [selectedBoard, setSelectedBoard] = useState(null);
    const [inspectedTask, setInspectedTask] = useState(null);

    const ref = useRef(null);

    // inspected task = { taskId, columnId }

    // FORM VALIDATION
    // Confirm form with enter key
    // Inspect Task description theme based color
    // SAVE THEME TO LOCAL STORAGE

    // 480px BREAKPOINT MOBILE

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    const handleSelectBoard = (id) => {
        setSelectedBoard(id);
    };

    const handleAddTask = ({ taskName, description, column, subtasks }) => {
        const taskIdx = getId();
        const subtasksWithoutPlaceholder = subtasks.map((subtask) => ({
            id: subtask.id,
            subtaskName: subtask.subtaskName,
            status: subtask.status,
        }));

        const newTask = {
            id: taskIdx,
            taskName,
            subtasks: subtasksWithoutPlaceholder,
            description,
        };

        const newState = state.map((board) => {
            if (board.id !== selectedBoard) return board;

            const newColumns = board.columns.map((col) => {
                if (col.id !== column.id) return col;

                return {
                    ...col,
                    tasks: [...col.tasks, newTask],
                };
            });
            return {
                ...board,
                columns: newColumns,
            };
        });

        setState(newState);
        setIsAddNewTaskShown(false);
    };

    const handleInspectTask = (obj) => {
        if (obj === null) {
            setIsInspectTaskShown(false);
            setInspectedTask(null);
            return;
        }

        const { taskId, columnId } = obj;
        const board = state.find((board) => board.id === selectedBoard);
        const column = board.columns.find((column) => column.id === columnId);

        const task = column.tasks.find((task) => task.id === taskId);
        setInspectedTask({ task, columnId });
        setIsInspectTaskShown(true);
    };

    const handleEditTask = (
        title,
        description,
        subtasks,
        status,
        previousColumnId,
        taskId,
    ) => {
        const currentBoard = state.find((board) => board.id === selectedBoard);

        console.log(status);

        console.log(
            "Status.columnId",
            status.columnId,
            "previousColumnId",
            previousColumnId,
            "\nstatus:",
            status,
        );

        if (status.columnId === previousColumnId) {
            const newColumns = currentBoard.columns.map((column) => {
                if (column.id !== status.columnId) return column;
                // console.log(
                //     "BEFORE  columnId === previousColumnId:",
                //     column.tasks,
                // );

                // console.log("subtasks in app: ", subtasks);

                const newColumn = {
                    ...column,
                    tasks: column.tasks.map((task) => {
                        if (task.id !== taskId) return task;

                        return {
                            ...task,
                            taskName: title,
                            description: description,
                            subtasks: subtasks,
                        };
                    }),
                };

                // console.log(
                //     "AFTER columnId === previousColumnId:",
                //     newColumn.tasks,
                // );
                return newColumn;
            });
            setState(
                state.map((board) => {
                    if (board.id === selectedBoard)
                        return { ...board, columns: newColumns };
                    return board;
                }),
            );
            return;
        }

        const columnsAfterRemovingTask = currentBoard.columns.map((column) => {
            if (column.id !== previousColumnId) return column;

            const newColumn = {
                ...column,
                tasks: column.tasks.filter((task) => task.id !== taskId),
            };

            return newColumn;
        });

        const columnsAfterAddingTask = columnsAfterRemovingTask.map(
            (column) => {
                if (column.id !== status.columnId) return column;
                // console.log("BEFORE:", column.tasks);
                const newColumn = {
                    ...column,
                    tasks: [
                        ...column.tasks,
                        {
                            id: taskId,
                            taskName: title,
                            description: description,
                            subtasks: subtasks,
                        },
                    ],
                };
                // console.log("AFTER:", newColumn.tasks);
                return newColumn;
            },
        );

        const newState = state.map((board) => {
            if (board.id === selectedBoard)
                return { ...board, columns: columnsAfterAddingTask };
            return board;
        });

        setState(newState);
    };

    const handleAddBoard = (boardName, columns) => {
        console.log(boardName);
        console.log(columns);
        const newColumns = columns.map((column, index) => ({
            id: getId(),
            columnName: column,
            tasks: [],
            dotColor: colorPalette[index],
        }));

        const newId = getId();

        const newState = [
            ...state,
            { id: newId, boardName, columns: newColumns },
        ];
        setState(newState);
        setIsAddNewBoardShown(false);
        setSelectedBoard(newId);
    };

    const handleEditBoard = (boardName, columns) => {
        const newState = state.map((board) => {
            if (board.id !== selectedBoard) return board;

            return {
                ...board,
                boardName,
                columns,
            };
        });

        setState(newState);
        setIsEditBoardShown(false);
    };

    const handleAddColumn = (columnName) => {
        const newStates = state.map((board) => {
            if (board.id !== selectedBoard) return board;

            const newColumns = [
                ...board.columns,
                {
                    id: getId(),
                    columnName: columnName,
                    tasks: [],
                    dotColor: colorPalette[board.columns.length],
                },
            ];

            return {
                ...board,
                columns: newColumns,
            };
        });

        setState(newStates);
        setIsAddNewColumnShown(false);
    };

    const handleDeleteTask = (taskId, columnId) => {
        const newState = state.map((board) => {
            if (board.id !== selectedBoard) return board;

            const newColumns = board.columns.map((column) => {
                if (column.id !== columnId) return column;

                return {
                    ...column,
                    tasks: column.tasks.filter((task) => task.id !== taskId),
                };
            });

            return {
                ...board,
                columns: newColumns,
            };
        });

        setState(newState);
        setIsInspectTaskShown(false);
        setInspectedTask(null);
    };

    const handleDeleteBoard = (id) => {
        const newState = state.filter((board) => board.id !== id);
        setState(newState);
        console.log("New State: ", newState);
        handleSelectBoard(newState[0].id);
        setIsDeleteBoardShown(false);
    };

    const handleIsMobile = () => {
        const currentWidth = ref.current.clientWidth;
        setWindowWidth(currentWidth);
        if (currentWidth <= 480) {
            setIsMobile(true);
            setIsSidebarOpen(false);
            return;
        }
        if (currentWidth <= 700) {
            setIsMobile(false);
            setIsSidebarOpen(false);
            return;
        }

        setIsMobile(false);
        setIsSidebarOpen(true);
        return;
    };

    useLayoutEffect(() => {
        const currentWidth = window.innerWidth;
        console.log(currentWidth);
        setWindowWidth(currentWidth);
        if (currentWidth <= 480) {
            setIsMobile(true);
            setIsSidebarOpen(false);
            return;
        }
        if (currentWidth <= 700) {
            setIsMobile(false);
            setIsSidebarOpen(false);
            return;
        }

        setIsMobile(false);
        setIsSidebarOpen(true);
        return;
    }, []);

    useEffect(() => {
        console.log("New State: ", state);
        state && localStorage.setItem("state", JSON.stringify(state));
    }, [state]);

    useEffect(() => {
        selectedBoard && localStorage.setItem("selectedBoard", selectedBoard);
    }, [selectedBoard]);

    useEffect(() => {
        theme && localStorage.setItem("theme", theme);
    }, [theme]);

    useEffect(() => {
        const localState = JSON.parse(localStorage.getItem("state"));
        const localSelectedBoard = localStorage.getItem("selectedBoard");
        const localTheme = localStorage.getItem("theme");

        localState ? setState(localState) : setState(initialState.data);
        localSelectedBoard
            ? setSelectedBoard(localSelectedBoard)
            : localState
            ? setSelectedBoard(localState[0].id)
            : setSelectedBoard(initialState.data[0].id);
        localTheme ? setTheme(localTheme) : setTheme("light");
    }, []);

    useEffect(() => {
        window.addEventListener("resize", handleIsMobile);

        return () => window.removeEventListener("resize", handleIsMobile);
    }, []);

    return (
        <ThemeContext.Provider value={theme}>
            {state ? (
                <InspectTaskContext.Provider value={handleInspectTask}>
                    <main
                        className={`App ${theme}`}
                        onKeyDown={(e) => {
                            if (e.key === "Escape") {
                                setIsAddNewTaskShown(false);
                                setIsAddNewBoardShown(false);
                            }
                        }}
                        ref={ref}
                    >
                        {isSidebarOpen && (
                            <Sidebar
                                // boards={state.data}
                                boards={state}
                                selectBoard={handleSelectBoard}
                                selectedId={selectedBoard}
                                toggleTheme={toggleTheme}
                                hideSidebar={() => setIsSidebarOpen(false)}
                                // isSidebarOpen={!isMobile && isSidebarOpen}
                                isSidebarOpen={false}
                                setIsAddNewBoardShown={setIsAddNewBoardShown}
                            />
                        )}
                        <div className="content">
                            {isMobile ? (
                                <HeaderMobile
                                    boardName={
                                        state.find(
                                            ({ id }) => id === selectedBoard,
                                        ).boardName
                                    }
                                    isBoardEmpty={
                                        state.find(
                                            ({ id }) => id === selectedBoard,
                                        ).columns.length === 0
                                    }
                                    setIsEditBoardShown={setIsEditBoardShown}
                                    setIsDeleteBoardShown={
                                        setIsDeleteBoardShown
                                    }
                                    setIsMobileSelectBoardShown={
                                        setIsMobileSelectBoardShown
                                    }
                                    isMobileSelectBoardShown={
                                        isMobileSelectBoardShown
                                    }
                                    setIsAddNewTaskShown={setIsAddNewTaskShown}
                                    setIsEditTaskShown={setIsEditTaskShown}
                                    setIsDeleteTaskShown={setIsDeleteTaskShown}
                                />
                            ) : (
                                <Header
                                    isSidebarOpen={isSidebarOpen}
                                    addNewTask={() =>
                                        setIsAddNewTaskShown(true)
                                    }
                                    boardName={
                                        state.find(
                                            ({ id }) => id === selectedBoard,
                                        ).boardName
                                    }
                                    isBoardEmpty={
                                        state.find(
                                            ({ id }) => id === selectedBoard,
                                        ).columns.length === 0
                                    }
                                    setIsEditBoardShown={setIsEditBoardShown}
                                    setIsDeleteBoardShown={
                                        setIsDeleteBoardShown
                                    }
                                    isMobile={isMobile}
                                />
                            )}
                            <Board
                                columns={
                                    state.find(({ id }) => id === selectedBoard)
                                        .columns
                                }
                                isSidebarOpen={isSidebarOpen}
                                setIsSidebarOpen={setIsSidebarOpen}
                                addNewColumn={handleAddColumn}
                                setIsAddNewColumnShown={setIsAddNewColumnShown}
                                isMobile={isMobile}
                                popups={{
                                    isAddNewTaskShown,
                                    isEditTaskShown,
                                    isAddNewBoardShown,
                                    isInspectTaskShown,
                                    isAddNewColumnShown,
                                    isEditBoardShown,
                                    isDeleteBoardShown,
                                    isDeleteTaskShown,
                                    isMobileSelectBoardShown,
                                }}
                            />
                        </div>
                    </main>
                    {isAddNewTaskShown && (
                        <NewTaskForm
                            columns={
                                state.find(({ id }) => id === selectedBoard)
                                    .columns
                            }
                            setIsAddNewTaskShown={setIsAddNewTaskShown}
                            handleAddTask={handleAddTask}
                        />
                        // <EditTaskForm
                        //     columns={state[selectedBoard].columns}
                        //     setIsEditTaskShown={setIsAddNewTaskShown}
                        //     columnName="Todo"
                        //     columnId={1}
                        //     task={state[selectedBoard].columns[0].tasks[0]}
                        //     handleEditTask={handleEditTask}
                        // />
                    )}

                    {isEditTaskShown && (
                        <EditTaskForm
                            columns={
                                state.find(({ id }) => id === selectedBoard)
                                    .columns
                            }
                            setIsEditTaskShown={setIsEditTaskShown}
                            columnName={
                                state
                                    .find(({ id }) => id === selectedBoard)
                                    .columns.find(
                                        ({ id }) =>
                                            id === inspectedTask.columnId,
                                    ).columnName
                            }
                            columnId={inspectedTask.columnId}
                            task={inspectedTask.task}
                            handleEditTask={handleEditTask}
                        />
                    )}

                    {isAddNewBoardShown && (
                        <NewBoard
                            setIsAddNewBoardShown={setIsAddNewBoardShown}
                            handleAddBoard={handleAddBoard}
                        />
                    )}
                    {isInspectTaskShown && inspectedTask !== null && (
                        <InspectTask
                            task={inspectedTask?.task}
                            columns={
                                state.find(
                                    (board) => board.id === selectedBoard,
                                ).columns
                            }
                            status={{
                                columnId: inspectedTask?.columnId,
                                columnName: state
                                    .find(({ id }) => id === selectedBoard)
                                    .columns.find(
                                        ({ id }) =>
                                            id === inspectedTask?.columnId,
                                    ).columnName,
                            }}
                            setIsInspectTaskShown={setIsInspectTaskShown}
                            handleEditTask={handleEditTask}
                            setIsDeleteTaskShown={setIsDeleteTaskShown}
                            setIsEditTaskShown={setIsEditTaskShown}
                        />
                    )}
                    {isAddNewColumnShown && (
                        <NewColumn
                            setIsAddNewColumnShown={setIsAddNewColumnShown}
                            handleAddColumn={handleAddColumn}
                        />
                    )}

                    {isEditBoardShown && (
                        <EditBoardForm
                            setIsEditBoardShown={setIsEditBoardShown}
                            handleEditBoard={handleEditBoard}
                            board={state.find(({ id }) => id === selectedBoard)}
                        />
                    )}
                    {isDeleteBoardShown && (
                        <DeleteBoard
                            board={state.find(({ id }) => id === selectedBoard)}
                            handleDeleteBoard={handleDeleteBoard}
                            setIsDeleteBoardShown={setIsDeleteBoardShown}
                            numberOfBoards={state.length}
                            isMobile={isMobile}
                        />
                    )}
                    {isDeleteTaskShown && (
                        <DeleteTask
                            task={inspectedTask?.task}
                            setIsDeleteTaskShown={setIsDeleteTaskShown}
                            handleDeleteTask={handleDeleteTask}
                            columnId={inspectedTask?.columnId}
                            isMobile={isMobile}
                        />
                    )}
                    {isMobileSelectBoardShown && isMobile && (
                        <MobileSelectBoard
                            boards={state}
                            selectBoard={handleSelectBoard}
                            selectedId={selectedBoard}
                            toggleTheme={toggleTheme}
                            setIsAddNewBoardShown={setIsAddNewBoardShown}
                            setIsMobileSelectBoardShown={
                                setIsMobileSelectBoardShown
                            }
                        />
                    )}
                </InspectTaskContext.Provider>
            ) : (
                "Loading"
            )}
        </ThemeContext.Provider>
    );
}

export default App;
