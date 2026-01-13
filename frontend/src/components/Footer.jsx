function Footer() {
  return (
    <footer
      style={{
        marginTop: "30px",
        padding: "18px 24px",
        borderTop: "1px solid #E5E7EB",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: "10px",
        fontSize: "13px",
        color: "#6B7280",
        background: "#F9FAFB",
      }}
    >
      <span>Data residency: Regional storage by policy.</span>
      <span>GDPR compliant processing and retention.</span>
      <span>(c) Velion Dynamics</span>
    </footer>
  );
}

export default Footer;
