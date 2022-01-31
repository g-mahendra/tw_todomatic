import React, { useEffect, useState } from "react";
import "./css/App.css";
import ToDo from "./components/ToDo";

const App = () => {
  // States

  const [todo, setTodo] = useState(""); // state variable: to store todo text
  const [allToDos, setAllToDos] = useState([]); // state variable: array of todo items
  const [remaining, setRemaining] = useState(0); // state variable: to store count of remaining todos
  const [count, setCount] = useState(0); // state variable: to store length of array of todo items

  // state variable: to apply filters based on filter button being clicked
  const [displayFilter, setDisplayFilter] = useState({
    all: true,
    completed: false,
    incomplete: false,
  });

  const handleInputChange = (event) => setTodo(event.target.value); // input handler for todo input

  // submit event handler
  const handleSubmit = (event) => {
    event.preventDefault();
    const tempTodo = {
      id: allToDos.length + 1,
      task: todo,
      completed: false,
    };
    setAllToDos([...allToDos, tempTodo]);
    setTodo("");
  };

  // function to handle mark as complete feature
  const handleToDoComplete = (id) => {
    const updatedTodos = allToDos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });

    setAllToDos(updatedTodos);
  };

  // function to handle delete TODO feature
  const handleToDoDelete = (id) => {
    const updatedTodos = allToDos.filter((todo) => id !== todo.id);
    setAllToDos(updatedTodos);
  };

  // function to handle edit TODO feature
  const handleToDoEdit = (id, updatedTask) => {
    const updatedTodos = allToDos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, task: updatedTask };
      }
      return todo;
    });
    setAllToDos(updatedTodos);
  };

  // function to apply filters on todo list based on displayFilter state variable
  const applyFilter = (filter) => {
    const tempFilter = {
      all: false,
      completed: false,
      incomplete: false,
    };
    tempFilter[filter] = true;
    setDisplayFilter(tempFilter);
  };

  // to set the count of remainging todos
  useEffect(() => {
    setCount(allToDos.length);
    setRemaining(allToDos.filter((todo) => !todo.completed).length);
  }, [allToDos]);

  const handleClearAll = () => setAllToDos([]); // function to clear all todos with a single button

  // toDoList component which renders conditionally based on filter being applied
  const toDoList = (
    <div id="todo-list">
      <div>
        <h2>Tasks remaining : {remaining}</h2>
        <button disabled={count === 0} onClick={handleClearAll}>
          Clear
        </button>
      </div>
      {allToDos
        .filter((todo) => {
          if (displayFilter.completed) return todo.completed;
          else if (displayFilter.incomplete) return !todo.completed;
          return true;
        })
        .map((todoitem) => (
          <ToDo
            key={todoitem.id}
            id={todoitem.id}
            task={todoitem.task}
            completed={todoitem.completed}
            handleCompleteTodo={handleToDoComplete}
            handleDeleteTodo={handleToDoDelete}
            handleEditTodo={handleToDoEdit}
          />
        ))}
    </div>
  );

  return (
    <div className="main-container">
      <div className="todo-container">
        <h1 className="page-heading">Todomatic</h1>
        <div className="todo-input-container">
          <label htmlFor="todo-input">What's on your mind</label>
          <form onSubmit={handleSubmit} id="input-and-button-container">
            <input
              id="todo-input"
              type="text"
              value={todo}
              onChange={handleInputChange}
              placeholder="Enter your todo"
            />
            <input type="submit" id="submit" value="ADD Todo" />
          </form>
          <div id="filter-buttons">
            <button
              disabled={displayFilter.all}
              onClick={() => applyFilter("all")}
            >
              All
            </button>
            <button
              disabled={displayFilter.completed}
              onClick={() => applyFilter("completed")}
            >
              Completed
            </button>
            <button
              disabled={displayFilter.incomplete}
              onClick={() => applyFilter("incomplete")}
            >
              Incomplete
            </button>
          </div>
        </div>
        {toDoList}
      </div>
    </div>
  );
};

export default App;
