import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Notes() {
  // Step 1: Store the list of notes and new note inputs
  const [notes, setNotes]       = useState([]);
  const [title, setTitle]       = useState("");
  const [description, setDesc]  = useState("");
  const [message, setMessage]   = useState("");

  const navigate = useNavigate();

  // Step 2: Get the token we saved during login
  const token = localStorage.getItem("token");

  // Step 3: This runs automatically when the page loads
  useEffect(() => {
    fetchNotes();
  }, []);

  // Step 4: GET all notes from backend
  async function fetchNotes() {
    try {
      const response = await api.get("/notes", {
        headers: {
          Authorization: "Bearer " + token, // Send token so backend knows who we are
        },
      });

      setNotes(response.data); // Save notes in state

    } catch (error) {
      setMessage("Could not load notes. Please login again.");
      console.log(error);
    }
  }

  // Step 5: POST a new note to backend
  async function handleAddNote() {
    if (!title) {
      setMessage("Please enter a title.");
      return;
    }

    try {
      await api.post(
        "/notes/add",
        {
          title: title,
          description: description,
        },
        {
          headers: {
            Authorization: "Bearer " + token, // Always send token
          },
        }
      );

      // Clear the input fields
      setTitle("");
      setDesc("");
      setMessage("Note added!");

      // Reload notes to show the new one
      fetchNotes();

    } catch (error) {
      setMessage("Failed to add note.");
      console.log(error);
    }
  }

  // Step 6: DELETE a note by its id
  async function handleDelete(id) {
    try {
      await api.delete("/notes/" + id, {
        headers: {
          Authorization: "Bearer " + token, // Always send token
        },
      });

      setMessage("Note deleted.");

      // Reload notes after deletion
      fetchNotes();

    } catch (error) {
      setMessage("Failed to delete note.");
      console.log(error);
    }
  }

  // Step 7: Logout — clear token and go to login page
  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div style={{ maxWidth: "600px", margin: "30px auto", padding: "20px" }}>

      {/* Top bar */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>My Notes</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {/* Show message if any */}
      {message && <p style={{ color: "green" }}>{message}</p>}

      <hr />

      {/* Add Note Form */}
      <h4>Add New Note</h4>
      <label>Title</label><br />
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Note title"
      /><br /><br />

      <label>Description</label><br />
      <textarea
        value={description}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Note description"
        rows="3"
      /><br /><br />

      <button onClick={handleAddNote}>Add Note</button>

      <hr />

      {/* Notes List */}
      <h4>All Notes</h4>

      {/* If no notes, show a message */}
      {notes.length === 0 && <p>No notes found. Add one above!</p>}

      {/* Loop through notes and show each one */}
      {notes.map((note) => (
        <div
          key={note._id}
          style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}
        >
          <strong>{note.title}</strong>
          <p>{note.description}</p>
          <button onClick={() => handleDelete(note._id)}>Delete</button>
        </div>
      ))}

    </div>
  );
}

export default Notes;
