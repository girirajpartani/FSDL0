import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API = "http://localhost:3000/books";

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  // 🔹 Get Books
  const getBooks = async () => {
    const res = await axios.get(API);
    setBooks(res.data.data);
  };

  useEffect(() => {
    getBooks();
  }, []);

  // 🔹 Add Book
  const addBook = async () => {
    if (!title || !author) return alert("Enter all fields");

    await axios.post(API, { title, author });
    setTitle("");
    setAuthor("");
    getBooks();
  };

  // 🔹 Delete Book
  const deleteBook = async (id) => {
    await axios.delete(`${API}/${id}`);
    getBooks();
  };

  return (
    <div className="container">
      <h1>📚 Book Management</h1>

      <div className="card">
        <input
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <button onClick={addBook}>Add Book</button>

        <div className="list">
          {books.map((book) => (
            <div className="book" key={book.id}>
              <b>{book.title}</b>
              <p>{book.author}</p>
              <button onClick={() => deleteBook(book.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;