import { useState } from "react";
import api from "../api/client";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const search = async () => {
    const res = await api.get(`/content/search?q=${query}`);
    setResults(res.data);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Search Content</h2>

      <input
        placeholder="Search..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <button onClick={search}>Search</button>

      <ul>
        {results.map(r => (
          <li key={r._id}>{r.title}</li>
        ))}
      </ul>
    </div>
  );
}
