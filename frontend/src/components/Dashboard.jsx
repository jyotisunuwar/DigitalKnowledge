import { Link, Outlet } from "react-router-dom";
import Footer from "./Footer.jsx";

function normalizeRole(rawRole) {
  const role = (rawRole || "CONSULTANT")
    .toString()
    .toUpperCase()
    .replace(/\s+/g, "_");

  if (role === "SYSTEMADMIN" || role === "SYSTEM_ADMIN" || role === "ADMINISTRATOR") {
    return "ADMIN";
  }
  if (role === "SENIORCONSULTANT") {
    return "SENIOR_CONSULTANT";
  }
  if (role === "KNOWLEDGESUPERVISOR") {
    return "KNOWLEDGE_SUPERVISOR";
  }

  return role;
}

function Dashboard({ user, onLogout }) {
  const role = normalizeRole(user?.role);
  const canApprove =
    role === "SENIOR_CONSULTANT" ||
    role === "KNOWLEDGE_SUPERVISOR" ||
    role === "ADMIN";
  const isSupervisor = role === "KNOWLEDGE_SUPERVISOR" || role === "ADMIN";

  const sidebarLinkStyle = {
    padding: "12px 16px",
    borderRadius: "12px",
    display: "block",
    textDecoration: "none",
    color: "#111827",
    marginBottom: "8px",
    background: "#EEF2FF",
    boxShadow: "0 4px 12px rgba(17, 24, 39, 0.08)",
    transition: "all 0.3s ease",
  };

  const sidebarLinkHoverStyle = {
    background: "#E0E7FF",
    transform: "translateY(-2px)",
    boxShadow: "0 6px 16px rgba(17, 24, 39, 0.12)",
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: "#F9FAFB" }}>
      <aside
        style={{
          width: "250px",
          background: "#F3F4F6",
          color: "#111827",
          padding: "30px 20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "700",
            marginBottom: "24px",
            textAlign: "center",
            letterSpacing: "1px",
            color: "#111827",
          }}
        >
          DKN Dashboard
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <Link
            to="/dashboard/overview"
            style={sidebarLinkStyle}
            onMouseOver={(e) => Object.assign(e.target.style, sidebarLinkHoverStyle)}
            onMouseOut={(e) => Object.assign(e.target.style, sidebarLinkStyle)}
          >
            Overview
          </Link>

          <Link
            to="/dashboard/upload"
            style={sidebarLinkStyle}
            onMouseOver={(e) => Object.assign(e.target.style, sidebarLinkHoverStyle)}
            onMouseOut={(e) => Object.assign(e.target.style, sidebarLinkStyle)}
          >
            Upload
          </Link>

          <Link
            to="/dashboard/search"
            style={sidebarLinkStyle}
            onMouseOver={(e) => Object.assign(e.target.style, sidebarLinkHoverStyle)}
            onMouseOut={(e) => Object.assign(e.target.style, sidebarLinkStyle)}
          >
            Search
          </Link>

          <Link
            to="/dashboard/my-uploads"
            style={sidebarLinkStyle}
            onMouseOver={(e) => Object.assign(e.target.style, sidebarLinkHoverStyle)}
            onMouseOut={(e) => Object.assign(e.target.style, sidebarLinkStyle)}
          >
            My Uploads
          </Link>

          <Link
            to="/dashboard/comments"
            style={sidebarLinkStyle}
            onMouseOver={(e) => Object.assign(e.target.style, sidebarLinkHoverStyle)}
            onMouseOut={(e) => Object.assign(e.target.style, sidebarLinkStyle)}
          >
            Comments
          </Link>

          {canApprove && (
            <Link
              to="/dashboard/approvals"
              style={sidebarLinkStyle}
              onMouseOver={(e) => Object.assign(e.target.style, sidebarLinkHoverStyle)}
              onMouseOut={(e) => Object.assign(e.target.style, sidebarLinkStyle)}
            >
              Approvals
            </Link>
          )}

          <Link
            to="/dashboard/profile"
            style={sidebarLinkStyle}
            onMouseOver={(e) => Object.assign(e.target.style, sidebarLinkHoverStyle)}
            onMouseOut={(e) => Object.assign(e.target.style, sidebarLinkStyle)}
          >
            Profile
          </Link>

          {isSupervisor && (
            <Link
              to="/dashboard/activity"
              style={sidebarLinkStyle}
              onMouseOver={(e) => Object.assign(e.target.style, sidebarLinkHoverStyle)}
              onMouseOut={(e) => Object.assign(e.target.style, sidebarLinkStyle)}
            >
              Activity Log
            </Link>
          )}
        </div>

        <button
          onClick={onLogout}
          style={{
            marginTop: "auto",
            padding: "12px",
            border: "none",
            borderRadius: "12px",
            background: "#EF4444",
            color: "#FFFFFF",
            fontWeight: "700",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(239, 68, 68, 0.3)",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) =>
            Object.assign(e.target.style, {
              background: "#DC2626",
              transform: "translateY(-2px)",
              boxShadow: "0 6px 16px rgba(239, 68, 68, 0.35)",
            })
          }
          onMouseOut={(e) =>
            Object.assign(e.target.style, {
              background: "#EF4444",
              transform: "translateY(0)",
              boxShadow: "0 4px 12px rgba(239, 68, 68, 0.3)",
            })
          }
        >
          Logout
        </button>
      </aside>

      <main
        style={{
          flex: 1,
          padding: "30px",
          overflowY: "auto",
          background: "#F9FAFB",
          color: "#111827",
        }}
      >
        <div
          style={{
            marginBottom: "20px",
            fontSize: "15px",
            color: "#111827",
            fontWeight: "600",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <span>
            Welcome, <strong>{user?.name}</strong> ({role}) - {user?.region}
          </span>
          <span
            style={{
              padding: "4px 10px",
              borderRadius: "999px",
              background: "#EEF2FF",
              color: "#4F46E5",
              fontSize: "12px",
            }}
          >
            Role-aware workspace
          </span>
        </div>

        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid #E5E7EB",
            borderRadius: "24px",
            padding: "30px",
            boxShadow: "0 10px 28px rgba(17, 24, 39, 0.12)",
            color: "#111827",
          }}
        >
          <Outlet />
        </div>

        <Footer />
      </main>
    </div>
  );
}

export default Dashboard;
