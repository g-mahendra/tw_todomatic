import React, { useState } from "react";
import "../css/ToDo.css";

const ToDo = ({
  task,
  completed,
  id,
  handleCompleteTodo,
  handleDeleteTodo,
  handleEditTodo,
}) => {
  const [editing, setediting] = useState(false); // state variable: to check if editing is being done
  const [updatedToDo, setUpdatedToDo] = useState(task); // state variable: for edited todo task

  const handleEditChange = (event) => setUpdatedToDo(event.target.value); // change event handler for edit input change

  // function to change states when edit button is clicked
  const handleEditStart = () => {
    setediting(true);
    setUpdatedToDo(task);
  };

  // function to change states when cancel button is clicked
  const handleEditCancel = () => {
    setUpdatedToDo("");
    setediting(false);
  };

  // submit event handler for submitting updated todo
  const handleSubmit = (event) => {
    event.preventDefault();
    handleEditTodo(id, updatedToDo);
    setediting(false);
  };

  // callback for handling mark as complete feature
  const completeToDoHandler = () => handleCompleteTodo(id);

  // callback for handling delete todo feature
  const deleteToDoHandler = () => handleDeleteTodo(id);

  /* 
    conditionally rendered block for displaying
   * 1. Task text if task is incomplete
   * 2. Task text with strike through if task is marked as complete
   * 3. Text input if task is to be edited by clicking on edit button
   */
  const conditionallyRenderdBlock = editing ? (
    <form onSubmit={handleSubmit}>
      <input
        id="edit-input"
        value={updatedToDo}
        type="text"
        onChange={handleEditChange}
        placeholder="Enter updated text"
      />
      <input id="submit-edit" type="submit" value="Update" />
    </form>
  ) : completed ? (
    <s>
      <p>{task} : completed</p>
    </s>
  ) : (
    <p>{task}</p>
  );

  return (
    <div id="todo-item">
      {conditionallyRenderdBlock}
      <div id="buttons-container">
        {!editing ? (
          <button disabled={completed} onClick={handleEditStart}>
            Edit
          </button>
        ) : (
          <button onClick={handleEditCancel}>Cancel</button>
        )}
        <button onClick={completeToDoHandler}>
          {completed ? "Mark as incomplete" : "Mark as done"}
        </button>
        <button onClick={deleteToDoHandler}>Delete</button>
      </div>
    </div>
  );
};

export default ToDo;
