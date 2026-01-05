import { useState } from "react";

const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
    status: "active",
    createdAt: "2024-01-01",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "user",
    status: "blocked",
    createdAt: "2024-01-05",
  },
];

function Users() {
  const [users,setUsers] = useState(mockUsers);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(false);

  // UI state handling
  if (loading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div>Something went wrong</div>;
  }

  if (!users.length) {
    return <div>No users found</div>;
  }

  return (
    <div>
      <h1>Users</h1>

      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
