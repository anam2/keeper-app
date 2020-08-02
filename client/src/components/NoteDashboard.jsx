import React, { useState } from "react";
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

  // Gets user information from DB
  useState(() => {
    axios.get("/user").then((response) => {
      const currentUser = response.data.find((user) => user._id === userId);
      const currentTodoList = currentUser.todoList;
      setCurrentNotes(currentTodoList);
    });
  }, [userId]);

  // Adds new Note to currentNotes
  function addNote(newNote) {
    setCurrentNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
  }

  // Deletes Note
  function deleteNote(noteIndex) {
    setCurrentNotes((prevNotes) => {
      return prevNotes.filter((note, index) => {
        return index !== noteIndex;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea id={userId} key={userId} onAdd={addNote} />
      {currentNotes.map((note, index) => {
        return (
          <Note
            key={index}
            userId={userId}
            noteId={note._id}
            index={index}
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
