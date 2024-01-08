import { useState, useRef, useEffect } from "react";
import styles from "../styles/Todo.module.css";
import shortid from "shortid";

import Task from "./Task";

const Todo = () => {
    const [inputs, setInputs] = useState({taskTitle: "", taskDescription: ""});
    const [todoList, setTodoList] = useState([]);

    const [isCompletedScreen, setIsCompletedScreen] = useState(false);
    const [isInputError, setIsInputError] = useState(false);

    const [disableFocus, setDisableFocus] = useState(false);

    const inputRef1 = useRef(null);
    const inputRef2 = useRef(null);

    useEffect(() => {
        let savedTodo = JSON.parse(localStorage.getItem("todoList"));
        if(savedTodo){
            setTodoList(savedTodo);
        }
    }, []);


    const onChange = (event) => {
        setInputs({...inputs, [event.target.name]: event.target.value});
    };

    const toggleScreen = (event) => {
        const clickedButton = event.target;
        if(!clickedButton.classList.contains(styles["btn-active"])){
            setIsCompletedScreen(!isCompletedScreen);
        }
    };

    const addTask = () => {
        if(inputs.taskTitle.trim() === "" || inputs.taskDescription.trim() === ""){
            setIsInputError(true);
            setDisableFocus(true);
            setTimeout(() => {
                setIsInputError(false);
                setDisableFocus(false);
            }, 2000);

            return;
        }

        let tempList = [...todoList];

        tempList.push({
            taskTitle: inputs.taskTitle, 
            taskDescription: inputs.taskDescription, 
            id: shortid.generate(),
            isCompleted: false,
            completedOne: ""
        });

        setTodoList(tempList);
        setInputs({taskTitle: "", taskDescription: ""});
        localStorage.setItem("todoList", JSON.stringify(tempList));
    };  

  return (
    <div className={styles["todo-container"]}>
        <div className={styles["input-wrapper"]}>
            <div className={styles["input-item"]}>
                <label htmlFor="task-title">Task Title</label>
                <input
                    className={`${isInputError && styles["error"]}`}
                    id="task-title" 
                    ref={inputRef1}
                    placeholder="What do you want to do today?"
                    name="taskTitle" 
                    value={inputs.taskTitle}
                    onChange={onChange}
                    onFocus={(event) => {
                        if(disableFocus){
                            event.preventDefault();
                            inputRef1.current.blur();
                        }
                    }}
                />
            </div>
            <div className={styles["input-item"]}>
                <label htmlFor="task-description">Description</label>
                <input 
                    className={`${isInputError && styles["error"]}`}
                    id="task-description" 
                    ref={inputRef2}
                    placeholder="What's the task description?" 
                    name="taskDescription"
                    value={inputs.taskDescription}
                    onChange={onChange}
                    onFocus={(event) => {
                        if(disableFocus){
                            event.preventDefault();
                            inputRef2.current.blur();
                        }
                    }}
                />
            </div>
            <button 
                data-add-task
                className={`${styles["btn"]} ${styles["btn-active"]}`}
                onClick={addTask}
                >Add Task</button>
        </div>
        <div className={styles["button-area"]}>
            <button 
                className={`${styles["btn"]} ${styles["btn-primary"]} ${(!isCompletedScreen) && styles["btn-active"]}`}
                onClick={toggleScreen}
                >Todo</button>
            <button 
                className={`${styles["btn"]} ${styles["btn-secondary"]} ${isCompletedScreen && styles["btn-active"]}`}
                onClick={toggleScreen}
                >Completed</button>
        </div>
        <div className={styles["tasks-container"]}>
            {!isCompletedScreen ?
                todoList.map((task) => {
                    return (!task.isCompleted) && 
                    (
                        <Task 
                        key={task.id} 
                        task={task} 
                        todoList={todoList} 
                        setTodoList={setTodoList}
                    />
                    );
                }) : 

                todoList.map((task) => {
                    return (task.isCompleted) && 
                    (
                        <Task 
                        key={task.id} 
                        task={task} 
                        todoList={todoList} 
                        setTodoList={setTodoList}
                    />
                    );
                })
            }
        </div>
    </div>
  )
}

export default Todo;
