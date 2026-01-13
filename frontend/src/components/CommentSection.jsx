import React, { useEffect, useState } from 'react';
import api from '../api/client';

const CommentSection = ({ contentId, currentUser }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');

  const load = async () => {
    const res = await api.get(`/content/${contentId}/comments`);
    setComments(res.data);
  };

  useEffect(() => {
    load();
  }, [contentId]);

  const submitComment = async e => {
    e.preventDefault();
    await api.post(`/content/${contentId}/comments`, {
      authorId: currentUser._id,
      text
    });
    setText('');
    load();
  };

  return (
    <div
      style={{
        background: "#FFFFFF",
        border: "1px solid #E5E7EB",
        borderRadius: "16px",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        color: "#111827",
      }}
    >
      <h4 style={{ margin: 0, fontSize: "18px" }}>Comments</h4>
      <ul style={{ margin: 0, paddingLeft: "18px", color: "#6B7280" }}>
        {comments.map(c => (
          <li key={c._id} style={{ marginBottom: "6px" }}>
            <strong style={{ color: "#111827" }}>{c.author?.name}:</strong> {c.text}
          </li>
        ))}
      </ul>
      <form onSubmit={submitComment}>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          required
          style={{
            width: "100%",
            minHeight: "90px",
            padding: "10px 12px",
            borderRadius: "12px",
            border: "1px solid #E5E7EB",
            background: "#FFFFFF",
            color: "#111827",
            outline: "none",
            marginBottom: "10px",
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
          Add Comment
        </button>
      </form>
    </div>
  );
};

export default CommentSection;
