<div className="todo_list_container">
<DragDropContext onDragEnd={e => console.log(e)}>
  <table className="todo_list">
    <tbody>
      {filteredTodos.map((todo, index) => (
        <Droppable droppableId="droppable-1">
          {(provided) => (
            <tr
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="table_row"
            >
              <Draggable key={todo.id} index={index} draggableId={todo.id} >
                {(provided) => {
                  <td
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Todo
                      setTodos={setTodos}
                      todo={todo}
                      todos={todos}
                      text={todo.text}
                      key={todo.id}
                      completed={todo.completed}
                    />
                  </td>;
                }}
              </Draggable>
            </tr>
          )}
        </Droppable>
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
      {/* Gerer l'affichage conditionnel de cette TR à la présence d'un todo par un state */}
    </tbody>
    {/* METTRE LE SELECT SOUS FORME VOULUE */}
  </table>
</DragDropContext>
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