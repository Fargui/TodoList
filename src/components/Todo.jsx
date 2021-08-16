import React, { useState } from "react";
import "../assets/scss/TodoList.scss";



const Todo = ({ text, todo, setTodos, todos }) => {
  const [checked, setChecked] = useState(false);

  const deleteHandler = () => {
    setTodos(todos.filter((el) => el.id !== todo.id));
  };

  const checkedHandler = () => {
    setChecked(!checked);

    setTodos(
      todos.map((item) => {
        if (item.id === todo.id) {
          return {
            ...item,
            completed: !item.completed,
          };
        }
        return item;
      })
    );
  };

  return (

      <div className="todo">
        <label
          key={todo.id}
          className={`todo_item ${todo.completed ? "completed" : ""}`}
        >
          <input
            type="radio"
            onClick={checkedHandler}
            value={todo.id}
            checked={checked}
            onChange={() => {}}
          />
          {text}
        </label>
        <i onClick={deleteHandler} className="fas fa-times close"></i>
      </div>

  );
};

export default Todo;
