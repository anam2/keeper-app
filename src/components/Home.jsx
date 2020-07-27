import React, { useState, useEffect } from "react";
import { useHistory, Redirect } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";

function Home() {
  const history = useHistory();

  const [redirect, setRedirect] = useState(false);
  const [users, setUsers] = useState([]);
  const [userInput, setUserInput] = useState({
    username: "",
    password: "",
  });
  const [currentUserId, setCurrentUserId] = useState();

  // Get's list of users from db
  useEffect(() => {
    setTimeout(() => {
      axios.get("http://localhost:5000/user").then((response) => {
        setUsers([...response.data]);
      }, 1000);
    });
  }, []);

  // Redirects to create page
  function handleClick() {
    history.push("./create");
  }

  // Updates react hook with user inputted values
  function handleChange(e) {
    const { name, value } = e.target;

    setUserInput((prevInfo) => {
      return {
        ...prevInfo,
        [name]: value,
      };
    });
  }

  // Checking to see if current user's log info exists in db
  function logIn(e) {
    e.preventDefault();
    const currentUser = users.find(
      (users) => users.username === userInput.username
    );
    setCurrentUserId(currentUser._id);
    console.log(currentUserId);
    if (!currentUser) {
      console.log("The Username was not found. Please try again");
    } else {
      if (currentUser.password === userInput.password) {
        setRedirect(true);
      } else {
        console.log("The password is incorrect");
      }
    }
  }

  return (
    <div>
      <Header />
      <h1>Welcome to Andy's Keeper App</h1>
      <form>
        <input
          name="username"
          placeholder="Enter your Username"
          onChange={handleChange}
        />
        <input
          name="password"
          placeholder="Enter your Password"
          onChange={handleChange}
        />
        <div className="userLogin">
          <button onClick={handleClick}>Create Account</button>
          <button onClick={logIn}>
            Log In
            {redirect ? <Redirect to={"/note/" + currentUserId} /> : null}
          </button>
        </div>
      </form>
      <Footer />
    </div>
  );
}

export default Home;
