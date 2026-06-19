const { loadEnvFile } = require("node:process");
try {
  process.loadEnvFile("./config/.env");
} catch (error) {}

const express = require("express");
const app = express();
const path = require("node:path");
const indexRouter = require("./routes/indexRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/", indexRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at htpp://localhost:${PORT}`);
});
