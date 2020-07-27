import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import CreateArea from "./CreateArea";
import Note from "./Note";

function NoteDashboard(props) {
  // Gets userID from the paramter
  const userId = props.match.params.id;
  const [currentNotes, setCurrentNotes] = useState([
    {
      title: "",
      content: "",
    },
  ]);

  //  Gets user information from db
  useEffect(() => {
    setTimeout(() => {
      axios.get("http://localhost:5000/user/").then((response) => {
        const currentUser = response.data.find((user) => user._id === userId);
        const currentTodoList = currentUser.todoList;
        setCurrentNotes(currentTodoList);
      }, 1000);
    });
  }, [userId]);

  // Deletes Note
  function deleteNote(currentUserId, currentNoteId) {
    axios
      .delete(
        "http://localhost:5000/user/delete/" +
          currentUserId +
          "/" +
          currentNoteId
      )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
    window.location.reload();
  }

  return (
    <div>
      <Header />
      <CreateArea id={userId} key={userId} />
      {currentNotes.map((note, index) => {
        return (
          <Note
            key={index}
            userId={userId}
            noteId={note._id}
            title={note.title}
            content={note.content}
            deleteNote={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default NoteDashboard;
