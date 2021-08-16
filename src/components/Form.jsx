import React from "react";

export const Form = ({ setValue, todos, setTodos, value }) => {
  
  const inputTextHandler = (e) => {
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    setValue(capitalizeFirstLetter(e.target.value));
  };
  const submitTodoHandler = (e) => {
    e.preventDefault();
    setTodos(e.target.value);
    setTodos([
      ...todos,
      { text: value, completed: false, id: Math.random() * 1000 },
    ]);
    setValue("");
  };

  return (
    <form className="todo_form" action="">
      <div className="input_container">
        <input
          value={value}
          onChange={inputTextHandler}
          type="text"
          className="todo_input"
        />
        <button
          onClick={submitTodoHandler}
          className="todo_button"
          type="submit"
        >
          <i className="fas fa-plus-square"></i>
        </button>
      </div>
    </form>
  );
};
