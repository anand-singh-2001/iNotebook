const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router()
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator'); //validator used to perform validation checks.


//Route 1: Fetching all the notes from the database for the user using GET.Login required.
router.get('/fetchnotes', fetchuser, async (req, res) => { //fetchuser middleware is used as login is required here.
    try {
        const notes = await Notes.find({ user: req.user.id }) //getting all the notes for the user logged in.
        res.json(notes)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error")
    }

}
)

//Route 2: Adding a new note using POST. Login required.
router.post('/addnote', fetchuser, [  //fetchuser middleware is used as login is required here.
    body('title', 'Enter a valid title').isLength({ min: 3 }),  //checks and validation messages
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),

], async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Notes({ title, description, tag, user: req.user.id })
        const savedNote = await note.save()

        res.json(savedNote)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error")

    }

}
)

//Route 3: Update an existing note using PUT. Login required.

router.put('/updatenote/:id', fetchuser, async (req, res) => {  //fetchuser middleware is used as login is required here./:id is used to specify that only the user with the respective id can update their note.
    try {
        const { title, description, tag } = req.body;
        //Create a newnote object:
        const newnote = {}
        if (title) { newnote.title = title }
        if (description) { newnote.description = description }  //Update the different fields of note if entered/available.
        if (tag) { newnote.tag = tag }

        //Find the note to be updated and update it.
        let note = await Notes.findById(req.params.id) //This is the id mentioned above,i.e, the id of the user whose note is to be updated.
        if (!note) {
            return res.status(404).send("Not found")
        }
        if (note.user.toString() !== req.user.id) { //.toSting() gives the id of the note that is being accessed, here if the note's id is not equal to the id of the user logged in.
            return res.status(401).send("Wrong entry")

        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true })
        res.json({ note })

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error")

    }

}
)

//Route 4: Delete an existing note using DELETE. Login required.

router.delete('/deletenote/:id', fetchuser, async (req, res) => {  //fetchuser middleware is used as login is required here./:id is used to aceept the id of the note.
    try {
        //Find the note to be deleted and delete it.
        let note = await Notes.findById(req.params.id) //This is the id mentioned above,i.e, the id of the user whose note is to be deleted.
        if (!note) {
            return res.status(404).send("Not found")
        }

        //Allow deletion only if user ownes this note.
        if (note.user.toString() !== req.user.id) { //.toSting() gives the id of the note that is being accessed, here if the note's id is not equal to the id of the user logged in.
            return res.status(401).send("Wrong entry")

        }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note })
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error")

    }


}
)




module.exports = router;