import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/client";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";

function ContentDetails() {
  const { id } = useParams();
  const [content, setContent] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("comments");

  const loadContent = async () => {
    try {
      const res = await api.get(`/content/${id}`);
      setContent(res.data);
      setError(null);
    } catch (err) {
      setError("Could not load content.");
    }
  };

  useEffect(() => {
    loadContent();
  }, [id]);

  const handleDownload = async () => {
    try {
      const res = await api.get(`/content/${id}/file`, { responseType: "blob" });
      const url = window.URL.createObjectURL(res.data);
      window.open(url, "_blank");
    } catch (err) {
      console.error("Download failed", err);
    }
  };

  if (error) {
    return (
      <div className="card">
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!content) {
    return <p>Loading...</p>;
  }

  const isArchived = content.status === "ARCHIVED";
  const statusClass = content.status === "PENDING_APPROVAL" ? "pending" : content.status.toLowerCase();

  return (
    <div className="card">
      <section style={{ marginBottom: "24px" }}>
        <h2 style={{ marginBottom: "10px" }}>{content.title}</h2>
        <p style={{ marginBottom: "10px" }}>{content.description}</p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
          <p>
            Status:{" "}
            <span className={`status-badge ${statusClass}`}>
              {content.status}
            </span>
          </p>
          <p>Author: {content.author?.name || "Unknown"}</p>
          <p>Region: {content.region || "-"}</p>
          <p>Project: {content.project || "-"}</p>
          <p>Tags: {Array.isArray(content.tags) ? content.tags.join(", ") : "-"}</p>
          <p>
            Last updated:{" "}
            {new Date(content.updatedAt || content.createdAt).toLocaleString()}
          </p>
        </div>

        <p style={{ fontSize: "12px", color: "#9CA3AF" }}>
          View event recorded for audit trail.
        </p>

        {isArchived && (
          <div
            style={{
              marginTop: "12px",
              padding: "10px",
              borderRadius: "8px",
              background: "rgba(245, 158, 11, 0.12)",
              color: "#F59E0B",
              fontWeight: "600",
            }}
          >
            Read-only: This content is archived.
          </div>
        )}
      </section>

      <section
        style={{
          marginBottom: "24px",
          padding: "16px",
          borderRadius: "12px",
          border: "1px solid #E5E7EB",
          background: "#FFFFFF",
        }}
      >
        <h3 style={{ marginTop: 0 }}>Document preview</h3>
        <div
          style={{
            height: "160px",
            borderRadius: "10px",
            border: "1px dashed #E5E7EB",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#9CA3AF",
            marginBottom: "12px",
          }}
        >
          Preview unavailable in demo. Use download.
        </div>
        <button
          onClick={handleDownload}
          style={{
            padding: "10px 14px",
            borderRadius: "10px",
            border: "none",
            background: "#4F46E5",
            color: "#FFFFFF",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Download Document
        </button>
      </section>

      <div
        style={{
          display: "flex",
          gap: "20px",
          borderBottom: "1px solid #E5E7EB",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={() => setActiveTab("comments")}
          style={{
            padding: "10px 0",
            border: "none",
            background: "none",
            cursor: "pointer",
            fontWeight: activeTab === "comments" ? "700" : "500",
            borderBottom:
              activeTab === "comments" ? "3px solid #4F46E5" : "3px solid transparent",
            color: activeTab === "comments" ? "#4F46E5" : "#6B7280",
          }}
        >
          Comments
        </button>

        <button
          onClick={() => setActiveTab("audit")}
          style={{
            padding: "10px 0",
            border: "none",
            background: "none",
            cursor: "pointer",
            fontWeight: activeTab === "audit" ? "700" : "500",
            borderBottom:
              activeTab === "audit" ? "3px solid #4F46E5" : "3px solid transparent",
            color: activeTab === "audit" ? "#4F46E5" : "#6B7280",
          }}
        >
          Audit Log
        </button>
      </div>

      {activeTab === "comments" && (
        <section
          style={{
            padding: "20px",
            background: "#FFFFFF",
            borderRadius: "10px",
            border: "1px solid #E5E7EB",
          }}
        >
          <CommentForm contentId={id} onPosted={loadContent} />
          <CommentList contentId={id} />
        </section>
      )}

      {activeTab === "audit" && (
        <section
          style={{
            padding: "20px",
            background: "#FFFFFF",
            borderRadius: "10px",
            border: "1px solid #E5E7EB",
          }}
        >
          {content.auditLog?.length === 0 && <p>No audit history.</p>}

          {content.auditLog?.map((log, index) => (
            <div
              key={index}
              style={{
                padding: "8px 0",
                borderBottom: "1px solid #E5E7EB",
              }}
            >
              <strong style={{ color: "#111827" }}>{log.action}</strong>{" "}
              <span style={{ color: "#6B7280" }}>by {log.by?.name || log.by}</span>
              <br />
              <small style={{ color: "#9CA3AF" }}>
                {new Date(log.at).toLocaleString()}
              </small>

              {log.notes && (
                <p style={{ margin: "5px 0", color: "#6B7280" }}>
                  Reason: {log.notes}
                </p>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  );
}

export default ContentDetails;
