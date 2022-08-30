import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

export const NoteItem = (props) => {
  //using context to delete note
  const context = useContext(noteContext);
  const { deleteNote } = context;

  //destructuring the props
  const { note, setEditNote } = props;

  //function to handle click on the delete icon
  const handleDeleteClick = () => {
    deleteNote(note._id);
    props.showAlert("Note was successfully deleted!", "success");
  };

  //function to handle click on the edit icon
  const returnNoteToEdit = () => {
    setEditNote(note);
  };

  return (
    <div className="col-md-3">
      <div className="card my-3" style={{ maxWidth: "18rem" }}>
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <i className="fa fa-trash mx-2" aria-hidden="true" onClick={handleDeleteClick}></i>
            <i
              className="fa fa-pencil mx-2"
              aria-hidden="true"
              data-bs-toggle="modal"
              data-bs-target="#myModal"
              onClick={returnNoteToEdit}
            ></i>
          </div>
          <p className="card-text">{note.description}</p>

          {/* <a href="/" className="btn btn-primary">
            Go somewhere
          </a> */}
        </div>
      </div>
    </div>
  );
};
