import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Dashboard from "./components/Dashboard.jsx";
import DashboardOverview from "./components/DashboardOverview.jsx";
import UploadContent from "./components/UploadContent.jsx";
import ApprovalQueue from "./components/ApprovalQueue.jsx";
import Search from "./components/Search.jsx";
import DashboardContentList from "./components/DashboardContentList.jsx";
import ContentDetails from "./components/ContentDetails.jsx";
import CommentsPage from "./components/CommentsPage.jsx";
import Profile from "./components/Profile.jsx";
import ActivityLog from "./components/ActivityLog.jsx";
import PendingApproval from "./components/PendingApproval.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";

function ProtectedRoute({ user, children }) {
  return user ? children : <Navigate to="/login" />;
}

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Routes>
      <Route path="/" element={<Login onLogin={handleLogin} />} />
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/pending-approval" element={<PendingApproval />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute user={user}>
            <Dashboard user={user} onLogout={handleLogout} />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="overview" />} />
        <Route path="overview" element={<DashboardOverview user={user} />} />
        <Route path="upload" element={<UploadContent />} />
        <Route path="my-uploads" element={<DashboardContentList />} />
        <Route path="approvals" element={<ApprovalQueue />} />
        <Route path="search" element={<Search />} />
        <Route path="comments" element={<CommentsPage />} />
        <Route path="content/:id" element={<ContentDetails />} />
        <Route path="profile" element={<Profile user={user} />} />
        <Route path="activity" element={<ActivityLog user={user} />} />
      </Route>
    </Routes>
  );
}

export default App;
