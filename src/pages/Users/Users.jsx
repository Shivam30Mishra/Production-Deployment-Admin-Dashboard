import { useEffect, useState } from "react";
import Table from "../../components/table/Table";
import TableHeader from "../../components/table/TableHeader";
import TableRow from "../../components/table/TableRow";
import Pagination from "../../components/common/Pagination";
import useDebounce from "../../hooks/useDebounce";
import { fetchUsers } from "../../services/userService";

function Users() {
  // data state
  const [users, setUsers] = useState([]);
  const [meta, setMeta] = useState({});

  // UI states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  // ---------------------------
  // FETCH USERS FROM BACKEND
  // ---------------------------
  useEffect(() => {
    async function loadUsers() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchUsers({
          page: currentPage,
          limit: USERS_PER_PAGE,
          search: debouncedSearchQuery,
          role: roleFilter,
          status: statusFilter,
          sortBy,
          sortOrder,
        });

        setUsers(response.data);
        setMeta(response.meta);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, [
    currentPage,
    USERS_PER_PAGE,
    debouncedSearchQuery,
    roleFilter,
    statusFilter,
    sortBy,
    sortOrder,
  ]);

  // ---------------------------
  // HANDLERS
  // ---------------------------
  function goToNextPage() {
    if (currentPage < meta.totalPages) {
      setCurrentPage((p) => p + 1);
    }
  }

  function goToPreviousPage() {
    if (currentPage > 1) {
      setCurrentPage((p) => p - 1);
    }
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
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
    setCurrentPage(1);
  }

  // ---------------------------
  // UI STATES
  // ---------------------------
  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error}</div>;

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

      {/* Sort */}
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
          {users.map((user) => (
            <TableRow key={user.id} user={user} />
          ))}
        </tbody>
      </Table>

      {users.length === 0 && <div>No users found</div>}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={meta.totalPages || 1}
        onNext={goToNextPage}
        onPrevious={goToPreviousPage}
      />
    </div>
  );
}

export default Users;
