const express = require("express");
const path = require("path");
const mainRoutes = require("./src/routers/index");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

app.use(express.static(path.join(__dirname, "public")));

// API Routes
mainRoutes(app);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
