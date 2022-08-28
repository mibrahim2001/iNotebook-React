import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import { NoteItem } from "./NoteItem";

export const Notes = () => {
  const context = useContext(noteContext);
  const { notes, setNotes } = context;
  return (
    <div className="row my-3">
      <h1>Yours notes</h1>
      {notes.map((note) => {
        return <NoteItem note={note} />;
      })}
    </div>
  );
};
