import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";

function Note(props) {
  function handleOnDelete() {
    props.deleteNote(props.userId, props.noteId);
  }
  return (
    <div className="note">
      <h2>{props.title}</h2>
      <p>{props.content}</p>
      <button onClick={handleOnDelete}>
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Note;
