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

function Profile({ user }) {
  const name = user?.name || "User";
  const role = normalizeRole(user?.role);
  const region = user?.region || "Global";

  const preferences = [
    "Show recommendations for active projects",
    "Notify on approval decisions",
    "Prioritize regional content",
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
      <h2 style={{ marginTop: 0, color: "#111827" }}>Profile</h2>

      <div
        style={{
          padding: "18px",
          borderRadius: "16px",
          border: "1px solid #E5E7EB",
          background: "#FFFFFF",
        }}
      >
        <div style={{ fontWeight: "700", fontSize: "18px", color: "#111827" }}>{name}</div>
        <div style={{ color: "#6B7280" }}>Role: {role}</div>
        <div style={{ color: "#6B7280" }}>Region: {region}</div>
      </div>

      <div
        style={{
          padding: "18px",
          borderRadius: "16px",
          border: "1px solid #E5E7EB",
          background: "#FFFFFF",
        }}
      >
        <h3 style={{ marginTop: 0, color: "#111827" }}>Recommendation preferences</h3>
        <ul style={{ paddingLeft: "18px", margin: 0, color: "#6B7280" }}>
          {preferences.map((item) => (
            <li key={item} style={{ marginBottom: "8px" }}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Profile;
