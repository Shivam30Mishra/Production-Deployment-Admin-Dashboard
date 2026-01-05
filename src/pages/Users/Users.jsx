import { useState } from "react";
import Table from "../../components/table/Table";
import TableHeader from "../../components/table/TableHeader";
import TableRow from "../../components/table/TableRow";
import Pagination from "../../components/common/Pagination";
import useDebounce from "../../hooks/useDebounce";

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
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const USERS_PER_PAGE = 3;

  // 🔍 search logic (before pagination)
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
  );

  // reset page when search changes
  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const currentUsers = filteredUsers.slice(
    startIndex,
    startIndex + USERS_PER_PAGE
  );

  function goToNextPage() {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  }

  function goToPreviousPage() {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  }

  function handleSearchChange(e) {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // VERY IMPORTANT
  }

  return (
    <div>
      <h1>Users</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by name or email"
        value={searchQuery}
        onChange={handleSearchChange}
        style={{ marginBottom: "12px", padding: "6px", width: "250px" }}
      />

      <Table>
        <TableHeader />
        <tbody>
          {currentUsers.map((user) => (
            <TableRow key={user.id} user={user} />
          ))}
        </tbody>
      </Table>

      {filteredUsers.length === 0 && <div>No users found</div>}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onNext={goToNextPage}
        onPrevious={goToPreviousPage}
      />
    </div>
  );
}

export default Users;
