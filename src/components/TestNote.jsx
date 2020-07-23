import React, { Component } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";

// ISSUES
// I think it's currently rerendering the page, using hooks doesn't rerender the page.

const CurrentNote = (props) => (
  <div className="note">
    <h1>{props.note.title}</h1>
    <p>{props.note.content}</p>
    <button
      onClick={() => {
        props.deleteNote(props.note._id);
      }}
    >
      <DeleteIcon />
    </button>
  </div>
);

export default class Note extends Component {
  constructor(props) {
    super(props);
    this.state = { lists: [] };
    this.deleteNote = this.deleteNote.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/list/")
      .then((response) => {
        this.setState({ lists: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteNote(id) {
    axios
      .delete("http://localhost:5000/list/" + id)
      .then((res) => console.log(res.data));

    this.setState({
      lists: this.state.lists.filter((el) => el._id !== id),
    });

    window.location.reload();
  }

  todoList() {
    return this.state.lists.map((listItem) => {
      return (
        <CurrentNote
          note={listItem}
          key={listItem._id}
          deleteNote={this.deleteNote}
        />
      );
    });
  }

  render() {
    return <div>{this.todoList()}</div>;
  }
}
