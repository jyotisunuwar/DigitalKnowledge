import { useState, useEffect } from "react";
import axios from "axios";

function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [regionFilter, setRegionFilter] = useState("ALL");
  const [projectFilter, setProjectFilter] = useState("ALL");
  const [tagFilter, setTagFilter] = useState("");
  const [lastSearchAt, setLastSearchAt] = useState(null);

  const token = localStorage.getItem("token");

  const search = async () => {
    const cleanQuery = query.split(":")[0];
    try {
      const res = await axios.get(
        `http://localhost:4000/api/search?q=${cleanQuery}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResults(res.data);
      setLastSearchAt(new Date());
    } catch (err) {
      console.error("Search failed", err);
    }
  };

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/recommend", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRecommendations(res.data);
      } catch (err) {
        console.error("Recommendation fetch failed", err);
      }
    };
    fetchRecommendations();
  }, [token]);

  const filterSummary = `Region: ${regionFilter}, Project: ${projectFilter}, Tags: ${
    tagFilter || "Any"
  }`;

  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "'Space Grotesk', sans-serif",
        background: "#F9FAFB",
        minHeight: "100vh",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "34px",
          fontWeight: "800",
          color: "#111827",
          marginBottom: "28px",
        }}
      >
        Search Content
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "24px",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="Enter keywords..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            padding: "12px 16px",
            borderRadius: "12px",
            border: "1px solid #E5E7EB",
            background: "#FFFFFF",
            color: "#111827",
            width: "320px",
            outline: "none",
            fontSize: "16px",
          }}
        />
        <button
          onClick={search}
          style={{
            padding: "12px 24px",
            border: "none",
            borderRadius: "12px",
            background: "#4F46E5",
            color: "#FFFFFF",
            fontWeight: "600",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "12px",
          marginBottom: "20px",
        }}
      >
        <select
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "10px",
            border: "1px solid #E5E7EB",
            background: "#FFFFFF",
            color: "#111827",
          }}
        >
          <option value="ALL">All regions</option>
          <option value="UK">UK</option>
          <option value="EU">EU</option>
          <option value="ASIA">ASIA</option>
          <option value="AMER">AMER</option>
        </select>

        <select
          value={projectFilter}
          onChange={(e) => setProjectFilter(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "10px",
            border: "1px solid #E5E7EB",
            background: "#FFFFFF",
            color: "#111827",
          }}
        >
          <option value="ALL">All projects</option>
          <option value="Project Atlas">Project1</option>
          <option value="Project Nimbus">Project2</option>
          <option value="Project Orion">Project3</option>
        </select>

        <input
          type="text"
          value={tagFilter}
          onChange={(e) => setTagFilter(e.target.value)}
          placeholder="Filter by tag"
          style={{
            padding: "10px",
            borderRadius: "10px",
            border: "1px solid #E5E7EB",
            background: "#FFFFFF",
            color: "#111827",
          }}
        />
      </div>

      <div style={{ textAlign: "center", color: "#6B7280", marginBottom: "24px" }}>
        Filters: {filterSummary}
      </div>

      {lastSearchAt && (
        <div style={{ textAlign: "center", color: "#6B7280", marginBottom: "20px" }}>
          Cached results shown. Last refreshed {lastSearchAt.toLocaleString()}.
        </div>
      )}

      <div>
        <h3 style={{ fontSize: "22px", fontWeight: "700", color: "#111827", marginBottom: "14px" }}>
          Search Results
        </h3>
        {results.length === 0 && <p style={{ color: "#6B7280" }}>No results found.</p>}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {results.map((r) => {
            const lastUpdated = r.updatedAt || r.createdAt;
            return (
              <div
                key={r._id}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E5E7EB",
                  borderRadius: "18px",
                  padding: "20px",
                  boxShadow: "0 12px 30px rgba(17, 24, 39, 0.08)",
                }}
              >
                <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#4F46E5" }}>{r.title}</h3>
                <p style={{ color: "#6B7280", margin: "10px 0" }}>{r.description}</p>
                <small style={{ color: "#9CA3AF", display: "block", marginBottom: "6px" }}>
                  Author: {r.author?.name || "Unknown"}
                </small>
                <small style={{ color: "#9CA3AF", display: "block", marginBottom: "6px" }}>
                  Last updated: {lastUpdated ? new Date(lastUpdated).toLocaleString() : "-"}
                </small>
                <small style={{ color: "#9CA3AF" }}>
                  Tags: {Array.isArray(r.tags) ? r.tags.map((t) => t.name || t).join(", ") : "None"}
                </small>
              </div>
            );
          })}
        </div>
      </div>

      <h3
        style={{
          fontSize: "22px",
          fontWeight: "700",
          color: "#111827",
          marginTop: "40px",
          marginBottom: "14px",
        }}
      >
        Recommended For You
      </h3>

      {recommendations.length === 0 && <p style={{ color: "#6B7280" }}>No recommendations available.</p>}

      <div
        style={{
          display: "flex",
          overflowX: "auto",
          gap: "20px",
          paddingBottom: "10px",
        }}
      >
        {recommendations.map((r) => (
          <div
            key={r._id}
            style={{
              minWidth: "260px",
              background: "#FFFFFF",
              border: "1px solid #E5E7EB",
              borderRadius: "18px",
              padding: "18px",
              boxShadow: "0 12px 30px rgba(17, 24, 39, 0.08)",
              flexShrink: 0,
            }}
          >
            <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#4F46E5" }}>{r.title}</h3>
            <p style={{ color: "#6B7280", margin: "10px 0" }}>{r.description}</p>
            <small style={{ color: "#9CA3AF" }}>
              Region: {r.region} | Tags: {Array.isArray(r.tags) ? r.tags.map((t) => t.name || t).join(", ") : "None"}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
