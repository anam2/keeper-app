import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });
  const [isExpanded, setIsExpanded] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setNote((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  function handleClick(e) {
    setNote(() => {
      return {
        title: "",
        content: "",
      };
    });
    e.preventDefault();
    props.onAdd(note);

    setIsExpanded(false);
  }

  function changeExpanded() {
    setIsExpanded(true);
  }

  return (
    <div>
      <form>
        {isExpanded ? (
          <input
            onChange={handleChange}
            name="title"
            placeholder="Title"
            value={note.title}
          />
        ) : null}

        <textarea
          onChange={handleChange}
          name="content"
          placeholder="Take a note..."
          rows="3"
          value={note.content}
          onClick={changeExpanded}
        />

        {isExpanded ? (
          <button onClick={handleClick}>
            <span>
              <AddIcon />
            </span>
          </button>
        ) : null}
      </form>
    </div>
  );
}

export default CreateArea;
