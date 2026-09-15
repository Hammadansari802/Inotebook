const express = require("express");
const Notes = require("../models/Note");
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

// Route 1: Get all notes using: GET "/api/notes". Login required

    router.get("/fetchallnotes", fetchuser, async (req, res) => {
        // Fetch all notes for the logged-in user
        try {
            const notes = await Notes.find({ user: req.user.id });
            res.json(notes);
        }
        // Handle any errors that occur during the database query
         catch (error) {
            console.error("Error fetching notes:", error.message);
            res.status(500).send("Internal Server Error");
        }
    });

// Route 2: Add a new note using: POST "/api/addnote". Login required
     router.post("/addnote",  [
         body("title","Enter a valid title").isLength({min:3}),
         body("description","Enter a valid description").isLength({min:5})
    ],fetchuser, async (req, res) => {

        try {
            // If there are errors, return Bad request and the errors

        const { title, description, tag } = req.body;
         const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const  notes = new Notes({
        title, description, tag, user: req.user.id
    })
    const savednotes = await notes.save()
    res.json(savednotes) 
        } catch (error) {
            console.error("Error adding note:", error.message);
            res.status(500).send("Internal Server Error");
        }
       
     })
    //  Route 3: Update an existing note using: PUT "/api/updatenote/:id". Login required
     router.put("/updatenote/:id", fetchuser, async (req, res) => {
        // create a new note object
        const { title, description, tag } = req.body;
        const newNote = {}
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};
        // Find the note to be updated and update it
        let note = await Notes.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found")}
        // Allow update only if user owns this note
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }
        // Update the note in the database
        // ✅ Correct Syntax:
          note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { returnDocument: 'after' });
        res.json({note});
        

     })

     //  Route 4: Delete an existing note using: DELETE "/api/deletenote/:id". Login required
     router.delete("/deletenote/:id", fetchuser, async (req, res) => {

        try {
             // Find the note to be deleted and update it
        let note = await Notes.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found")}

        // Allow deletion only if user owns this note
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }
        // Update the note in the database
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({"success":"note has been deleted", note: note});
        

     
            
        } catch (error) {
            console.error("Error deleting note:", error.message);
            res.status(500).send("Internal Server Error");
        }
})
       

module.exports = router;