import React, { useState } from 'react';
import './app.css';
import axios from 'axios';

const Create = ({ setStudents }) => {
  const [student, setStudent] = useState({ name: '', email: '', age: '', dob: '' });
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [error, setError] = useState('');

  const handleAdd = (e) => {
    e.preventDefault(); // Prevent page reload on submit

    if (!student.name || !student.email || !student.age || !student.dob || !profilePhoto) {
      setError('Please fill all fields and upload a profile photo.');
      return;
    }

    const formData = new FormData();
    formData.append('name', student.name);
    formData.append('email', student.email);
    formData.append('age', student.age);
    formData.append('dob', student.dob);
    formData.append('profilePhoto', profilePhoto);

    axios.post('http://localhost:5000/api/students/add', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then(result => {
        setStudents(prevStudents => [...prevStudents, result.data]);
        setStudent({ name: '', email: '', age: '', dob: '' });
        setProfilePhoto(null);
        setError('');
      })
      .catch(err => {
        setError('There was an error adding the student.');
        console.log(err);
      });
  };

  return (
    <div className="container">
      {error && <div className="error-message">{error}</div>} {/* Display error message */}
      <form onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="Student Name"
          value={student.name}
          onChange={(e) => setStudent({ ...student, name: e.target.value })}
          className="input-field"
        />
        <input
          type="email"
          placeholder="Student Email"
          value={student.email}
          onChange={(e) => setStudent({ ...student, email: e.target.value })}
          className="input-field"
        />
        <input
          type="number"
          placeholder="Student Age"
          value={student.age}
          onChange={(e) => setStudent({ ...student, age: e.target.value })}
          className="input-field"
        />
        <input
          type="date"
          placeholder="Date of Birth"
          value={student.dob}
          onChange={(e) => setStudent({ ...student, dob: e.target.value })}
          className="input-field"
        />
        <input
          type="file"
          onChange={(e) => setProfilePhoto(e.target.files[0])}
          className="input-field"
        />
        <button type="submit" className="add-button">Add Student</button>
      </form>
    </div>
  );
};

export default Create;
