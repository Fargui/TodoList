import "./App.scss";
import { React, useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import { Form } from "./components/Form";
import bg from "./images/bg-mobile-dark.jpg";



function App() {

 

  //STATES
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("All");
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [uncompletedTodos, setuncompletedTodos] = useState(0);
  const [todoExist, setTodoExist] = useState(false);

  
  //USEEFFECT
  useEffect(() => {
    statusCounter(todos);
  }, [todos, status]);

  useEffect(() => {
    filterHandler();
  }, [todos, status]);

  useEffect(() => {
    existHandler();
  }, [todos, status]);

 

  //FUNCTIONS
  const statusCounter = (inputs) => {
    let counter = 0;
    for (const todo of inputs) {
      if (todo.completed === false) counter += 1;
    }
    setuncompletedTodos(counter);
  };

  const filterHandler = () => {
    switch (status) {
      case "completed":
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
        break;

      default:
        setFilteredTodos(todos);
        break;
    }
  };
  const existHandler = () => {
    if (todos.length !== 0) {
      setTodoExist(true);
    } else {
      setTodoExist(false);
    }
  };

 

  return (
    <div className="App">
      <img src={bg} alt="" className="background" />
      <div className="background_color"></div>
      <header className="header">
        <h1 className="title">TODO</h1>
        <span></span>
      </header>
      <main className="todo_container_main">
        <Form
          todos={todos}
          setTodos={setTodos}
          setValue={setValue}
          value={value}
        />

        <TodoList
          setTodos={setTodos}
          todos={todos}
          filteredTodos={filteredTodos}
          setuncompletedTodos={setuncompletedTodos}
          uncompletedTodos={uncompletedTodos}
          todoExist={todoExist}
          setStatus={setStatus}
        />
      </main>
    </div>
  );
}

export default App;
