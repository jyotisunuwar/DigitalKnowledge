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

function DashboardOverview({ user }) {
  const role = normalizeRole(user?.role);
  const isSenior = role === "SENIOR_CONSULTANT" || role === "ADMIN";
  const isSupervisor = role === "KNOWLEDGE_SUPERVISOR" || role === "ADMIN";

  const stats = [
    { label: "Uploaded content", value: "28" },
    { label: "Pending approvals", value: isSenior || isSupervisor ? "5" : "-" },
    { label: "AI recommendations", value: "12" },
    { label: "Regions active", value: "4" },
  ];

  const recommendations = [
    "Energy transition case library",
    "Client onboarding playbook",
    "Compliance evidence checklist",
  ];

  const recentActivity = [
    "Uploaded: Offshore compliance summary",
    "Viewed: Project Nimbus delivery pack",
    "Commented: Data residency FAQ",
  ];

  const governanceSummary = [
    "Approval SLA: 92% within 48 hours",
    "Archived items reviewed weekly",
    "Policy exceptions pending: 2",
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <header
        style={{
          padding: "20px",
          borderRadius: "18px",
          background: "linear-gradient(135deg, #EEF2FF, #F9FAFB)",
          color: "#111827",
          border: "1px solid #E5E7EB",
        }}
      >
        <h2 style={{ margin: 0, fontSize: "28px" }}>Dashboard</h2>
        <p style={{ marginTop: "8px", color: "#6B7280" }}>
          Welcome back, {user?.name || "User"}. Your role is {role}, region {user?.region || "Global"}.
        </p>
      </header>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "16px",
        }}
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            style={{
              padding: "16px",
              borderRadius: "16px",
              background: "#FFFFFF",
              border: "1px solid #E5E7EB",
            }}
          >
            <div style={{ fontSize: "13px", color: "#6B7280" }}>
              {stat.label}
            </div>
            <div style={{ fontSize: "22px", fontWeight: "700", color: "#111827" }}>
              {stat.value}
            </div>
          </div>
        ))}
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "18px",
        }}
      >
        <div
          style={{
            padding: "18px",
            borderRadius: "16px",
            border: "1px solid #E5E7EB",
            background: "#FFFFFF",
          }}
        >
          <h3 style={{ marginTop: 0 }}>AI Recommendations</h3>
          <ul style={{ paddingLeft: "18px", margin: 0, color: "#6B7280" }}>
            {recommendations.map((item) => (
              <li key={item} style={{ marginBottom: "8px" }}>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div
          style={{
            padding: "18px",
            borderRadius: "16px",
            border: "1px solid #E5E7EB",
            background: "#FFFFFF",
          }}
        >
          <h3 style={{ marginTop: 0 }}>Recommended for you</h3>
          <p style={{ color: "#6B7280", margin: 0 }}>
            Curated content based on your projects, region, and recent searches.
          </p>
        </div>

        <div
          style={{
            padding: "18px",
            borderRadius: "16px",
            border: "1px solid #E5E7EB",
            background: "#FFFFFF",
          }}
        >
          <h3 style={{ marginTop: 0 }}>Recent activity</h3>
          <ul style={{ paddingLeft: "18px", margin: 0, color: "#6B7280" }}>
            {recentActivity.map((item) => (
              <li key={item} style={{ marginBottom: "8px" }}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        style={{
          padding: "20px",
          borderRadius: "16px",
          background: "#FFFFFF",
          border: "1px solid #E5E7EB",
        }}
      >
        <h3 style={{ marginTop: 0 }}>Identity and User Service flow</h3>
        <ol style={{ paddingLeft: "18px", margin: 0, color: "#6B7280" }}>
          <li style={{ marginBottom: "8px" }}>User is created in the HR system.</li>
          <li style={{ marginBottom: "8px" }}>User logs in via SSO.</li>
          <li style={{ marginBottom: "8px" }}>
            System Administrator assigns role (Consultant, Senior Consultant, Knowledge Supervisor).
          </li>
          <li style={{ marginBottom: "8px" }}>System Administrator assigns region.</li>
          <li style={{ marginBottom: "8px" }}>DKN stores role in User Service.</li>
          <li>UI shows features based on role.</li>
        </ol>
      </section>

      {isSupervisor && (
        <section
          style={{
            padding: "20px",
            borderRadius: "16px",
            background: "#FFFFFF",
            border: "1px solid #E5E7EB",
          }}
        >
          <h3 style={{ marginTop: 0 }}>Governance overview</h3>
          <ul style={{ paddingLeft: "18px", margin: 0, color: "#6B7280" }}>
            {governanceSummary.map((item) => (
              <li key={item} style={{ marginBottom: "8px" }}>
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

export default DashboardOverview;
