// Home.jsx
import React, { useEffect, useState } from 'react';
import Create from './Create';
import './app.css';
import axios from 'axios';

function Home() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/students/get')
      .then(result => setStudents(result.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="container">
      <header className="header">
        <h1>User Details</h1>
        <Create setTodos={setStudents} /> {/* Pass setTodos to Create component */}
      </header>
      <table className="student-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>UserName</th>
            <th>Age</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student._id}>
              <td>{index + 1}</td>
              <td>{student.name}</td>
              <td>{student.lastName || '-'}</td>
              <td>{student.userName || '-'}</td>
              <td>{student.age}</td>
              <td>{student.salary || '-'}</td>
              <td>
                <button className="edit-btn">✏️</button>
                <button className="delete-btn">🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
