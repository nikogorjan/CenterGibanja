import React, { useState, useContext } from "react";
import "./form.css";
import Axios from "axios";
import { AuthContext } from "../../../utils/authContext";

const LoginForm = () => {
  const { updateAuth } = useContext(AuthContext);
  const [username, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleIdChange = (event) => {
    setId(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform any desired actions with the captured ID and password
    console.log("ID:", username);
    console.log("Password:", password);

    Axios.post("http://localhost:5174/login", {
      username: username,
      password: password,
    })
      .then((response) => {
        console.log(response.data); // Success message or other data from the server
        // Redirect the user to the dashboard
        // Replace the following line with the appropriate routing logic for your application
        updateAuth();
        //window.location.href = "/dashboard";
      })
      .catch((error) => {
        console.error(error.response.data); // Error message from the server
        // Handle the error (e.g., show an error message to the user)
      });

    // Clear the form fields
    setId("");
    setPassword("");
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username">ID:</label>
        </div>
        <div className="form-group">
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleIdChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default LoginForm;
