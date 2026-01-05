import { useState } from "react";
import Table from "../../components/table/Table";
import TableHeader from "../../components/table/TableHeader";
import TableRow from "../../components/table/TableRow";
import Pagination from "../../components/common/Pagination";

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
  const totalPages = Math.ceil(users.length / USERS_PER_PAGE);
  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const currentUsers = users.slice(startIndex, startIndex + USERS_PER_PAGE);

  function goToNextPage() {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  }

  function goToPreviousPage() {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  }

  return (
    <div>
      <h1>Users</h1>

      <Table>
        <TableHeader />
        <tbody>
          {currentUsers.map((user) => (
            <TableRow key={user.id} user={user} />
          ))}
        </tbody>
      </Table>

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
