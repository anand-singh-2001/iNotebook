import React from 'react'
import NoteContext from '../Context/notes/notesContext';
import { useContext } from 'react'


const Noteitem = (props) => {
    const context = useContext(NoteContext);  //We have to delete the specific note from the context therefore it is imported and initialised.
    const { deleteNote } = context; //deleteNote is destructured from context.
    const { note, update } = props;
    return (
        <div className="col-md-3">

            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                        <i className="fa-sharp fa-solid fa-trash mx-2" onClick={() => { deleteNote(note._id); props.showAlert("Note deleted successfully", "success") }}></i>
                        <i className="fa-solid fa-pen-to-square mx-2 " onClick={() => { update(note) }}></i>
                    </div>

                    <p className="card-text">{note.description}</p>

                </div>
            </div>
        </div>
    )
}

export default Noteitem
