const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json()); 
// 📚 Book Database (in-memory)
let books = [
  { id: 1, title: "The Alchemist", author: "Paulo Coelho" },
  { id: 2, title: "Atomic Habits", author: "James Clear" }
];

// ✅ GET all books
app.get("/books", (req, res) => {
  res.json({
    success: true,
    count: books.length,
    data: books
  });
});

// ✅ GET single book
app.get("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book not found"
    });
  }

  res.json({
    success: true,
    data: book
  });
});

// ✅ POST add new book
app.post("/books", (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({
      success: false,
      message: "Title and Author required"
    });
  }

  const newBook = {
    id: books.length + 1,
    title,
    author
  };

  books.push(newBook);

  res.status(201).json({
    success: true,
    message: "Book added successfully",
    data: newBook
  });
});

// ✅ PUT update book
app.put("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title, author } = req.body;

  const book = books.find(b => b.id === id);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book not found"
    });
  }

  book.title = title || book.title;
  book.author = author || book.author;

  res.json({
    success: true,
    message: "Book updated successfully",
    data: book
  });
});

// ✅ DELETE book
app.delete("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const bookExists = books.some(b => b.id === id);

  if (!bookExists) {
    return res.status(404).json({
      success: false,
      message: "Book not found"
    });
  }

  books = books.filter(b => b.id !== id);

  res.json({
    success: true,
    message: "Book deleted successfully"
  });
});

// 🚀 Start server
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});