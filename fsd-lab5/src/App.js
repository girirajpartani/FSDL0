import React, { useState } from "react";
import "./App.css";
import { FaCalculator, FaWpforms, FaFileAlt } from "react-icons/fa";

function App() {
  const [page, setPage] = useState("");

  // Calculator
  const [input, setInput] = useState("");

  const handleClick = (value) => {
    setInput(input + value);
  };

  const calculate = () => {
    try {
      setInput(eval(input));
    } catch {
      setInput("Error");
    }
  };

  // Form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const validate = () => {
    let newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Invalid email";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSuccess("Form submitted successfully ✅");
      setName("");
      setEmail("");
    } else {
      setSuccess("");
    }
  };

  // Resume
  const [rname, setRname] = useState("");
  const [education, setEducation] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [showResume, setShowResume] = useState(false);

  return (
    <div className="container">
      <h1 className="title">🚀 FSD Lab 5</h1>

      <div className="nav">
        <button onClick={() => setPage("calculator")}>
          <FaCalculator /> Calculator
        </button>

        <button onClick={() => setPage("form")}>
          <FaWpforms /> Form
        </button>

        <button onClick={() => setPage("resume")}>
          <FaFileAlt /> Resume
        </button>
      </div>

      <div className="card">
        {/* Calculator */}
        {page === "calculator" && (
          <div>
            <h2>🧮 Calculator</h2>
            <input className="display" value={input} readOnly />

            <div className="grid">
              {["7","8","9","+"].map((btn) => (
                <button key={btn} onClick={() => handleClick(btn)}>{btn}</button>
              ))}
              {["4","5","6","-"].map((btn) => (
                <button key={btn} onClick={() => handleClick(btn)}>{btn}</button>
              ))}
              {["1","2","3","*"].map((btn) => (
                <button key={btn} onClick={() => handleClick(btn)}>{btn}</button>
              ))}

              <button onClick={() => handleClick("0")}>0</button>
              <button onClick={() => handleClick(".")}>.</button>
              <button onClick={calculate}>=</button>
              <button onClick={() => setInput("")}>C</button>
            </div>
          </div>
        )}

        {/* Form */}
        {page === "form" && (
          <div>
            <h2>📝 React Form</h2>

            <form onSubmit={handleSubmit}>
              <input
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={errors.name ? "error" : ""}
              />
              <p className="error-text">{errors.name}</p>

              <input
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={errors.email ? "error" : ""}
              />
              <p className="error-text">{errors.email}</p>

              <button type="submit">Submit</button>
            </form>

            <p className="success">{success}</p>
          </div>
        )}

        {/* Resume */}
        {page === "resume" && (
          <div>
            <h2>📄 Resume Builder</h2>

            <input placeholder="Name" onChange={(e) => setRname(e.target.value)} />
            <input placeholder="Education" onChange={(e) => setEducation(e.target.value)} />
            <input placeholder="Skills" onChange={(e) => setSkills(e.target.value)} />
            <input placeholder="Experience" onChange={(e) => setExperience(e.target.value)} />

            <button onClick={() => setShowResume(true)}>Generate</button>

            {showResume && (
              <div className="resume">
                <h3>{rname}</h3>
                <p><b>Education:</b> {education}</p>
                <p><b>Skills:</b> {skills}</p>
                <p><b>Experience:</b> {experience}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;