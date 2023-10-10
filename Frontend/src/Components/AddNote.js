import React, { useState } from "react";
import NoteContext from "../Context/notes/notesContext";
import { useContext } from "react";

const AddNote = (props) => {
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag); //Adding the new note.
    setNote({ title: "", description: "", tag: "" }); //Setting the fields blank once the submit button is clicked.
    props.showAlert("Note added successfully", "success");
  };

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value }); //Changes the contents as we type it.
  };
  const context = useContext(NoteContext); //Using the context imported.
  const { addNote } = context;
  return (
    <div className="container my-2">
      <h1>Add a note</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            onChange={handleChange}
            value={note.title}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={handleChange}
            value={note.description}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            onChange={handleChange}
            value={note.tag}
            minLength={5}
            required
          />
        </div>

        <button
          disabled={note.title.length < 5 || note.description.length < 5}
          type="submit"
          className="btn btn-primary"
          onClick={handleClick}>
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
