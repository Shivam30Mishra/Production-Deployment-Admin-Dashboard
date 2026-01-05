const express = require("express");
const cors = require("cors");
const usersRoutes = require("./routes/users.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", usersRoutes);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
