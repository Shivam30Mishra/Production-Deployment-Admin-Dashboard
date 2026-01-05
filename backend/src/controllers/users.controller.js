const users = require("../data/users.data");

function getUsers(req, res) {
  let result = [...users];

  const {
    page = 1,
    limit = 3,
    search = "",
    role = "all",
    status = "all",
    sortBy = "name",
    sortOrder = "asc",
  } = req.query;

  // SEARCH
  if (search) {
    const s = search.toLowerCase();
    result = result.filter(
      (u) =>
        u.name.toLowerCase().includes(s) ||
        u.email.toLowerCase().includes(s)
    );
  }

  // FILTERS
  if (role !== "all") {
    result = result.filter((u) => u.role === role);
  }

  if (status !== "all") {
    result = result.filter((u) => u.status === status);
  }

  // SORTING
  result.sort((a, b) => {
    const A = a[sortBy].toLowerCase();
    const B = b[sortBy].toLowerCase();

    if (A < B) return sortOrder === "asc" ? -1 : 1;
    if (A > B) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // PAGINATION
  const total = result.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const data = result.slice(start, start + Number(limit));

  res.json({
    data,
    meta: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages,
    },
  });
}

module.exports = { getUsers };
