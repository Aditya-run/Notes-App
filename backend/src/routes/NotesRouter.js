const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
    createNote,
    getNotes,
    updateNote,
    deleteNote
} = require("../controllers/noteController");

// CREATE
router.post("/add", auth, createNote);

// READ
router.get("/", auth, getNotes);

// UPDATE
router.put("/:id", auth, updateNote);

// DELETE
router.delete("/:id", auth, deleteNote);

module.exports = router;