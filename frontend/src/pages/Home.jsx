export default function Home() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      padding: "40px",
      boxSizing: "border-box",
      textAlign: "center"
    }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>
        DKN Knowledge Platform
      </h1>
      <p style={{ fontSize: "1.2rem", maxWidth: "600px" }}>
        Welcome! Use the navigation above to explore the system.
      </p>
    </div>
  );
}
