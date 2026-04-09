const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect('mongodb+srv://mukeshdidel:Mukesh9875@fsdl.ukawszg.mongodb.net/?appName=fsdl_student')
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Routes
const studentRoutes = require('./routes/studentRoutes');
app.use('/api/students', studentRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});