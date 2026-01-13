import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import "../dashboard.css";

function DashboardLayout({ user, onLogout, children }) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const canApprove =
    user.role === "SENIOR_CONSULTANT" ||
    user.role === "KNOWLEDGE_SUPERVISOR" ||
    user.role === "ADMIN";

  const isActive = (path) => location.pathname === path;

  return (
    <div className="dashboard-layout">

      {/* Sidebar */}
      <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <h2 className="sidebar-title">
          {collapsed ? "DKN" : "DKN Dashboard"}
        </h2>

        {/* Collapse Button */}
        <button
          className="collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? "➡️" : "⬅️"}
        </button>

        <nav>
          <ul className="nav-list">

            <li>
              <Link
                to="/dashboard/upload"
                className={`nav-link ${isActive("/dashboard/upload") ? "active" : ""}`}
              >
                📤 {!collapsed && <span>Upload</span>}
              </Link>
            </li>

            {canApprove && (
              <li>
                <Link
                  to="/dashboard/approvals"
                  className={`nav-link ${isActive("/dashboard/approvals") ? "active" : ""}`}
                >
                  ✅ {!collapsed && <span>Approvals</span>}
                </Link>
              </li>
            )}

            <li>
              <Link
                to="/dashboard/search"
                className={`nav-link ${isActive("/dashboard/search") ? "active" : ""}`}
              >
                🔍 {!collapsed && <span>Search</span>}
              </Link>
            </li>

            <li>
              <Link
                to="/dashboard/comments"
                className={`nav-link ${isActive("/dashboard/comments") ? "active" : ""}`}
              >
                💬 {!collapsed && <span>Comments</span>}
              </Link>
            </li>

          </ul>
        </nav>

        <button className="logout-btn" onClick={onLogout}>
          🔴 {!collapsed && "Logout"}
        </button>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="dashboard-header">
          <span>
            Logged in as <strong>{user.name}</strong> ({user.role}) – {user.region}
          </span>
        </header>

        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;
