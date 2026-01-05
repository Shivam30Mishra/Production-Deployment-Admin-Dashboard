const BASE_URL = "http://localhost:8080/api/users";

export async function fetchUsers({
  page,
  limit,
  search,
  role,
  status,
  sortBy,
  sortOrder,
}) {
  const params = new URLSearchParams({
    page,
    limit,
    search,
    role,
    status,
    sortBy,
    sortOrder,
  });

  const response = await fetch(`${BASE_URL}?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
}
