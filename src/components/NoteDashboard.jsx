import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import CreateArea from "./CreateArea";
import Note from "./Note";

function NoteDashboard(props) {
  const [notes, setNotes] = useState([]);

  // Receives data from backend
  // Equivilent to componendDidMount componentDidUpdate
  // Adding [] at the end makes it act like componentDidMount, runs only once
  useEffect(() => {
    setTimeout(() => {
      axios.get("http://localhost:5000/list/").then((response) => {
        setNotes([...response.data]);
      }, 1000);
    });
  }, []);

  function deleteNote(id) {
    axios
      .delete("http://localhost:5000/list/" + id)
      .then((res) => console.log(res.data));

    // Need to refresh page in order to display deleted item from homepage
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });

    window.location.reload();
  }

  return (
    <div>
      <Header />
      <CreateArea />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            _id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default NoteDashboard;

// export default class NoteDashboard extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {};
//   }

//   render() {
//     return (
//       <div>
//         <Header />
//         <CreateArea />
//         <Note />
//         <Footer />
//       </div>
//     );
//   }
// }
