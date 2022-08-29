import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";

  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  //get all notes
  const getAllNotes = async () => {
    //TODO Api note
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMGEwNzVjYzQyN2Y2ZmZmZDBiYTVjZSIsImlhdCI6MTY2MTYwMzcxMX0.Y3IgIFraXFvZYJqaiJ4EfJD07xGKP0eOHl8ngGJNiWI",
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  //add a note
  const addNote = async (title, description, tag) => {
    //TODO Api note
    await fetch(`${host}/api/notes/addnote`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMGEwNzVjYzQyN2Y2ZmZmZDBiYTVjZSIsImlhdCI6MTY2MTYwMzcxMX0.Y3IgIFraXFvZYJqaiJ4EfJD07xGKP0eOHl8ngGJNiWI",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    //updating the front end
    getAllNotes();
  };

  //delete a note
  const deleteNote = async (id) => {
    //TODO Api note
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMGEwNzVjYzQyN2Y2ZmZmZDBiYTVjZSIsImlhdCI6MTY2MTYwMzcxMX0.Y3IgIFraXFvZYJqaiJ4EfJD07xGKP0eOHl8ngGJNiWI",
      },
    });
    const json = await response.json();
    setNotes(json);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //upate a note
  const editNote = async (id, title, description, tag) => {
    //API fetch
    await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMGEwNzVjYzQyN2Y2ZmZmZDBiYTVjZSIsImlhdCI6MTY2MTYwMzcxMX0.Y3IgIFraXFvZYJqaiJ4EfJD07xGKP0eOHl8ngGJNiWI",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    //to update the front end
    getAllNotes();
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getAllNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
