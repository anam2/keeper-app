import React, { useState } from "react";
import axios from "axios";
import AddIcon from "@material-ui/icons/Add";

function CreateArea(props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const [note, setNote] = useState({
    id: "",
    title: "",
    content: "",
  });

  // Updating hooks when user types
  function handleChange(e) {
    const { name, value } = e.target;
    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
        id: props.id,
      };
    });
  }

  // Posting note to db
  function submitNote(e) {
    // Clears user's title and content after user clicks submit button
    setNote({
      id: "",
      title: "",
      content: "",
    });
    // Posts user with new todoList
    axios.post("/api/user/update", note).then((res) => console.log(res.data));
  }

  function expand() {
    setIsExpanded(true);
  }

  return (
    <div>
      <form className="createArea">
        {isExpanded ? (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        ) : null}
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows="3"
          onClick={expand}
        />
        {isExpanded ? (
          <button onClick={submitNote}>
            <AddIcon />
          </button>
        ) : null}
      </form>
    </div>
  );
}

export default CreateArea;
