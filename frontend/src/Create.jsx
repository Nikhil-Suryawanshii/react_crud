import React, { useState } from 'react';
import './app.css'; // Import the CSS file
import axios from 'axios';

const Create = ({ setTodos }) => { // Accept setTodos as a prop

    const [task, setTask] = useState('');
    
    const handleAdd = () => {
        axios.post('http://localhost:5000/add', { task: task })
            .then(result => {
                setTodos(prevTodos => [...prevTodos, result.data]); // Update todos instantly
                setTask(''); // Clear the input field after adding
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="container">
            <input 
                type="text" 
                placeholder="Add a new to-do..." 
                className="create-input"
                value={task} // Bind the input value to task state
                onChange={(e) => setTask(e.target.value)}
            />
            <button 
                type="button" 
                className="create-button"
                onClick={handleAdd}
            >
                Add Todo
            </button>
        </div>
    );
};

export default Create;
