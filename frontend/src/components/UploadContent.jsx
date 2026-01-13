import { useState } from "react";
import axios from "axios";

function UploadContent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [project, setProject] = useState("");
  const [region, setRegion] = useState("AUTO_EU");
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("DRAFT");
  const [message, setMessage] = useState({ type: "", text: "" });

  const regions = [
    { value: "AUTO_EU", label: "Auto (EU)" },
    { value: "UK", label: "UK" },
    { value: "EU", label: "EU" },
    { value: "APAC", label: "APAC" },
    { value: "AMER", label: "AMER" },
  ];

  const handleUpload = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (!title.trim()) {
      setMessage({ type: "error", text: "Title is required." });
      return;
    }
    if (!tags.trim()) {
      setMessage({ type: "error", text: "Tags are required." });
      return;
    }
    if (!project) {
      setMessage({ type: "error", text: "Enter Project ID from CRM." });
      return;
    }
    if (!file) {
      setMessage({ type: "error", text: "Please select a file before uploading." });
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", tags);
    formData.append("project", project);
    formData.append("region", region);
    formData.append("file", file);

    try {
      await axios.post("http://localhost:4000/api/content/upload", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage({ type: "success", text: "Content uploaded and sent for approval." });
      setStatus("PENDING_APPROVAL");
      setTitle("");
      setDescription("");
      setTags("");
      setProject("");
      setFile(null);
    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.message || "Upload failed." });
    }
  };

  const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    fontFamily: "'Space Grotesk', sans-serif",
    background: "linear-gradient(135deg, #F9FAFB 0%, #EEF2FF 100%)",
    position: "relative",
  };

  const cardStyle = {
    position: "relative",
    width: "100%",
    maxWidth: "900px",
    background: "#FFFFFF",
    borderRadius: "26px",
    padding: "40px",
    border: "1px solid #E5E7EB",
    boxShadow: "0 25px 50px rgba(17, 24, 39, 0.12)",
  };

  const inputBoxStyle = (bgColor) => ({
    flex: 1,
    padding: "18px",
    borderRadius: "18px",
    margin: "8px",
    border: "1px solid #E5E7EB",
    background: bgColor,
    color: "#111827",
    fontSize: "14px",
    outline: "none",
    transition: "all 0.3s ease",
  });

  const inputFocus = {
    borderColor: "#4F46E5",
    boxShadow: "0 0 0 3px rgba(79, 70, 229, 0.15)",
  };

  const buttonStyle = {
    width: "100%",
    padding: "14px",
    borderRadius: "20px",
    fontWeight: "700",
    fontSize: "16px",
    color: "#FFFFFF",
    background: "#4F46E5",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 10px 25px rgba(79, 70, 229, 0.2)",
    transition: "all 0.3s ease",
    marginTop: "16px",
  };

  const messageStyle = (type) => ({
    marginTop: "18px",
    textAlign: "center",
    fontWeight: "600",
    padding: "12px",
    borderRadius: "14px",
    background: type === "success" ? "rgba(34, 197, 94, 0.12)" : "rgba(239, 68, 68, 0.12)",
    color: type === "success" ? "#22C55E" : "#EF4444",
  });

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2
          style={{
            fontSize: "32px",
            fontWeight: "800",
            color: "#111827",
            marginBottom: "24px",
            textAlign: "center",
          }}
        >
          Upload Content
        </h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <div style={{ flex: 1, minWidth: "240px" }}>
            <div style={{ fontWeight: "600", color: "#6B7280" }}>Status</div>
            <div style={{ display: "flex", gap: "10px", marginTop: "6px" }}>
              <span
                style={{
                  padding: "4px 10px",
                  borderRadius: "999px",
                  background: status === "DRAFT" ? "#EEF2FF" : "#E5E7EB",
                  color: status === "DRAFT" ? "#4F46E5" : "#6B7280",
                  fontSize: "12px",
                }}
              >
                Draft
              </span>
              <span
                style={{
                  padding: "4px 10px",
                  borderRadius: "999px",
                  background: status === "PENDING_APPROVAL" ? "#F59E0B" : "#E5E7EB",
                  color: status === "PENDING_APPROVAL" ? "#FFFFFF" : "#6B7280",
                  fontSize: "12px",
                }}
              >
                Pending Approval
              </span>
            </div>
          </div>
          <div style={{ flex: 1, minWidth: "240px" }}>
            <div style={{ fontWeight: "600", color: "#6B7280" }}>Region</div>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              style={{ ...inputBoxStyle("#FFFFFF"), margin: "6px 0 0" }}
            >
              {regions.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <form onSubmit={handleUpload}>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={inputBoxStyle("#FFFFFF")}
              onFocus={(e) => Object.assign(e.target.style, inputFocus)}
              onBlur={(e) => Object.assign(e.target.style, inputBoxStyle("#FFFFFF"))}
            />

            <textarea
              rows={2}
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={inputBoxStyle("#FFFFFF")}
              onFocus={(e) => Object.assign(e.target.style, inputFocus)}
              onBlur={(e) => Object.assign(e.target.style, inputBoxStyle("#FFFFFF"))}
            />

            <input
              placeholder="Tags (required)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              style={inputBoxStyle("#FFFFFF")}
              onFocus={(e) => Object.assign(e.target.style, inputFocus)}
              onBlur={(e) => Object.assign(e.target.style, inputBoxStyle("#FFFFFF"))}
            />

            <input
              type="text"
              placeholder="Project ID (from CRM)"
              value={project}
              onChange={(e) => setProject(e.target.value)}
              style={inputBoxStyle("#FFFFFF")}
              onFocus={(e) => Object.assign(e.target.style, inputFocus)}
              onBlur={(e) => Object.assign(e.target.style, inputBoxStyle("#FFFFFF"))}
            />

            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              style={inputBoxStyle("#FFFFFF")}
            />
          </div>

          <button type="submit" style={buttonStyle}>
            Submit for Approval
          </button>
        </form>

        {message.text && <p style={messageStyle(message.type)}>{message.text}</p>}
      </div>
    </div>
  );
}

export default UploadContent;
