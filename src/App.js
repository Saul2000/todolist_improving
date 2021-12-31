import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import TodosList from "./components/TodosList";
import styled from 'styled-components'
import './App.css';
import { fetchAllTodos } from "./api/todos";

const App = () => {
  
  // const initialState = JSON.parse(localStorage.getItem("todos")) || [];
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [callback, setCallback] = useState(false);
  const [editTodo, setEditTodo] = useState(null);

  useEffect(() => {
    fetchAllTodos()
    .then( (res) => {
      setTodos(res.data);
    })
    .catch((error) =>  {
      console.log(error)
    })
  }, [callback])

  return (<Container>
      <Wrapper>
        <div>
          <Header />
        </div>
        <div>
          <Form 
          input={input}
          setInput={setInput}
          callback = {callback}
          setCallback = {setCallback}
          editTodo={editTodo}
          setEditTodo={setEditTodo}
          />
        </div>
        <div>
          <TodosList setInput={setInput} todos={todos} setTodos={setTodos} setEditTodo={setEditTodo} callback={callback} setCallback={setCallback}/>
        </div>
      </Wrapper>
    </Container>
    );
}

export default App;

const Container = styled.div`
      background: linear-gradient(to right bottom, #e1b382, #c89666);
      width: 100%;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
`

const Wrapper = styled.div`
      background-color: #12343b;
      min-width: 450px;
      min-height: 650px;
      padding: 30px;
      box-sizing: border-box;
      border-radius: 10px;
      box-shadow: 3px 6px 40px #000;
`;