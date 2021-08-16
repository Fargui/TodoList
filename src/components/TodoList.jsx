import React from "react";
import "../assets/scss/TodoList.scss";

import Todo from "./Todo";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function TodoList({
  todos,
  setTodos,
  filteredTodos,
  uncompletedTodos,
  todoExist,
  setStatus,
}) {
  const statusHandler = (e) => {
    setStatus(e.target.value);
    let classes = "status_button";
    let els = document.getElementsByClassName("status_button active");
    if (els) {
      while (els[0]) {
        els[0].classList.remove("active");
      }
    }
    e.target.className = classes.replace(
      "status_button",
      "status_button active"
    );
  };
  const deleteCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const saveList = (filteredTodos) => {
    localStorage.setItem("TODOLIST", JSON.stringify(filteredTodos));
  };

  const getList = function(){
    return(
      (localStorage.getItem("TODOLIST") && JSON.parse(localStorage.getItem("TODOLIST")) || filteredTodos)
    )
  }

  const list = getList();
  console.log(list);

  return (
    <div className="todo_list_container">
      <table className="todo_list">
        <DragDropContext
          onDragEnd={(param) => {
            const srcI = param.source.index;
            if (list.length > 1 && param.destination !== null) {
              const desI = param.destination.index;
              list.splice(desI, 0, list.splice(srcI, 1)[0]);
              saveList(list);
            }
          }}
        >
          <Droppable droppableId="droppable-1">
            {(provided) => (
              <tbody ref={provided.innerRef} {...provided.droppableProps}>
                {list.map((todo, i) => (
                  <Draggable
                    key={todo.id}
                    draggableId={"draggable" + todo.id}
                    index={i}
                  >
                    {(provided) => (
                      <tr
                        className="table_row"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <td>
                          <Todo
                            setTodos={setTodos}
                            todo={todo}
                            todos={todos}
                            text={todo.text}
                            key={todo.id}
                            completed={todo.completed}
                          />
                        </td>
                      </tr>
                    )}
                  </Draggable>
                ))}

                {todoExist && (
                  <tr className="bottom_todo">
                    <td>
                      {uncompletedTodos} tâche{uncompletedTodos > 1 ? "s" : ""}{" "}
                      restante{uncompletedTodos > 1 ? "s" : ""}
                    </td>
                    <td onClick={deleteCompleted} className="clear_completed">
                      Effacer les fait
                    </td>
                  </tr>
                )}
                {provided.placeholder}
              </tbody>
            )}
          </Droppable>
        </DragDropContext>
      </table>

      {todoExist && (
        <div className="status_todo">
          <button className="status_button" onClick={statusHandler} value="all">
            All
          </button>
          <button
            className="status_button"
            onClick={statusHandler}
            value="uncompleted"
          >
            Active
          </button>
          <button
            className="status_button"
            onClick={statusHandler}
            value="completed"
          >
            Fait
          </button>
        </div>
      )}
    </div>
  );
}
