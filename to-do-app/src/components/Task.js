import React from "react";
import styles from "../styles/Task.module.css"
import { AiFillDelete } from "react-icons/ai";
import { IoArrowUndoCircle } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";

const Task = ({task, todoList, setTodoList}) => {
    console.log("nirender balik");

    const handleDelete = () => {
        let newList = todoList.filter((todo) => {
            return task.id !== todo.id;
        });
        
        setTodoList(newList);
        localStorage.setItem("todoList", JSON.stringify(newList));
    };

    const handleComplete = () => {
        let currentDate = new Date();
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();
        let hour = currentDate.getHours();
        let minutes = currentDate.getMinutes();
        let seconds = currentDate.getSeconds();
        let dateOfCompletion = `${month}/${day}/${year}  at ${hour}:${minutes}:${seconds}`;

        let newList = todoList.map((todo) => {
            if(todo.id === task.id) {
                return {...todo, isCompleted: true, completedOn: dateOfCompletion};
            }else{
                return todo;
            }
        });

        setTodoList(newList);
        localStorage.setItem("todoList", JSON.stringify(newList));
    };

    const handleUndo = () => {
        let newList = todoList.map((todo) => {
            if(todo.id === task.id) {
                return {...todo, isCompleted: false, completedOn: ""};
            }else{
                return todo;
            }
        });

        setTodoList(newList);
    };  


    return (
        <div className={styles["task-card"]}>
            <div className={styles["task-details"]}>
                <h3 className={task.isCompleted && styles["strike"]}>{task.taskTitle}</h3>
                <p>{task.taskDescription}</p>
                {task.isCompleted && <p>{task.completedOn}</p>}
            </div>
            <div className={styles["commands-wrapper"]}>
                <AiFillDelete 
                        data-delete
                        className={styles["icon"]} 
                        onClick={handleDelete}
                        title="Delete the task?"
                /> 
                {task.isCompleted ? 
                    <IoArrowUndoCircle
                        data-complete
                        className={`${styles["icon"]} ${styles["btn-check"]}`}
                        onClick={handleUndo}
                        title="Undo the task?"
                    /> 
                    
                    :

                    <FaCheck 
                        data-complete
                        className={`${styles["icon"]} ${styles["btn-check"]}`}
                        onClick={handleComplete}
                        title="Mark as completed?"
                    />
                }
                
            </div>
        </div>    
    );
};

export default React.memo(Task);