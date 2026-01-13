function ActivityLog({ user }) {
  const activity = [
    { action: "UPLOAD", detail: "Project Orion risk register", time: "Today 09:30" },
    { action: "APPROVAL", detail: "Approved: Client onboarding guide", time: "Yesterday 16:10" },
    { action: "SEARCH", detail: "Query: energy transition", time: "Yesterday 11:45" },
    { action: "VIEW", detail: "Viewed: GDPR evidence checklist", time: "Mon 14:05" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <h2 style={{ marginTop: 0, color: "#111827" }}>Audit and Activity Log</h2>
      <p style={{ color: "#6B7280", marginTop: "-6px" }}>
        Read-only record of key actions for governance oversight.
      </p>

      <div
        style={{
          borderRadius: "16px",
          border: "1px solid #E5E7EB",
          background: "#FFFFFF",
          overflow: "hidden",
        }}
      >
        {activity.map((item, index) => (
          <div
            key={index}
            style={{
              padding: "14px 18px",
              borderBottom:
                index === activity.length - 1 ? "none" : "1px solid #E5E7EB",
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "8px",
              color: "#111827",
            }}
          >
            <div>
              <strong>{item.action}</strong> - {item.detail}
            </div>
            <div style={{ color: "#6B7280" }}>{item.time}</div>
          </div>
        ))}
      </div>

      <div style={{ fontSize: "12px", color: "#9CA3AF" }}>
        Viewer: {user?.name || "User"}
      </div>
    </div>
  );
}

export default ActivityLog;
