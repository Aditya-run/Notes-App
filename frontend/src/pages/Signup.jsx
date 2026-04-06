import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Signup() {
  // Step 1: Store what the user types
  const [username, setUsername] = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage]   = useState("");

  const navigate = useNavigate();

  // Step 2: This runs when user clicks Signup button
  async function handleSignup() {
    try {
      // Step 3: Send POST request to backend with user data
      await api.post("/users/signup", {
        username: username,
        email: email,
        password: password,
      });

      // Step 4: If success, show message and go to login page
      setMessage("Signup successful! Please login.");
      navigate("/");

    } catch (error) {
      // Step 5: If something went wrong, show the error
      setMessage("Signup failed. Try again.");
      console.log(error);
    }
  }

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px" }}>
      <h2>Signup</h2>

      {/* Show message if any */}
      {message && <p style={{ color: "red" }}>{message}</p>}

      {/* Input fields */}
      <div>
        <label>Username</label><br />
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
        /><br /><br />

        <label>Email</label><br />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
        /><br /><br />

        <label>Password</label><br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        /><br /><br />

        <button onClick={handleSignup}>Signup</button>
      </div>

      <br />
      <p>Already have an account? <a href="/">Login here</a></p>
    </div>
  );
}

export default Signup;
