import { useState } from "react";
import api from "../api/client";

export default function RegisterUser() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Consultant",
    region: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await api.post("/users", form);
      setMessage(`User created: ${res.data.name}`);
    } catch (err) {
      setMessage("Error creating user");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Register User</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <br /><br />
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <br /><br />
        <input name="region" placeholder="Region" onChange={handleChange} required />
        <br /><br />

        <select name="role" onChange={handleChange}>
          <option value="Consultant">Consultant</option>
          <option value="SeniorConsultant">Senior Consultant</option>
          <option value="KnowledgeSupervisor">Knowledge Supervisor</option>
          <option value="SystemAdmin">System Admin</option>
        </select>

        <br /><br />
        <button type="submit">Create User</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}
