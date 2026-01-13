import { useState } from "react";
import api from "../api/client";

export default function UploadContent() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/content", { title, body });
      setMessage(`Uploaded: ${res.data.title}`);
      setTitle("");
      setBody("");
    } catch (err) {
      setMessage("Upload failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px 20px",
        background: "#F9FAFB",
        fontFamily: "'Space Grotesk', sans-serif",
        color: "#111827",
      }}
    >
      <div
        style={{
          maxWidth: "640px",
          margin: "0 auto",
          background: "#FFFFFF",
          border: "1px solid #E5E7EB",
          borderRadius: "16px",
          padding: "28px",
          boxShadow: "0 18px 35px rgba(17, 24, 39, 0.08)",
        }}
      >
        <h2 style={{ marginTop: 0 }}>Upload Content</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            display: "block",
            width: "100%",
            marginBottom: 12,
            padding: "10px 12px",
            borderRadius: "10px",
            border: "1px solid #E5E7EB",
            background: "#FFFFFF",
            color: "#111827",
          }}
        />
        <textarea
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          style={{
            display: "block",
            width: "100%",
            minHeight: "140px",
            marginBottom: 12,
            padding: "10px 12px",
            borderRadius: "10px",
            border: "1px solid #E5E7EB",
            background: "#FFFFFF",
            color: "#111827",
          }}
        />
        <button
          type="submit"
          style={{
            background: "#4F46E5",
            color: "#FFFFFF",
            border: "none",
            borderRadius: "10px",
            padding: "10px 16px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>
      {message && <p style={{ marginTop: "14px", color: "#6B7280" }}>{message}</p>}
      </div>
    </div>
  );
}
