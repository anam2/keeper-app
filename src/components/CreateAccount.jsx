import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import {
  Container,
  CssBaseline,
  Avatar,
  TextField,
  Button,
} from "@material-ui/core";
import HighlightIcon from "@material-ui/icons/Highlight";

function CreateAccount() {
  const history = useHistory();
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [matchingPassword, setMatchingPassword] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setUser((prevInfo) => {
      return {
        ...prevInfo,
        [name]: value,
      };
    });
  }

  function comparePassword(e) {
    const { value } = e.target;
    setConfirmPassword(value);

    if (confirmPassword === user.password) {
      setMatchingPassword(true);
    } else {
      setMatchingPassword(false);
    }
  }

  function submitUserInfo(e) {
    e.preventDefault();
    setUser({
      username: "",
      password: "",
      email: "",
    });
    // Posts new user into DB
    axios
      .post("http://localhost:5000/user/signup", user)
      .then((res) => console.log(res.data));

    // Takes user back to homepage.
    history.push("/");
  }

  return (
    <div>
      <Header />
      {/* Material UI */}
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <form>
          <Avatar>
            <HighlightIcon />
          </Avatar>
          <h1>Create Account</h1>
          <TextField
            required
            autoFocus
            fullWidth
            label="Username"
            margin="normal"
            name="username"
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            autoFocus
            fullWidth
            label="Email"
            margin="normal"
            name="email"
            onChange={handleChange}
            required={true}
            type="email"
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
          <TextField
            fullWidth
            label="Confirm Password"
            margin="normal"
            name="confirmPassword"
            onChange={comparePassword}
            required
            type="password"
            variant="outlined"
          />
          {matchingPassword ? (
            <p className="confirmTextTrue">* Your password match!</p>
          ) : (
            <p className="confirmTextFalse">* Your passwords do not match.</p>
          )}
          <Button fullWidth variant="contained" onClick={submitUserInfo}>
            Sign Up
          </Button>
        </form>
      </Container>
      <Footer />
    </div>
  );
}

export default CreateAccount;
