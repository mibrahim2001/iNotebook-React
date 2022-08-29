import React, { useContext, useEffect, useState } from "react";
import noteContext from "../context/notes/noteContext";

export const Modal = (props) => {
  //destructuring the edit note prop we get from Notes.js
  const { _id, title, description, tag } = props.editNote;

  //using context to edit the note
  const context = useContext(noteContext);
  const { editNote } = context;

  //adding a usestate to make a new note that will be used to add new title, description, and tag to
  //the note we want to edit
  const [note, setNote] = useState({ etitle: "title", edescription: "description", etag: "tag" });

  //using use effect to set the title decsription and tag of the modal fields
  useEffect(() => {
    setNote({ etitle: title, edescription: description, etag: tag });
    // eslint-disable-next-line
  }, [props.editNote]);

  const handleSaveChangesClick = () => {
    editNote(_id, note.etitle, note.edescription, note.etag);
  };

  const handleOnChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="modal fade" id="myModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div>
                <h1>Edit note below:</h1>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    onChange={handleOnChange}
                  ></input>
                  <label htmlFor="description" className="form-label">
                    Description:
                  </label>
                  <textarea
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    rows="3"
                    value={note.edescription}
                    onChange={handleOnChange}
                  ></textarea>
                  <label htmlFor="title" className="form-label">
                    Tag:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={handleOnChange}
                  ></input>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button
                disabled={note.etitle.length < 3 || note.edescription.length < 5}
                type="button"
                className="btn btn-primary"
                onClick={handleSaveChangesClick}
                data-bs-dismiss="modal"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
