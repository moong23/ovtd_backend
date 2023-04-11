/*
Here's an example of a simple login.js file for the backend using Node.js and Express.
This example uses a hardcoded list of users to simulate a database.
You should replace this with an actual database implementation for your use case.
*/

const express = require("express");
const router = express.Router();

// This hardcoded list simulates a database of users.
// Replace this with your actual database implementation.
const users = [
  { id: "super-account", role: "SuperAccount" },
  { id: "user1", role: "Player" },
  { id: "user2", role: "Player" },
  // Add more users as needed
];

router.post("/login", (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  const user = users.find((user) => user.id === userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  return res.status(200).json(user);
});

module.exports = router;
