import React, { useContext, useEffect, useState } from "react";
import noteContext from "../context/notes/noteContext";
import { NoteItem } from "./NoteItem";
import { AddNote } from "./AddNote";
import { Modal } from "./Modal";

export const Notes = () => {
  //using context to get all the notes 
  const context = useContext(noteContext);
  const { notes, getAllNotes } = context;
  useEffect(()=>{
    getAllNotes();
    // eslint-disable-next-line
  },[]);

  //making a use state to pass the note to edit to the modal component as a prop
 const [editNote, setEditNote] = useState({_id:"",title:"",description:"", tag:"default"});

  return (
    <>
      <AddNote />
      <Modal editNote={editNote} />
      <div className="row my-3">
        <h1>Yours notes</h1>
        {/* adding all our notes as note item components */}
        {notes.map((note) => {
          return <NoteItem key={note._id} note={note} setEditNote={setEditNote} />;
        })}
      </div>
    </>
  );
};
