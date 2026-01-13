import { useEffect, useState } from "react";
import api from "../api/client";

function CommentList({ contentId }) {
  const [comments, setComments] = useState([]);
  const token = localStorage.getItem("token");

  const load = async () => {
    if (!contentId) return;

    try {
      const res = await api.get(`/comments/${contentId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setComments(res.data);
    } catch {
      setComments([]);
    }
  };

  useEffect(() => {
    load();
  }, [contentId]);

  return (
    <div className="comment-list">
      {comments.length === 0 && <p>No comments yet.</p>}

      {comments.map((c) => (
        <div key={c._id} className="comment-item">
          <div className="comment-header">
            <span className="comment-author">{c.author?.name}</span>

            {c.author?.role && (
              <span className={`role-badge ${c.author.role.toLowerCase()}`}>
                {c.author.role}
              </span>
            )}

            <span className="comment-timestamp">
              {new Date(c.createdAt).toLocaleString()}
            </span>
          </div>

          <div className="comment-body">{c.text}</div>
        </div>
      ))}
    </div>
  );
}

export default CommentList;
