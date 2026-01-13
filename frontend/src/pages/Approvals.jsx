import { useEffect, useState } from "react";
import api from "../api/client";

export default function Approvals() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get("/content/pending").then(res => setItems(res.data));
  }, []);

  const approve = async id => {
    await api.post(`/content/${id}/approve`);
    setItems(items.filter(i => i._id !== id));
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Pending Approvals</h2>

      {items.map(item => (
        <div key={item._id} style={{ marginBottom: 20 }}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <button onClick={() => approve(item._id)}>Approve</button>
        </div>
      ))}
    </div>
  );
}
