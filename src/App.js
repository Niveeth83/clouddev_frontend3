import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://niveethcontainer123-d7fdhrfthdg7bbe0.centralus-01.azurewebsites.net/api/students')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        setStudents(data);
      })
      .catch(err => {
        console.error('Fetch error:', err);
        setError(err.message);
      });
  }, []);

  return (
    <div className="App">
      <h1>Student List of Niveeth Reddy Kasara</h1>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <table border="1" style={{ margin: 'auto' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Department</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.age}</td>
                <td>{student.department}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Loading or no data</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
