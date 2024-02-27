const express = require("express");
const app = express();
const morgan = require("morgan");
const path = require("path");
const dotenv = require("dotenv");
const mainRoutes = require("./src/routers/index");

// config
dotenv.config({
  path: "src/config/.env",
});
const db = require("./src/config/db");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Middleware
app.use(morgan("dev"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "src", "views"));
app.use("uploads", express.static(path.join(__dirname, "src", "uploads")));

// API Routes
mainRoutes(app);

const port = process.env.PORT;

// Server Listen
app.listen(port, () => {
  try {
    console.log(`Server running on port http://localhost:${port}`);
  } catch (error) {
    console.log(error);
    console.log("Server not running");
    process.exit(1);
  }
});
