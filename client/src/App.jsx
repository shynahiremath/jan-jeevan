import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [backendMessage, setBackendMessage] = useState("Loading...");
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/health")
      .then((response) => {
        setBackendMessage(response.data.message);
      })
      .catch((err) => {
        setError("Could not connect to backend. Is the server running?");
        console.error(err);
      });
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Jan Setu — Setup Test</h1>
      <p>Frontend is running ✅</p>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <p style={{ color: "green" }}>Backend says: {backendMessage}</p>
      )}
    </div>
  );
}

export default App;