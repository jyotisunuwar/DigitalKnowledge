import { useNavigate } from "react-router-dom";
import { useState } from "react";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(
      "If an account exists for this email, a reset link has been sent."
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        background: "linear-gradient(135deg, #F9FAFB 0%, #EEF2FF 100%)",
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "440px",
          width: "100%",
          background: "#FFFFFF",
          borderRadius: "18px",
          padding: "32px",
          border: "1px solid #E5E7EB",
          boxShadow: "0 20px 45px rgba(17, 24, 39, 0.12)",
          color: "#111827",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginTop: 0, marginBottom: "12px" }}>Password Reset</h2>
        <p style={{ color: "#6B7280", marginBottom: "20px" }}>
          Enter your email and we will send you a reset link.
        </p>
        <form onSubmit={handleSubmit} style={{ textAlign: "left" }}>
          <label style={{ fontSize: "0.9rem", color: "#6B7280" }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            style={{
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
            }}
          />
          {message && (
            <div
              style={{
                background: "#EEF2FF",
                color: "#4F46E5",
                padding: "10px",
                borderRadius: "10px",
                marginBottom: "16px",
                fontSize: "13px",
                textAlign: "center",
              }}
            >
              {message}
            </div>
          )}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px 18px",
              borderRadius: "12px",
              border: "none",
              background: "#4F46E5",
              color: "white",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Send Reset Link
          </button>
        </form>
        <button
          onClick={() => navigate("/login")}
          style={{
            marginTop: "16px",
            width: "100%",
            padding: "12px 18px",
            borderRadius: "12px",
            border: "1px solid #E5E7EB",
            background: "#FFFFFF",
            color: "#4F46E5",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;
