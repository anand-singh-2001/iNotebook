import React, { useState } from "react";

import NoteContext from "./notesContext";
const NoteState = (props) => {
    const host = "http://localhost:5000"
    // const s1 = {
    //     name: "Anand",
    //     class: "9C"
    // }



    const initialNotes = [
        // {
        //     "_id": "641318a1fb491625ffd711231",
        //     "user": "6412d433ddebb35525eeac91",
        //     "title": "My title",
        //     "description": "Wake up",
        //     "tag": "personal",
        //     "date": "2023-03-16T13:24:49.663Z",
        //     "__v": 0
        // },
        // {
        //     "_id": "641318a1fb491625ffd721233",
        //     "user": "6412d433ddebb35525eeac91",
        //     "title": "My title",
        //     "description": "Wake up",
        //     "tag": "personal",
        //     "date": "2023-03-16T13:24:49.867Z",
        //     "__v": 0
        // },
        // {
        //     "_id": "641318a1fb491625ffd731231",
        //     "user": "6412d433ddebb35525eeac91",
        //     "title": "My title",
        //     "description": "Wake up",
        //     "tag": "personal",
        //     "date": "2023-03-16T13:24:49.663Z",
        //     "__v": 0
        // },
        // {
        //     "_id": "641318a1fb491625ffd714233",
        //     "user": "6412d433ddebb35525eeac91",
        //     "title": "My title",
        //     "description": "Wake up",
        //     "tag": "personal",
        //     "date": "2023-03-16T13:24:49.867Z",
        //     "__v": 0
        // },
        // {
        //     "_id": "641318a1fb491625ffd715231",
        //     "user": "6412d433ddebb35525eeac91",
        //     "title": "My title",
        //     "description": "Wake up",
        //     "tag": "personal",
        //     "date": "2023-03-16T13:24:49.663Z",
        //     "__v": 0
        // },
        // {
        //     "_id": "641318a1fb491625ffd716233",
        //     "user": "6412d433ddebb35525eeac91",
        //     "title": "My title",
        //     "description": "Wake up",
        //     "tag": "personal",
        //     "date": "2023-03-16T13:24:49.867Z",
        //     "__v": 0
        // }

    ]


    // const [state, setState] = useState(s1)
    // const update = () => {
    //     setTimeout(() => {
    //         setState({   Commented out for other purpose
    //             name: "Harry",
    //             class: "10C"
    //         })
    //     }, 1000);
    // }

    const [notes, setNotes] = useState(initialNotes)


    //Get all notes:
    const getNotes = async () => {
        //Backend logic: API Call
        const response = await fetch(`${host}/api/notes/fetchnotes`, { //fetching all the notes for the user.
            method: "GET",
            headers: {
                "Content-Type": "application/json", //This to be passed to get all notes from the database.
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json()
        console.log(json);
        setNotes(json) //Showing all the notes available in the database for the current user.
    }
    //Add a note:

    const addNote = async (title, description, tag) => {
        //Backend logic: API Call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json", //This to be passed to add a note database.
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag }), //Things passed as body
        });
        const note = await response.json();
        //Front-end Logic:
        setNotes(notes.concat(note)) //Adding the note received  

    }

    //Delete a note:

    //Backend logic:
    const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",  //These are the things that are to be passed in update note backend.
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json();
        console.log(json);


        //Frontend logic:
        console.log("Deleting the note with id" + id);
        const newNote = notes.filter((note) => { return note._id !== id })
        setNotes(newNote)
    }

    //Edit a note:
    const editNote = async (id, title, description, tag) => {
        //Backend logic:API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",  //These are the things that are to be passed in update note backend.
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag }),
        });
        const json = await response.json();
        console.log(json);

        //Frontend :Logic to edit in client.
        let newNote = JSON.parse(JSON.stringify(notes)) //Creates a deep copy of notes.This helps to change the content on the frontend without refreshing. Without making a copy, we need to refresh the page in order for the change to appear.

        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {  //checking if the current id matches with any of the stored item ids.
                newNote[index].title = title;
                newNote[index].description = description;
                newNote[index].tag = tag;
                break;
            }

        }
        setNotes(newNote);

    }

    return (
        // <noteContext.Provider value={{ state, update }}>  {/**The things that we need to pass is passed in value. */}
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>  {/**Anything wrapped inside the context will automatically be is passed to all the child classes */}
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;