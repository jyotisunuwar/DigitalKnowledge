import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer.jsx";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    role: "",
    region: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Registration failed");
        return;
      }

      setSuccess(
        "Account submitted. An administrator will validate your role and region before access is granted. Redirecting to login..."
      );
      setFormData({
        email: "",
        name: "",
        role: "",
        region: "",
        password: "",
        confirmPassword: "",
      });
      setTimeout(() => navigate("/login"), 1500);
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div style={pageStyle}>
      <div style={leftStyle}>
        <h1 style={titleStyle}>Join Digital Knowledge Network</h1>

        <p style={subtitleStyle}>
          Become part of a secure knowledge-sharing ecosystem designed for
          consultants, reviewers, and supervisors.
        </p>

        <div style={featureList}>
          <span>Structured role-based access</span>
          <span>Region-based governance</span>
          <span>Secure artifact submission</span>
        </div>
      </div>

      <div style={rightStyle}>
        <form onSubmit={handleSubmit} style={cardStyle}>
          <h2 style={cardTitle}>Create your account</h2>

          {error && <div style={errorStyle}>{error}</div>}
          {success && <div style={successStyle}>{success}</div>}


          <label style={labelStyle}>Email</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <label style={labelStyle}>Full Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <label style={labelStyle}>Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="">Select role</option>
            <option value="CONSULTANT">Consultant</option>
            <option value="SENIOR_CONSULTANT">Senior Consultant</option>
            <option value="KNOWLEDGE_SUPERVISOR">Knowledge Supervisor</option>
            <option value="ADMIN">Admin</option>
          </select>

          <label style={labelStyle}>Region</label>
          <select
            name="region"
            value={formData.region}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="">Select region</option>
            <option value="UK">UK</option>
            <option value="EU">EU</option>
            <option value="APAC">APAC</option>
            <option value="AMER">AMER</option>
          </select>

          <label style={labelStyle}>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <label style={labelStyle}>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            style={{ ...inputStyle, marginBottom: "22px" }}
          />

          <button type="submit" style={buttonStyle}>
            Register
          </button>

          <p style={footerText}>
            Already have an account?{" "}
            <span style={linkStyle} onClick={() => navigate("/login")}>
              Sign in
            </span>
          </p>
        </form>
      </div>

      <div style={footerWrap}>
        <Footer />
      </div>
    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  display: "flex",
  flexWrap: "wrap",
  background: "linear-gradient(135deg, #F9FAFB 0%, #EEF2FF 100%)",
  fontFamily: "'Space Grotesk', sans-serif",
  position: "relative",
};

const leftStyle = {
  flex: 1,
  minWidth: "280px",
  color: "#111827",
  padding: "70px 60px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

const titleStyle = {
  fontSize: "3rem",
  fontWeight: "700",
  marginBottom: "20px",
};

const subtitleStyle = {
  fontSize: "1.1rem",
  lineHeight: "1.7",
  maxWidth: "520px",
  color: "#6B7280",
};

const featureList = {
  marginTop: "30px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  color: "#6B7280",
};

const rightStyle = {
  flex: 1,
  minWidth: "280px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "40px",
};

const cardStyle = {
  width: "100%",
  maxWidth: "460px",
  padding: "40px",
  borderRadius: "18px",
  background: "#FFFFFF",
  border: "1px solid #E5E7EB",
  boxShadow: "0 20px 45px rgba(17, 24, 39, 0.12)",
  color: "#111827",
};

const cardTitle = {
  textAlign: "center",
  marginBottom: "22px",
  fontSize: "1.7rem",
  fontWeight: "600",
};

const errorStyle = {
  background: "rgba(239, 68, 68, 0.12)",
  border: "1px solid rgba(239, 68, 68, 0.3)",
  color: "#EF4444",
  padding: "12px",
  borderRadius: "10px",
  marginBottom: "20px",
  textAlign: "center",
};

const successStyle = {
  background: "rgba(34, 197, 94, 0.12)",
  color: "#22C55E",
  padding: "12px",
  borderRadius: "10px",
  marginBottom: "18px",
  textAlign: "center",
};

const noticeStyle = {
  background: "#EEF2FF",
  border: "1px solid #E5E7EB",
  padding: "12px",
  borderRadius: "10px",
  marginBottom: "18px",
  color: "#4F46E5",
  fontSize: "0.85rem",
};

const labelStyle = {
  fontSize: "0.9rem",
  color: "#6B7280",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "6px",
  marginBottom: "16px",
  borderRadius: "12px",
  border: "1px solid #E5E7EB",
  background: "#FFFFFF",
  color: "#111827",
  boxShadow: "inset 0 1px 2px rgba(16, 24, 40, 0.04)",
  outline: "none",
};

const helperTextStyle = {
  marginTop: "-10px",
  marginBottom: "16px",
  fontSize: "0.8rem",
  color: "#9CA3AF",
};

const buttonStyle = {
  width: "100%",
  padding: "14px",
  borderRadius: "12px",
  border: "none",
  background: "#4F46E5",
  color: "#FFFFFF",
  fontSize: "1rem",
  fontWeight: "600",
  cursor: "pointer",
};

const footerText = {
  marginTop: "18px",
  textAlign: "center",
  fontSize: "0.9rem",
  color: "#6B7280",
};

const linkStyle = {
  color: "#4F46E5",
  cursor: "pointer",
};

const footerWrap = {
  position: "absolute",
  bottom: 0,
  left: 0,
  width: "100%",
};

export default Register;
