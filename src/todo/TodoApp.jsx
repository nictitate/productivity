import React, { useState, useEffect } from 'react';
import './TodoApp.css';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

const LOCAL_STORAGE_KEY = 'todoApp.todos';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTodos([...todos, { text: input, completed: false, id: Date.now() }]);
    setInput('');
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const yetToComplete = todos.filter(todo => !todo.completed);
  const completed = todos.filter(todo => todo.completed);

  return (
    <div className="todo-container">
    <h2 className="todo-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}>
      <CheckCircleIcon className="todo-title-icon" style={{ width: 28, height: 28 }} />
      Todo App
    </h2>
      <form onSubmit={addTodo} className="todo-form">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Add a new todo"
          className="todo-input"
        />
        <button
          type="submit"
          className="todo-btn"
        >Add</button>
      </form>

      <div className="todo-section">
        <h3 className="todo-section-title yet">Yet to Complete</h3>
        <ul className="todo-list">
          {yetToComplete.length === 0 && <li className="todo-list-empty">No todos yet!</li>}
          {yetToComplete.map(todo => (
            <li key={todo.id} className="todo-item">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="todo-checkbox"
              />
              <span
                className="todo-text"
                onClick={() => toggleTodo(todo.id)}
              >
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="todo-delete-btn"
              >Delete</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="todo-section" style={{ marginTop: '2rem' }}>
        <h3 className="todo-section-title completed">Completed</h3>
        <ul className="todo-list">
          {completed.length === 0 && <li className="todo-list-empty">No completed todos!</li>}
          {completed.map(todo => (
            <li key={todo.id} className="todo-item completed">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="todo-checkbox completed"
              />
              <span
                className="todo-text completed"
                onClick={() => toggleTodo(todo.id)}
              >
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="todo-delete-btn"
              >Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoApp;
