const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//ROUTE 1: Get all the notes using : GET "/api/notes/fetchallnotes". Require login
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error);
    res.status(500).send("Interval server error!");
  }
});

//ROUTE 2: Add a new note using : POST "/api/notes/addnote". Require login
router.post(
  "/addnote",
  fetchuser,
  [
    //adding some checks on the attributes of notes
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //if there is any error in validation send this
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.log(error);
      res.status(500).send("Interval server error!");
    }
  }
);

//ROUTE 3: Update an existing note using : PUT "/api/notes/updatenote". Require login
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    //create a new note object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //find the note to update
    let note = await Notes.findById(req.params.id);
    //if note is not found
    if (!note) {
      return res.status(404).send("Not Found");
    }

    //if another user tries to update someone else notes
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Unauthorized");
    }

    //if note is successfully found
    note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
    res.json({ note });
  } catch (error) {
    console.log(error);
    res.status(500).send("Interval server error!");
  }
});

//ROUTE 4: Delete note using : DELETE "/api/notes/deletenote". Require login
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    //find the note to be deleted
    let note = await Notes.findById(req.params.id);
    //if note is not found
    if (!note) {
      return res.status(404).send("Not Found");
    }

    //if another user tries to delete someone else notes
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Unauthorized");
    }

    //if note is successfully found
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Interval server error!");
  }
});

module.exports = router;
