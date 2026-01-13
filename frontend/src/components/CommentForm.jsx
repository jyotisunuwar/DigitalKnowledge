import { useState } from "react";
import api from "../api/client";

function CommentForm({ contentId, onPosted }) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  const submit = async (e) => {
    e.preventDefault();

    if (!text.trim()) {
      setError("Comment cannot be empty.");
      return;
    }

    await api.post(
      "/comments",
      { contentId, text },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setText("");
    setError("");
    onPosted();
  };

  return (
    <form
      onSubmit={submit}
      style={{
        marginBottom: "30px",
        background: "#FFFFFF",
        padding: "20px",
        borderRadius: "20px",
        border: "1px solid #E5E7EB",
        boxShadow: "0 15px 35px rgba(17, 24, 39, 0.08)",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
      }}
    >
      <label
        htmlFor="commentText"
        style={{ fontWeight: "600", fontSize: "16px", color: "#111827" }}
      >
        Write a Comment
      </label>

      <textarea
        id="commentText"
        name="commentText"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Share your thoughts..."
        required
        style={{
          width: "100%",
          minHeight: "100px",
          padding: "12px",
          borderRadius: "15px",
          border: "1px solid #E5E7EB",
          background: "#FFFFFF",
          color: "#111827",
          outline: "none",
          resize: "vertical",
          fontSize: "14px",
          boxShadow: "inset 0 1px 2px rgba(16, 24, 40, 0.04)",
          transition: "border 0.3s, box-shadow 0.3s",
        }}
        onFocus={(e) =>
          Object.assign(e.currentTarget.style, {
            border: "1px solid #4F46E5",
            boxShadow: "0 0 0 3px rgba(79, 70, 229, 0.15)",
          })
        }
        onBlur={(e) =>
          Object.assign(e.currentTarget.style, {
            border: "1px solid #E5E7EB",
            boxShadow: "inset 0 1px 2px rgba(16, 24, 40, 0.04)",
          })
        }
      />

      {error && <div style={{ color: "#EF4444", fontWeight: "600" }}>{error}</div>}

      <button
        type="submit"
        style={{
          alignSelf: "flex-end",
          padding: "12px 28px",
          border: "none",
          borderRadius: "15px",
          fontWeight: "600",
          fontSize: "14px",
          color: "#FFFFFF",
          background: "#4F46E5",
          cursor: "pointer",
          transition: "all 0.3s",
          boxShadow: "0 6px 15px rgba(79, 70, 229, 0.2)",
        }}
      >
        Post Comment
      </button>
    </form>
  );
}

export default CommentForm;
