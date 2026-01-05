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
  // base data
  const [users] = useState(mockUsers);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const USERS_PER_PAGE = 3;

  // search
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // filters
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // sorting
  const [sortBy, setSortBy] = useState("name"); // "name" | "email"
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" | "desc"

  // ---------------------------
  // SEARCH + FILTER
  // ---------------------------
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(debouncedSearchQuery.toLowerCase());

    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  // ---------------------------
  // SORTING (NEW)
  // ---------------------------
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const valueA = a[sortBy].toLowerCase();
    const valueB = b[sortBy].toLowerCase();

    if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
    if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // ---------------------------
  // PAGINATION
  // ---------------------------
  const totalPages = Math.ceil(sortedUsers.length / USERS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const currentUsers = sortedUsers.slice(
    startIndex,
    startIndex + USERS_PER_PAGE
  );

  // ---------------------------
  // HANDLERS
  // ---------------------------
  function goToNextPage() {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  }

  function goToPreviousPage() {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  }

  function handleSearchChange(e) {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  }

  function handleRoleChange(e) {
    setRoleFilter(e.target.value);
    setCurrentPage(1);
  }

  function handleStatusChange(e) {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  }

  function handleSort(column) {
    if (sortBy === column) {
      // toggle order
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
    setCurrentPage(1);
  }

  // ---------------------------
  // RENDER
  // ---------------------------
  return (
    <div>
      <h1>Users</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name or email"
        value={searchQuery}
        onChange={handleSearchChange}
        style={{ marginBottom: "12px", padding: "6px", width: "250px" }}
      />

      {/* Filters */}
      <div style={{ marginBottom: "12px", display: "flex", gap: "12px" }}>
        <select value={roleFilter} onChange={handleRoleChange}>
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>

        <select value={statusFilter} onChange={handleStatusChange}>
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>

      {/* Sort Controls */}
      <div style={{ marginBottom: "12px", display: "flex", gap: "12px" }}>
        <button onClick={() => handleSort("name")}>
          Sort by Name ({sortBy === "name" ? sortOrder : "asc"})
        </button>

        <button onClick={() => handleSort("email")}>
          Sort by Email ({sortBy === "email" ? sortOrder : "asc"})
        </button>
      </div>

      {/* Table */}
      <Table>
        <TableHeader />
        <tbody>
          {currentUsers.map((user) => (
            <TableRow key={user.id} user={user} />
          ))}
        </tbody>
      </Table>

      {sortedUsers.length === 0 && <div>No users found</div>}

      {/* Pagination */}
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
