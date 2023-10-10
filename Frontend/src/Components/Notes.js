import React from 'react'
import { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../Context/notes/notesContext';
import AddNote from './AddNote';
import Noteitem from './Noteitem';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    const context = useContext(NoteContext);
    const { notes, getNotes, editNote } = context;
    let navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem('token')) { //if token exists ,i.e, if login is successful only then show the notes.
            getNotes()
        }
        else {
            navigate("/login")
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); //effect applied only once.

    const ref = useRef(null)  //useRef hook is used to give reference to a specific DOM element. Here set to launch demo model button.
    const refClose = useRef(null)


    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "default" }) //edited values.
    const handleClick = (e) => {
        console.log("Updating the note", note);

        editNote(note.id, note.etitle, note.edescription, note.etag) //editing the note in backend.
        refClose.current.click();// reference is set to the close button.
        props.showAlert("Updated successfully", "success")
        // addNote(note.title, note.description, note.tag) //Adding the new note.
    }

    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value }) //Changes the contents as we type it.
    }
    //Update note:
    const update = (currentNote) => {

        ref.current.click()
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })

    }
    return (
        <>
            <AddNote showAlert={props.showAlert} />
            {/* <!-- Button trigger modal --> */}
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">  {/*d-none className stands for display none*/}
                Launch demo modal
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" value={note.etitle} name="etitle" aria-describedby="emailHelp" onChange={handleChange} minLength={5} required />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" value={note.edescription} name="edescription" onChange={handleChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" value={note.etag} name="etag" onChange={handleChange} />
                                </div>



                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h1>Your notes</h1>
                {notes.length === 0 ? <div className="container"> NO NOTES TO DISPLAY</div> : notes.map((note) => {
                    return <Noteitem key={note._id} update={update} showAlert={props.showAlert} note={note} />
                })}
            </div>
        </>
    )
}


export default Notes
