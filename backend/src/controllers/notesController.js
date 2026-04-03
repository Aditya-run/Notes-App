const Note = require("../models/notes");

// CREATE NOTE
const createNote = async (req, res) => {
    try {
        const { title, description } = req.body;

        const note = await Note.create({
            title,
            description,
            userId: req.userId   // from middleware
        });

        res.status(201).json(note);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error creating note" });
    }
};

// GET ALL NOTES (only logged-in user)
const getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.userId });

        res.status(200).json(notes);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching notes" });
    }
};

// UPDATE NOTE
const updateNote = async (req, res) => {
    try {
        const { id } = req.params;

        const note = await Note.findOneAndUpdate(
            { _id: id, userId: req.userId }, // security
            req.body,
            { new: true }
        );

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.json(note);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error updating note" });
    }
};

// DELETE NOTE
const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;

        const note = await Note.findOneAndDelete({
            _id: id,
            userId: req.userId
        });

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.json({ message: "Note deleted successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error deleting note" });
    }
};

module.exports = {
    createNote,
    getNotes,
    updateNote,
    deleteNote
};