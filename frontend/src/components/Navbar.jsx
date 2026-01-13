import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function Navbar() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    navigate("/"); // redirect to home
  };

  return (
    <nav className="bg-light shadow-sm w-100">
      <div className="d-flex justify-content-between align-items-center px-5 py-3 w-100">

        <Link className="navbar-brand fw-bold text-primary" to="/">
          DKN Platform
        </Link>

        <div className="d-flex gap-4">
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/register">Register User</Link>
          <Link className="nav-link" to="/upload">Upload Content</Link>
          <Link className="nav-link" to="/approvals">Approvals</Link>
          <Link className="nav-link" to="/users">Users</Link>
          <Link className="nav-link" to="/search">Search</Link>

          {/* 🔥 LOGIN / LOGOUT BUTTON */}
          {!loggedIn ? (
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          ) : (
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>

      </div>
    </nav>
  );
}
