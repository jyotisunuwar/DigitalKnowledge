import { useEffect, useState } from "react";
import api from "../api/client";

function CommentsPage() {
  const [comments, setComments] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    api
      .get("/comments", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setComments(res.data))
      .catch((err) => console.error(err));
  }, [token]);

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "40px auto",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        padding: "10px",
      }}
    >
      <h2
        style={{
          fontSize: "28px",
          fontWeight: "bold",
          color: "#111827",
          textAlign: "center",
        }}
      >
        All Comments
      </h2>

      {comments.length === 0 && (
        <p style={{ textAlign: "center", color: "#6B7280" }}>
          No comments yet.
        </p>
      )}

      {comments.map((c) => (
        <div
          key={c._id}
          style={{
            display: "flex",
            gap: "15px",
            background: "#ffffff",
            padding: "20px",
            borderRadius: "20px",
            border: "1px solid #E5E7EB",
            boxShadow: "0 8px 20px rgba(17, 24, 39, 0.08)",
            alignItems: "flex-start",
          }}
        >
          {/* Avatar */}
          <div
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              background: "#EEF2FF",
              color: "#4F46E5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: "18px",
              flexShrink: 0,
            }}
          >
            {c.author?.name?.charAt(0).toUpperCase() || "U"}
          </div>

          {/* Comment content */}
          <div style={{ flex: 1 }}>
            {/* Author and content title */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
                flexWrap: "wrap",
              }}
            >
              <span style={{ fontWeight: "600", color: "#111827" }}>
                {c.author?.name || "Unknown"}
              </span>
              <span
                style={{
                  fontStyle: "italic",
                  color: "#6B7280",
                  fontSize: "14px",
                }}
              >
                on {c.content?.title || "Unknown content"}
              </span>
            </div>

            {/* Comment text */}
            <p
              style={{
                background: "#F9FAFB",
                padding: "12px",
                borderRadius: "15px",
                color: "#111827",
                fontSize: "14px",
                lineHeight: "1.5",
              }}
            >
              {c.text}
            </p>

            {/* Timestamp */}
            <small style={{ color: "#9CA3AF", fontSize: "12px", marginTop: "4px", display: "block" }}>
              {new Date(c.createdAt).toLocaleString()}
            </small>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CommentsPage;
