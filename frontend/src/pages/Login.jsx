import { useState } from "react";
import { useNavigate } from "react-router-dom";   // <-- ADD THIS
import axios from "axios";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const navigate = useNavigate();   // <-- ADD THIS

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      localStorage.setItem("token", res.data.token);

      alert("Login successful");

      navigate("/");   // 🔥 redirect to home
      setError("");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit} className="mt-3">
        <input
          className="form-control mb-3"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button className="btn btn-primary w-100" type="submit">
          Login
        </button>

        {error && <p className="text-danger mt-3">{error}</p>}
      </form>
    </div>
  );
}
