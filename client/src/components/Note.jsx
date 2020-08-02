import React from "react";
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";

function Note(props) {
  function handleOnDelete() {
    const userId = props.userId;
    const noteId = props.noteId;
    axios
      .delete("/user/delete/" + userId + "/" + noteId)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
    props.deleteNote(props.index);
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
