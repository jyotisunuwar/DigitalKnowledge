import { useEffect, useState } from "react";
import axios from "axios";

function Approvals() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedbackById, setFeedbackById] = useState({});
  const [errorsById, setErrorsById] = useState({});

  useEffect(() => {
    fetchPending();
  }, []);

  const fetchPending = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/content/pending", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setItems(res.data);
    } catch (err) {
      console.log("APPROVAL FETCH ERROR:", err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const approve = async (id) => {
    try {
      await axios.post(
        `http://localhost:4000/api/content/approve/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setItems(items.filter((i) => i._id !== id));
    } catch (err) {
      console.log("APPROVE ERROR:", err.response?.data);
    }
  };

  const reject = async (id) => {
    const feedback = feedbackById[id] || "";
    if (!feedback.trim()) {
      setErrorsById({ ...errorsById, [id]: "Feedback is required for rejection." });
      return;
    }

    try {
      await axios.post(
        `http://localhost:4000/api/content/reject/${id}`,
        { feedback },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setItems(items.filter((i) => i._id !== id));
    } catch (err) {
      console.log("REJECT ERROR:", err.response?.data);
    }
  };

  const viewFile = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:4000/api/content/${id}/file`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch file");
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      window.open(url, "_blank");
    } catch (err) {
      console.error("VIEW FILE ERROR:", err);
      alert("Unable to open file");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Approval Queue</h2>

      {items.length === 0 ? (
        <p>No items awaiting approval</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {items.map((item) => (
            <div
              key={item._id}
              style={{
                padding: "18px",
                border: "1px solid #E5E7EB",
                borderRadius: "12px",
                background: "#FFFFFF",
              }}
            >
              <h3>{item.title}</h3>
              <p>{item.description}</p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
                <p>
                  <strong>Tags:</strong>{" "}
                  {Array.isArray(item.tags) ? item.tags.join(", ") : "No tags"}
                </p>
                <p>
                  <strong>Region:</strong> {item.region}
                </p>
                <p>
                  <strong>Project:</strong> {item.project?.name || item.project || "Unknown"}
                </p>
                <p>
                  <strong>Author:</strong> {item.author?.name || "Unknown"}
                </p>
                <p>
                  <strong>Last updated:</strong>{" "}
                  {new Date(item.updatedAt || item.createdAt).toLocaleString()}
                </p>
              </div>

              <button
                onClick={() => viewFile(item._id)}
                style={{
                  marginTop: "10px",
                  padding: "8px 12px",
                  background: "#4F46E5",
                  color: "#FFFFFF",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                View File
              </button>

              <div style={{ marginTop: "12px" }}>
                <label style={{ display: "block", marginBottom: "6px", fontWeight: "600" }}>
                  Rejection feedback
                </label>
                <textarea
                  rows={2}
                  value={feedbackById[item._id] || ""}
                  onChange={(e) =>
                    setFeedbackById({ ...feedbackById, [item._id]: e.target.value })
                  }
                  placeholder="Explain the reason for rejection"
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    border: "1px solid #E5E7EB",
                    background: "#FFFFFF",
                    color: "#111827",
                    padding: "10px",
                  }}
                />
                {errorsById[item._id] && (
                  <div style={{ color: "#EF4444", marginTop: "6px" }}>
                    {errorsById[item._id]}
                  </div>
                )}
              </div>

              <div style={{ marginTop: "12px", display: "flex", gap: "10px" }}>
                <button
                  onClick={() => approve(item._id)}
                  style={{
                    padding: "8px 12px",
                    background: "#22C55E",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Approve
                </button>

                <button
                  onClick={() => reject(item._id)}
                  style={{
                    padding: "8px 12px",
                    background: "#EF4444",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Approvals;
