import { IconButton, makeStyles } from '@material-ui/core';
import { Edit, DeleteForever, CheckBox } from '@material-ui/icons';
import React from 'react';
import axios from "axios";

const useStyles = makeStyles(() => ({
    buttonCheck: {
        color: '#ff6c6c',
        marginLeft: '-17px',
        marginTop: '-10px',
        transform: 'scale(1.5)'
    },
    buttonEdit: {
        color: '#e2d029',
        marginRight: '-5px',
        marginTop: '-10px',
        transform: 'scale(1.5)'
    },
    buttonDelete: {
        color: 'lightseagreen',
        marginTop: '-12px',
        transform: 'scale(1.5)'
    },
    listItem: {
        display: 'flex',
        margin: '20px 0',
        border: '1px solid #ccc',
        borderRadius: '10px',
        padding: '10px',
        maxHeight: '30px'
    },
    list: {
        width: '220px',
        backgroundColor: '#12343b',
        border: 'none',
        color: '#ccc',
        fontSize: '20px',
        paddingLeft: '10px',
        marginRight: '15px'
    },
    complete: {
        textDecoration: 'solid',
        textDecorationLine: 'line-through',
        textDecorationColor: '#ff6c6c',
        opacity: 0.6
    }
}));

const TodosList = ({todos, setTodos, setEditTodo, callback, setCallback, setInput}) => {

    const classes = useStyles();

        const handleDelete = async ({ _id }) => {
            // setTodos(todos.filter((todo) => todo.id !== id));
            try {
                await axios.delete(`https://todolist-improving.herokuapp.com/api/task/${_id}`
                );  
                setCallback(!callback);
            } catch (e) {
                console.log(e);
            }
        }

        const handleComplete = (todo) => {
            setTodos(
                todos.map((item) => {
                    if(item.id === todo.id){
                        return {...item, completed: !item.completed}
                    }
                    return item;
                })
            );
        };

        const handleEdit = ({ _id }) => {
            const findTodo = todos.find((todo) => todo._id === _id);
            setEditTodo(findTodo);
            setInput(findTodo.task);
        }

    return ( 
    <div>
        {todos.map((todo) => (
            <li className={classes.listItem} key={todo._id}>
                <input 
                type="text" 
                value={todo.task} 
                className={`list ${todo.completed ? "complete" : ""}`} 
                onChange={(event) => event.preventDefault()} 
                />

                <div>
                    <IconButton className={classes.buttonCheck} onClick={() => handleComplete(todo)}>
                        <CheckBox/>
                    </IconButton>
                    <IconButton className={classes.buttonEdit} onClick={() => handleEdit(todo)}>
                        <Edit/>
                    </IconButton>
                    <IconButton className={classes.buttonDelete} onClick={() => handleDelete(todo)}>
                        <DeleteForever/>
                    </IconButton>
                </div>
            </li>
        ))}
    </div>
    );
};

export default TodosList
