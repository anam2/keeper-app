import React, { useState, useEffect } from "react";
import { useHistory, Redirect } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";

function Home() {
  const history = useHistory();

  const [correctLogin, setCorrectLogin] = useState(true);
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

    // User does not exist
    if (!currentUser) {
      setCorrectLogin(false);
      return;
    } else if (currentUser.password === userInput.password) {
      setCurrentUserId(currentUser._id);
      setRedirect(true);
    } else {
      // User information doesn't match what's in DB
      setCorrectLogin(false);
      return;
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
          type="password"
        />
        <div className="userLogin">
          <button onClick={handleClick}>Create Account</button>
          <button onClick={logIn}>
            Log In
            {redirect ? <Redirect to={"/note/" + currentUserId} /> : null}
          </button>
        </div>
      </form>
      {correctLogin ? null : (
        <p className="loginInfo">
          The account may have not been created or your login information is not
          correct. Please try again!
        </p>
      )}
      <Footer />
    </div>
  );
}

export default Home;
