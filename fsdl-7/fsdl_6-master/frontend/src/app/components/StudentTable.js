"use client";

import { useEffect, useState } from "react";

export default function StudentTable() {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    const res = await fetch("http://localhost:5000/api/students");
    const data = await res.json();
    setStudents(data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const deleteStudent = async (rollNo) => {
    await fetch(`http://localhost:5000/api/students/delete/${rollNo}`, {
      method: "DELETE",
    });

    fetchStudents();
  };

  const updateStudent = async (rollNo) => {
    const newContact = prompt("Enter new contact:");

    await fetch(`http://localhost:5000/api/students/update/${rollNo}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contact: newContact }),
    });

    fetchStudents();
  };

  return (
    <table border="1" style={{ marginTop: "20px" }}>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Roll No</th>
          <th>Contact</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {students.map((s) => (
          <tr key={s.rollNo}>
            <td>{s.firstName}</td>
            <td>{s.lastName}</td>
            <td>{s.rollNo}</td>
            <td>{s.contact}</td>
            <td>
              <button onClick={() => updateStudent(s.rollNo)}>Update</button>
              <button onClick={() => deleteStudent(s.rollNo)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}