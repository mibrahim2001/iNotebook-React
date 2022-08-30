import React, { useContext, useEffect, useState } from "react";
import noteContext from "../context/notes/noteContext";
import { NoteItem } from "./NoteItem";
import { AddNote } from "./AddNote";
import { Modal } from "./Modal";
import { useNavigate } from "react-router-dom";

export const Notes = (props) => {
  //using context to get all the notes
  const context = useContext(noteContext);
  const { notes, getAllNotes } = context;

  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getAllNotes();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  //making a use state to pass the note to edit to the modal component as a prop
  const [editNote, setEditNote] = useState({ _id: "", title: "", description: "", tag: "default" });

  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <Modal editNote={editNote} showAlert={props.showAlert} />
      <div className="row my-3">
        <h1>Yours notes</h1>
        {/* adding all our notes as note item components */}
        {notes.map((note) => {
          return <NoteItem key={note._id} note={note} setEditNote={setEditNote} showAlert={props.showAlert} />;
        })}
      </div>
    </>
  );
};
