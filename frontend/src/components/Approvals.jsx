import { useEffect, useState } from "react";
import axios from "axios";

function Approvals() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

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
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setItems(items.filter((i) => i._id !== id));
    } catch (err) {
      console.log("APPROVE ERROR:", err.response?.data);
    }
  };

  const reject = async (id) => {
    try {
      await axios.post(
        `http://localhost:4000/api/content/reject/${id}`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setItems(items.filter((i) => i._id !== id));
    } catch (err) {
      console.log("REJECT ERROR:", err.response?.data);
    }
  };

  if (loading)
    return (
      <p
        style={{
          textAlign: "center",
          fontSize: "18px",
          color: "#6b7280",
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
        background: "linear-gradient(135deg, #F9FAFB 0%, #EEF2FF 100%)",
        minHeight: "100vh",
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "32px",
          fontWeight: "800",
          marginBottom: "30px",
          color: "#111827",
          letterSpacing: "1px",
        }}
      >
        Approval Queue
      </h2>

      {items.length === 0 ? (
        <p
          style={{
            textAlign: "center",
            fontSize: "18px",
            color: "#6b7280",
            marginTop: "40px",
          }}
        >
          No items awaiting approval
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
                background: "#ffffff",
                borderRadius: "20px",
                padding: "25px",
                border: "1px solid #E5E7EB",
                boxShadow: "0 15px 35px rgba(17, 24, 39, 0.08)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
              onMouseEnter={(e) =>
                Object.assign(e.currentTarget.style, {
                  transform: "translateY(-8px)",
                  boxShadow: "0 25px 50px rgba(17, 24, 39, 0.12)",
                })
              }
              onMouseLeave={(e) =>
                Object.assign(e.currentTarget.style, {
                  transform: "translateY(0)",
                  boxShadow: "0 15px 35px rgba(17, 24, 39, 0.08)",
                })
              }
            >
              <h3
                style={{
                  fontSize: "22px",
                  fontWeight: "700",
                  marginBottom: "8px",
                  color: "#111827",
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  fontSize: "14px",
                  color: "#6B7280",
                  marginBottom: "10px",
                  lineHeight: "1.5",
                }}
              >
                {item.description}
              </p>

              <p
                style={{
                  fontSize: "13px",
                  color: "#6B7280",
                  marginBottom: "5px",
                }}
              >
                <strong>Tags:</strong>{" "}
                {Array.isArray(item.tags) ? item.tags.join(", ") : "No tags"}
              </p>

              <p
                style={{
                  fontSize: "13px",
                  color: "#6B7280",
                  marginBottom: "5px",
                }}
              >
                <strong>Region:</strong> {item.region}
              </p>

              <p
                style={{
                  fontSize: "13px",
                  color: "#6B7280",
                  marginBottom: "10px",
                }}
              >
                <strong>Uploaded:</strong>{" "}
                {new Date(item.createdAt).toLocaleString()}
              </p>

              <a
                href={`http://localhost:4000/api/content/${item._id}/file`}
                target="_blank"
                rel="noreferrer"
                style={{
                  marginBottom: "15px",
                  textAlign: "center",
                  padding: "10px 12px",
                  borderRadius: "12px",
                  background: "#4F46E5",
                  color: "#FFFFFF",
                  fontWeight: "600",
                  textDecoration: "none",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) =>
                  Object.assign(e.currentTarget.style, {
                    background: "#6366F1",
                    transform: "translateY(-2px)",
                  })
                }
                onMouseLeave={(e) =>
                  Object.assign(e.currentTarget.style, {
                    background: "#4F46E5",
                    transform: "translateY(0)",
                  })
                }
              >
                View File
              </a>

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={() => approve(item._id)}
                  style={{
                    flex: 1,
                    padding: "10px",
                    borderRadius: "12px",
                    border: "none",
                    fontWeight: "600",
                    color: "#FFFFFF",
                    background: "#22C55E",
                    cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) =>
                    Object.assign(e.currentTarget.style, {
                      background: "#16A34A",
                      transform: "translateY(-2px)",
                    })
                  }
                  onMouseLeave={(e) =>
                    Object.assign(e.currentTarget.style, {
                      background: "#22C55E",
                      transform: "translateY(0)",
                    })
                  }
                >
                  Approve
                </button>

                <button
                  onClick={() => reject(item._id)}
                  style={{
                    flex: 1,
                    padding: "10px",
                    borderRadius: "12px",
                    border: "none",
                    fontWeight: "600",
                    color: "#FFFFFF",
                    background: "#EF4444",
                    cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) =>
                    Object.assign(e.currentTarget.style, {
                      background: "#DC2626",
                      transform: "translateY(-2px)",
                    })
                  }
                  onMouseLeave={(e) =>
                    Object.assign(e.currentTarget.style, {
                      background: "#EF4444",
                      transform: "translateY(0)",
                    })
                  }
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
