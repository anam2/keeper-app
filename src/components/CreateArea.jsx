import React, { useState } from "react";
import axios from "axios";
import AddIcon from "@material-ui/icons/Add";

function CreateArea(props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function submitNote(e) {
    // Clears user's title and content after user clicks submit button
    setNote({
      title: "",
      content: "",
    });
    axios
      .post("http://localhost:5000/list/add", note)
      .then((res) => console.log(res.data));
  }

  function expand() {
    setIsExpanded(true);
  }

  return (
    <div>
      <form>
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

// export default class CreateArea extends Component {
//   constructor(props) {
//     super(props);

//     this.onChangeTitle = this.onChangeTitle.bind(this);
//     this.onChangeContent = this.onChangeContent.bind(this);
//     this.handleExpandedClick = this.handleExpandedClick.bind(this);
//     this.handleNotExpandedClick = this.handleNotExpandedClick.bind(this);

//     this.state = {
//       title: "",
//       content: "",
//       isExpanded: false,
//     };
//   }
//   // Handles expanding title and button when user clicks note content
//   handleExpandedClick() {
//     this.setState({ isExpanded: true });
//   }

//   handleNotExpandedClick() {
//     this.setState({ isExpanded: false });
//   }

//   onChangeTitle(e) {
//     this.setState({
//       title: e.target.value,
//     });
//   }

//   onChangeContent(e) {
//     this.setState({
//       content: e.target.value,
//     });
//   }

//   onSubmit(e) {
//     e.preventDefault();

//     const newListItem = {
//       title: this.state.title,
//       content: this.state.content,
//     };

//     console.log(newListItem);

//     // Post request to backend
//     axios
//       .post("http://localhost:5000/list/add", newListItem)
//       .then((res) => console.log(res.data));

//     window.location = "/";
//   }

//   render() {
//     const isExpanded = this.state.isExpanded;
//     return (
//       <div>
//         <form>
//           {isExpanded ? (
//             <input
//               onChange={this.onChangeTitle}
//               name="title"
//               placeholder="Title"
//               value={this.state.title}
//             />
//           ) : null}

//           <textarea
//             onChange={this.onChangeContent}
//             name="content"
//             placeholder="Take a note..."
//             rows="3"
//             value={this.state.content}
//             onClick={this.handleExpandedClick}
//           />

//           {isExpanded ? (
//             <button onClick={this.onSubmit.bind(this)}>
//               <span>
//                 <AddIcon />
//               </span>
//             </button>
//           ) : null}
//         </form>
//       </div>
//     );
//   }
// }
