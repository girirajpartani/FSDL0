"use client";

import { useState } from "react";

export default function StudentForm() {
  const [student, setStudent] = useState({
    firstName: "",
    lastName: "",
    rollNo: "",
    password: "",
    confirmPassword: "",
    contact: "",
  });

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (student.password !== student.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/students/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(student),
      });

      if (res.ok) {
        alert("Student Added");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="firstName" placeholder="First Name" onChange={handleChange} />
      <input name="lastName" placeholder="Last Name" onChange={handleChange} />
      <input name="rollNo" placeholder="Roll No" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} />
      <input name="contact" placeholder="Contact" onChange={handleChange} />

      <button type="submit">Add Student</button>
    </form>
  );
}