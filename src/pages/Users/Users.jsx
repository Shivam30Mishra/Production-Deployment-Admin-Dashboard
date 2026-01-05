import { useState } from "react";

const mockUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "admin", status: "active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "user", status: "blocked" },
  { id: 3, name: "Alex Brown", email: "alex@example.com", role: "user", status: "active" },
  { id: 4, name: "Emma Wilson", email: "emma@example.com", role: "user", status: "active" },
  { id: 5, name: "Chris Lee", email: "chris@example.com", role: "admin", status: "blocked" },
  { id: 6, name: "Sarah Kim", email: "sarah@example.com", role: "user", status: "active" },
  { id: 7, name: "David Miller", email: "david@example.com", role: "user", status: "active" },
];

function Users() {
  const [users] = useState(mockUsers);
  const [currentPage, setCurrentPage] = useState(1);

  const USERS_PER_PAGE = 3;

  // --- pagination calculations ---
  const totalPages = Math.ceil(users.length / USERS_PER_PAGE);
  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const endIndex = startIndex + USERS_PER_PAGE;
  const currentUsers = users.slice(startIndex, endIndex);

  // --- handlers ---
  function goToNextPage() {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  }

  function goToPreviousPage() {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }

  // --- UI states ---
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
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div style={{ marginTop: "12px" }}>
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>
          Previous
        </button>

        <span style={{ margin: "0 10px" }}>
          Page {currentPage} of {totalPages}
        </span>

        <button onClick={goToNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Users;
