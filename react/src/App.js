import React, { useState } from 'react';
import './style.css';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const addNewTodo = () => {
    if (newTodo.trim() !== '') {
      setTodoList([...todoList, newTodo]);
      setNewTodo('');
    }
  };

  const deleteTodo = (index) => {
    const updateList = [
      ...todoList.slice(0, index),
      ...todoList.slice(index + 1),
    ];
    setTodoList(updateList);
  };

  return (
    <div>
      <h1>To Do List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => {
          setNewTodo(e.target.value);
        }}
      />
      <button onClick={addNewTodo}>추가</button>
      <ul>
        {todoList.map((todo, index) => (
          <li key={index}>
            {todo} <button onClick={() => deleteTodo(index)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
