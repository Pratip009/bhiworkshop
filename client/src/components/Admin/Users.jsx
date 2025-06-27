// src/components/Admin/Users.js
import { useEffect, useState } from "react";
import { fetchUsers, deleteUser } from "../../api/userApi";
import UserTable from "./UserTable";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    setError(""); // Reset error

    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      setError("Failed to load users. Please try again.", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    const success = await deleteUser(id);
    if (success) {
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Users List</h1>

      {loading && <p>Loading users...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && <UserTable users={users} handleDelete={handleDelete} />}
    </div>
  );
};

export default Users;
