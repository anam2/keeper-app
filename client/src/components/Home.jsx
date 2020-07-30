import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Grid,
  CssBaseline,
  Avatar,
} from "@material-ui/core";
import HighlightIcon from "@material-ui/icons/Highlight";

import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";

function Home() {
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
      axios.get("/api/user").then((response) => {
        setUsers([...response.data]);
      }, 1000);
    });
  }, []);

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
    console.log(users);
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
      {/* Material UI */}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <form className="signInArea">
          <Avatar>
            <HighlightIcon />
          </Avatar>
          <h1>Sign In</h1>
          <TextField
            autoFocus
            fullWidth
            label="Username"
            margin="normal"
            name="username"
            onChange={handleChange}
            required
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Password"
            margin="normal"
            name="password"
            onChange={handleChange}
            required
            type="password"
            variant="outlined"
          />
          <Button fullWidth variant="contained" onClick={logIn}>
            Sign In
            {redirect ? <Redirect to={"/note/" + currentUserId} /> : null}
          </Button>
          {correctLogin ? null : (
            <p className="loginInfo">
              The account may have not been created or your login information is
              not correct. Please try again!
            </p>
          )}
          <Grid container>
            <Grid item>
              <a href="/create">{"Don't have an account? Sign up!"}</a>
            </Grid>
          </Grid>
        </form>
      </Container>
      <Footer />
    </div>
  );
}

export default Home;
