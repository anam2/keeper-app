import React, { useState } from "react";
import axios from "axios";
import Popup from "reactjs-popup";
import DeleteIcon from "@material-ui/icons/Delete";
import { TextField, Button } from "@material-ui/core";

function Note(props) {
  const [editNote, setEditNote] = useState({
    editTitle: "",
    editContent: "",
  });

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

  function handleOnEdit(e) {
    const { name, value } = e.target;
    setEditNote((prevInfo) => {
      return {
        ...prevInfo,
        [name]: value,
      };
    });
  }

  // Edits data in mongoDB
  function handleOnClickEdit() {
    const userId = props.userId;
    const noteId = props.noteId;

    props.onEdit(props.noteId, props.index, editNote);

    setEditNote({
      editTitle: "",
      editContent: "",
    });
    axios.post("/user/edit/" + userId + "/" + noteId, editNote);
  }

  return (
    <div className="note">
      <h2>{props.title}</h2>
      <p>{props.content}</p>
      <button onClick={handleOnDelete}>
        <DeleteIcon />
      </button>
      <Popup trigger={<button>Edit</button>}>
        <div>
          <label>Title</label>
          <TextField
            fullWidth
            label={props.title}
            name="editTitle"
            onChange={handleOnEdit}
          />
          <label>Content</label>
          <TextField
            fullWidth
            label={props.content}
            name="editContent"
            onChange={handleOnEdit}
          />
          <Button onClick={handleOnClickEdit}>Submit</Button>
        </div>
      </Popup>
    </div>
  );
}

export default Note;
