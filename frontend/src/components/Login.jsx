import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Footer from "./Footer.jsx";

function Login({ onLogin }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [roleHint, setRoleHint] = useState("CONSULTANT");
  const [error, setError] = useState("");
  const [ssoMessage, setSsoMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSsoMessage("");

    try {
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (res.status === 403 && data?.code === "PENDING_APPROVAL") {
          navigate("/pending-approval");
          return;
        }
        setError("Invalid email or password");
        return;
      }
      localStorage.setItem("token", data.token);

      if (remember) {
        localStorage.setItem("rememberEmail", email);
      } else {
        localStorage.removeItem("rememberEmail");
      }

      const user = data.user;
      const isPending =
        user?.approved === false ||
        user?.isApproved === false ||
        user?.status === "PENDING" ||
        user?.status === "PENDING_APPROVAL";
      const isApproved =
        user?.approved === true ||
        user?.isApproved === true ||
        user?.status === "ACTIVE" ||
        user?.status === "APPROVED";

      if (isPending && !isApproved) {
        navigate("/pending-approval");
        return;
      }

      onLogin(user);
      navigate("/dashboard/overview");
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  const handleSso = () => {
    setSsoMessage("SSO redirect simulated for assignment demonstration.");
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div style={pageStyle}>
      <div style={orbTeal} />
      <div style={orbGold} />

      <div style={leftStyle}>
        <h1 style={titleStyle}>Digital Knowledge Network</h1>

        <p style={subtitleStyle}>
          Secure enterprise knowledge sharing with governed approvals, search,
          and recommendations.
        </p>

        <div style={featureList}>
          <span>Role-based governance</span>
          <span>SSO-ready authentication</span>
          <span>Knowledge lifecycle management</span>
        </div>
      </div>

      <div style={rightStyle}>
        <form onSubmit={handleLogin} style={cardStyle}>
          <h2 style={cardTitle}>Sign in to DKN</h2>

          <button type="button" style={ssoButton} onClick={handleSso}>
            Continue with SSO
          </button>
          {ssoMessage && <div style={infoStyle}>{ssoMessage}</div>}

          <div style={dividerStyle}>
            <span style={dividerText}>or sign in with email</span>
          </div>

          {error && <div style={errorStyle}>{error}</div>}

          <label style={labelStyle}>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            style={inputStyle}
          />

          <label style={labelStyle}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            required
            style={inputStyle}
          />



          <div style={optionsStyle}>
            <label>
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                style={{ marginRight: "6px" }}
              />
              Remember me
            </label>

            <span style={forgotStyle} onClick={handleForgotPassword}>
              Forgot password?
            </span>
          </div>
          <div style={approvalNoteStyle}>
            Access requires administrator approval.
          </div>

          <button type="submit" style={buttonStyle}>
            Login
          </button>

          <p style={footerText}>
            Do not have an account?{" "}
            <span style={linkStyle} onClick={() => navigate("/register")}>
              Register
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
  overflow: "hidden",
};

const orbTeal = {
  position: "absolute",
  width: "420px",
  height: "420px",
  background: "rgba(79, 70, 229, 0.15)",
  filter: "blur(120px)",
  top: "-120px",
  left: "-120px",
};

const orbGold = {
  position: "absolute",
  width: "380px",
  height: "380px",
  background: "rgba(99, 102, 241, 0.12)",
  filter: "blur(120px)",
  bottom: "-120px",
  right: "-120px",
};

const leftStyle = {
  flex: 1,
  minWidth: "280px",
  color: "#111827",
  padding: "70px 60px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  zIndex: 1,
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
  zIndex: 1,
};

const cardStyle = {
  width: "100%",
  maxWidth: "420px",
  padding: "40px",
  borderRadius: "18px",
  background: "#FFFFFF",
  border: "1px solid #E5E7EB",
  boxShadow: "0 20px 45px rgba(17, 24, 39, 0.12)",
  color: "#111827",
};

const cardTitle = {
  textAlign: "center",
  marginBottom: "18px",
  fontSize: "1.6rem",
  fontWeight: "600",
  color: "#111827",
};

const errorStyle = {
  background: "rgba(239, 68, 68, 0.12)",
  border: "1px solid rgba(239, 68, 68, 0.3)",
  color: "#EF4444",
  padding: "12px",
  borderRadius: "10px",
  marginBottom: "16px",
  textAlign: "center",
};

const infoStyle = {
  background: "#EEF2FF",
  color: "#4F46E5",
  padding: "10px",
  borderRadius: "10px",
  marginTop: "10px",
  textAlign: "center",
  fontSize: "13px",
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

const optionsStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "18px",
  fontSize: "0.85rem",
  color: "#6B7280",
};

const forgotStyle = {
  cursor: "pointer",
  color: "#4F46E5",
};

const approvalNoteStyle = {
  marginTop: "-6px",
  marginBottom: "14px",
  fontSize: "0.85rem",
  fontWeight: "700",
  color: "#4F46E5",
  textAlign: "center",
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
  boxShadow: "0 10px 18px rgba(79, 70, 229, 0.22)",
};

const ssoButton = {
  width: "100%",
  padding: "12px",
  borderRadius: "12px",
  border: "1px solid #E5E7EB",
  background: "#EEF2FF",
  color: "#4F46E5",
  fontSize: "0.95rem",
  fontWeight: "600",
  cursor: "pointer",
};

const dividerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "16px 0",
  position: "relative",
};

const dividerText = {
  fontSize: "12px",
  color: "#9CA3AF",
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

export default Login;
