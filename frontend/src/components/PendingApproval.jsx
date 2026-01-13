import { useNavigate } from "react-router-dom";

function PendingApproval() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        background: "linear-gradient(135deg, #F9FAFB 0%, #EEF2FF 100%)",
        color: "#111827",
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "520px",
          width: "100%",
          background: "#FFFFFF",
          border: "1px solid #E5E7EB",
          borderRadius: "18px",
          padding: "32px",
          boxShadow: "0 20px 45px rgba(17, 24, 39, 0.12)",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginTop: 0, marginBottom: "12px" }}>
          Pending Admin Approval
        </h2>
        <p style={{ color: "#6B7280" }}>
          Your account is created but access is not active yet. An administrator
          must validate your role and region in the User Service.
        </p>
        <p style={{ color: "#9CA3AF", fontSize: "0.9rem" }}>
          You will be able to sign in once approval is completed.
        </p>
        <button
          onClick={() => navigate("/login")}
          style={{
            marginTop: "18px",
            padding: "12px 20px",
            borderRadius: "12px",
            border: "none",
            background: "#4F46E5",
            color: "#FFFFFF",
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

export default PendingApproval;
