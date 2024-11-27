const express = require("express");
const cors = require("cors");
const tasksController = require("./tasksController");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the Task Manager API");
});

// Routes
app.use("/api", tasksController);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
