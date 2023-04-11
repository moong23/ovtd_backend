const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const loginRoutes = require("./routes/login");
const { setupDraft, chooseStartingTeam } = require("./routes/draft");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use("/api", loginRoutes);

// Set up the draft namespace and start the draft
const draftNamespace = setupDraft(io);
const startingTeam = chooseStartingTeam();
draftNamespace.to("draftRoom").emit("startingTeam", startingTeam);

module.exports = app;
