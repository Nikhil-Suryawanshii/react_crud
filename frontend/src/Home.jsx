import React, { useEffect, useState } from 'react';
import Create from './Create';
import './app.css'; // Import the CSS file
import axios from 'axios';

function Home() {
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState({ id: null, task: '' });

  useEffect(() => {
    axios.get('http://localhost:5000/get')
      .then(result => setTodos(result.data))
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/delete/${id}`)
      .then(() => {
        setTodos(todos.filter(todo => todo._id !== id));
      })
      .catch(err => console.log(err));
  };

  const handleEdit = (todo) => {
    setEditTodo({ id: todo._id, task: todo.task });
  };

  const handleUpdate = () => {
    if (editTodo.id) {
      axios.put(`http://localhost:5000/update/${editTodo.id}`, { task: editTodo.task })
        .then(result => {
          setTodos(todos.map(todo => (todo._id === editTodo.id ? result.data : todo)));
          setEditTodo({ id: null, task: '' });
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div className="container">
      <h2 className="title">Todo List</h2>
      <Create />
      <div className="todo-list">
        {
          todos.length === 0 
          ? <div className="no-todos"><h1>No todos</h1></div>
          : todos.map((todo) => (
              <div key={todo._id} className="todo-item">
                <span className="todo-task">{todo.task}</span>
                <div className="todo-actions">
                  <button onClick={() => handleEdit(todo)} className="btn edit-btn">Edit</button>
                  <button onClick={() => handleDelete(todo._id)} className="btn delete-btn">Delete</button>
                </div>
              </div>
            ))
        }
      </div>
      {editTodo.id && (
        <div className="edit-container">
          <input 
            type="text" 
            value={editTodo.task} 
            onChange={(e) => setEditTodo({ ...editTodo, task: e.target.value })} 
            className="edit-input"
          />
          <button onClick={handleUpdate} className="btn update-btn">Update Todo</button>
        </div>
      )}
    </div>
  );
}

export default Home;
