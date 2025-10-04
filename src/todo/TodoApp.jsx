import React, { useState, useEffect } from 'react';

const LOCAL_STORAGE_KEY = 'todoApp.todos';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  // Load todos from localStorage on mount
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  // Save todos to localStorage whenever they change
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
    <div style={{ maxWidth: 400, margin: '2rem auto', padding: '1rem', background: '#f9f9f9', borderRadius: 8 }}>
      <h2>Todo App</h2>
      <form onSubmit={addTodo} style={{ display: 'flex', gap: '0.5rem' }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Add a new todo"
          style={{ flex: 1, padding: '0.5rem' }}
        />
        <button type="submit">Add</button>
      </form>

      <div style={{ marginTop: '1.5rem' }}>
        <h3 style={{ marginBottom: '0.5rem' }}>Yet to Complete</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {yetToComplete.length === 0 && <li>No todos yet!</li>}
          {yetToComplete.map(todo => (
            <li key={todo.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                style={{ marginRight: '0.5rem' }}
              />
              <span
                style={{ flex: 1, cursor: 'pointer', color: '#222' }}
                onClick={() => toggleTodo(todo.id)}
              >
                {todo.text}
              </span>
              <button onClick={() => deleteTodo(todo.id)} style={{ marginLeft: '0.5rem' }}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        <h3 style={{ marginBottom: '0.5rem' }}>Completed</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {completed.length === 0 && <li>No completed todos!</li>}
          {completed.map(todo => (
            <li key={todo.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                style={{ marginRight: '0.5rem' }}
              />
              <span
                style={{ flex: 1, textDecoration: 'line-through', color: '#888', cursor: 'pointer' }}
                onClick={() => toggleTodo(todo.id)}
              >
                {todo.text}
              </span>
              <button onClick={() => deleteTodo(todo.id)} style={{ marginLeft: '0.5rem' }}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoApp;
