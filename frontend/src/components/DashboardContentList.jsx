import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function DashboardContentList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ title: "", description: "", tags: "" });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/content", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setItems(res.data);
    } catch (err) {
      console.log("FETCH ERROR:", err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/content/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setItems(items.filter((item) => item._id !== id));
    } catch (err) {
      console.log("DELETE ERROR:", err.response?.data);
    }
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setEditData({
      title: item.title,
      description: item.description,
      tags: item.tags.join(", "),
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:4000/api/content/${editId}`,
        editData,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setItems(items.map((item) => (item._id === editId ? res.data : item)));
      setEditId(null);
    } catch (err) {
      console.log("UPDATE ERROR:", err.response?.data);
    }
  };

  if (loading)
    return (
      <p
        style={{
          textAlign: "center",
          fontSize: "18px",
          color: "#6B7280",
          marginTop: "50px",
        }}
      >
        Loading...
      </p>
    );

  return (
    <div
      style={{
        padding: "30px",
        background: "#F9FAFB",
        minHeight: "100vh",
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "30px",
          fontWeight: "800",
          marginBottom: "24px",
          color: "#111827",
        }}
      >
        Your Uploaded Content
      </h2>

      {items.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: "18px", color: "#6B7280" }}>
          No content uploaded yet.
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {items.map((item) => (
            <div
              key={item._id}
              style={{
                background: "#FFFFFF",
                border: "1px solid #E5E7EB",
                borderRadius: "18px",
                padding: "20px",
                boxShadow: "0 12px 30px rgba(17, 24, 39, 0.08)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {editId === item._id ? (
                <form
                  style={{ display: "flex", flexDirection: "column", gap: "10px" }}
                  onSubmit={handleEditSubmit}
                >
                  <input
                    value={editData.title}
                    onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                    placeholder="Title"
                    style={{
                      padding: "10px",
                      borderRadius: "12px",
                      border: "1px solid #E5E7EB",
                      background: "#FFFFFF",
                      color: "#111827",
                      outline: "none",
                    }}
                  />
                  <textarea
                    value={editData.description}
                    onChange={(e) =>
                      setEditData({ ...editData, description: e.target.value })
                    }
                    placeholder="Description"
                    rows={3}
                    style={{
                      padding: "10px",
                      borderRadius: "12px",
                      border: "1px solid #E5E7EB",
                      background: "#FFFFFF",
                      color: "#111827",
                      outline: "none",
                      resize: "none",
                    }}
                  />
                  <input
                    value={editData.tags}
                    onChange={(e) => setEditData({ ...editData, tags: e.target.value })}
                    placeholder="Tags (comma-separated)"
                    style={{
                      padding: "10px",
                      borderRadius: "12px",
                      border: "1px solid #E5E7EB",
                      background: "#FFFFFF",
                      color: "#111827",
                      outline: "none",
                    }}
                  />
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      type="submit"
                      style={{
                        flex: 1,
                        padding: "10px",
                        borderRadius: "12px",
                        border: "none",
                        fontWeight: "600",
                        color: "#FFFFFF",
                        background: "#22C55E",
                        cursor: "pointer",
                      }}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditId(null)}
                      style={{
                        flex: 1,
                        padding: "10px",
                        borderRadius: "12px",
                        border: "none",
                        fontWeight: "600",
                        color: "#FFFFFF",
                        background: "#EF4444",
                        cursor: "pointer",
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <Link to={`/dashboard/content/${item._id}`}>
                    <h3
                      style={{
                        cursor: "pointer",
                        color: "#4F46E5",
                        fontSize: "20px",
                        fontWeight: "700",
                        marginBottom: "8px",
                      }}
                    >
                      {item.title}
                    </h3>
                  </Link>

                  <p style={{ color: "#6B7280", marginBottom: "5px" }}>{item.description}</p>

                  <p style={{ fontSize: "13px", color: "#6B7280" }}>
                    <strong>Tags:</strong> {item.tags.join(", ")}
                  </p>

                  <p style={{ fontSize: "13px", color: "#6B7280" }}>
                    <strong>Status:</strong>{" "}
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: "8px",
                        color: "#FFFFFF",
                        fontWeight: "600",
                        fontSize: "11px",
                        background:
                          item.status === "PUBLISHED"
                            ? "#22C55E"
                            : item.status === "PENDING" || item.status === "PENDING_APPROVAL"
                            ? "#f59e0b"
                            : item.status === "REJECTED"
                            ? "#EF4444"
                            : "#9CA3AF",
                      }}
                    >
                      {item.status}
                    </span>
                  </p>

                  <p style={{ fontSize: "13px", color: "#6B7280" }}>
                    <strong>Region:</strong> {item.region}
                  </p>

                  <p style={{ fontSize: "13px", color: "#6B7280" }}>
                    <strong>Last updated:</strong>{" "}
                    {new Date(item.updatedAt || item.createdAt).toLocaleString()}
                  </p>

                  <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                    <button
                      onClick={() => handleEdit(item)}
                      style={{
                        flex: 1,
                        padding: "10px",
                        borderRadius: "12px",
                        border: "none",
                        fontWeight: "600",
                        color: "#FFFFFF",
                        background: "#4F46E5",
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      style={{
                        flex: 1,
                        padding: "10px",
                        borderRadius: "12px",
                        border: "none",
                        fontWeight: "600",
                        color: "#FFFFFF",
                        background: "#EF4444",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DashboardContentList;
