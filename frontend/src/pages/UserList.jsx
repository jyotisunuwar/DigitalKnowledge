import { useEffect, useState } from "react";
import axios from "axios";

export default function UsersList() {
  const [users, setUsers] = useState([]);

  // Fetch all users
  const fetchUsers = () => {
    axios
      .get("http://localhost:5000/api/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Fetch error:", err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete user
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      fetchUsers(); // refresh list
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // Update user role
  const handleRoleChange = async (id, newRole) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/users/${id}`, {
        role: newRole,
      });

      // Update UI instantly
      setUsers((prev) =>
        prev.map((u) => (u._id === id ? res.data : u))
      );
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Registered Users</h2>
      <div className="alert alert-info">
        Admin validation required: assign approved role and region before access.
      </div>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Region</th>
            <th>Role</th>
            <th style={{ width: "120px" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.region}</td>

              <td>
                <select
                  className="form-select form-select-sm"
                  value={u.role}
                  onChange={(e) =>
                    handleRoleChange(u._id, e.target.value)
                  }
                >
                  <option value="Consultant">Consultant</option>
                  <option value="SeniorConsultant">Senior Consultant</option>
                  <option value="KnowledgeSupervisor">Knowledge Supervisor</option>
                  <option value="SystemAdmin">System Admin</option>
                </select>
              </td>

              <td>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(u._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {users.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
