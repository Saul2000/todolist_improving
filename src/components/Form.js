import { Button, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react'
// import {v4 as uuidv4} from "uuid";
import axios from "axios"; 

const useStyles = makeStyles(() => ({
    buttonMain: {
        width: '70px',
        padding: '10px',
        fontSize: '20px',
        borderRadius: '10px',
        border: 0,
        marginBottom: '10px',
        backgroundColor: '#f1af71',
        cursor: 'pointer'
    },
    taskInput: {
        outline: 'none',
        width: '260px',
        padding: '15px',
        marginRight: '25px',
        fontSize: '20px',
        color: '#ccc',
        backgroundColor: '#000',
        border: '1px solid #c89666',
        borderRadius: '10px'
    }
}));

const Form = ({ input, setInput, todos, setTodos, editTodo, setEditTodo, callback, setCallback}) => {

    const classes = useStyles();

        const updateTodo = async (task, id) => {
            // const newTodo = todos.map((todo) => 
            //     todo.id === id ? { title, id, completed } : todo
            // );
            // setTodos(newTodo)
            // setEditTodo("");
            try {
                await axios.put(`https://todolist-improving.herokuapp.com/api/task/${id}`,
                {
                    task: task, 
                    active: editTodo.active,
                }
                );  
                setCallback(!callback);
                setEditTodo(null);
                setInput("");
            } catch (e) {
                console.log(e);
            }
        };

        useEffect(() => {
            if(editTodo){
                setInput(editTodo.title);
            } else {
                setInput("")
            }
        }, [setInput, editTodo]); 

        const onInputChange = (event) => {
            setInput(event.target.value);
        };
        const onFormSubmit = async (event) => {
            event.preventDefault();
            if(!editTodo){
            //     setTodos([...todos, {id: uuidv4(), title: input, completed: false}]);
            // setInput("");
            try {
                await axios.post("https://todolist-improving.herokuapp.com/api/task",
                {
                    task: input, 
                    active: false,
                }
                );  
                setCallback(!callback);
            } catch (e) {
                console.log(e);
            }
            } else {
                setInput(editTodo.task);
                updateTodo(input, editTodo._id);
            }
        }
    return (
        <form onSubmit={onFormSubmit}>
            <input type="text" placeholder="Enter a Todo..." className={classes.taskInput} value={input} required onChange={onInputChange}/>
            <Button variant="contained" className={classes.buttonMain} type="submit">
                {editTodo ? "OK" : "Add"}
            </Button> 
        </form>
    );
}

export default Form
