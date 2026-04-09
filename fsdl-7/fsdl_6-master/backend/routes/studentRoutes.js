const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// CREATE
router.post('/add', async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.json(student);
    } catch (err) {
        res.status(500).json(err);
    }
});

// READ
router.get('/', async (req, res) => {
    const students = await Student.find();
    res.json(students);
});

// UPDATE
router.put('/update/:rollNo', async (req, res) => {
    const student = await Student.findOneAndUpdate(
        { rollNo: req.params.rollNo },
        req.body,
        { new: true }
    );
    res.json(student);
});

// DELETE
router.delete('/delete/:rollNo', async (req, res) => {
    await Student.findOneAndDelete({ rollNo: req.params.rollNo });
    res.json({ message: "Deleted successfully" });
});

module.exports = router;