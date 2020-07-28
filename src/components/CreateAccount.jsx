import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function CreateAccount() {
  const history = useHistory();
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setUser((prevInfo) => {
      return {
        ...prevInfo,
        [name]: value,
      };
    });
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
      <h1>Sign Up</h1>
      <form>
        <input
          name="username"
          onChange={handleChange}
          placeholder="Enter your username."
          required
        />
        <input
          name="password"
          onChange={handleChange}
          placeholder="Enter your password."
          type="password"
        />
        <input
          name="email"
          onChange={handleChange}
          placeholder="Enter your email"
          type="email"
        />
        <div className="userLogin">
          <button onClick={submitUserInfo}>Sign me up!</button>
        </div>
      </form>
      <Footer />
    </div>
  );
}

export default CreateAccount;
