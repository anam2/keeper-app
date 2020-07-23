import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";

function Note(props) {
  function handleOnDelete() {
    props.onDelete(props._id);
  }
  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleOnDelete}>
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Note;
