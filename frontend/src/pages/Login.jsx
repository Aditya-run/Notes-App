import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Login() {
  // Step 1: Store what the user types
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage]   = useState("");

  const navigate = useNavigate();

  // Step 2: This runs when user clicks Login button
  async function handleLogin() {
    try {
      // Step 3: Send POST request to backend with email and password
      const response = await api.post("/users/signin", {
        email: email,
        password: password,
      });

      // Step 4: Backend sends back a token — save it in localStorage
      const token = response.data.token;
      localStorage.setItem("token", token);

      // Step 5: Go to the notes page
      navigate("/notes");

    } catch (error) {
      // Step 6: If login failed, show error
      setMessage("Login failed. Check email and password.");
      console.log(error);
    }
  }

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px" }}>
      <h2>Login</h2>

      {/* Show message if any */}
      {message && <p style={{ color: "red" }}>{message}</p>}

      {/* Input fields */}
      <div>
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

        <button onClick={handleLogin}>Login</button>
      </div>

      <br />
      <p>No account? <a href="/signup">Signup here</a></p>
    </div>
  );
}

export default Login;
