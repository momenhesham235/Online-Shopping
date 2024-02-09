import express from "express";
import mainRoutes from "./src/routers/index.js";

const app = express();

// API Routes
mainRoutes(app);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
