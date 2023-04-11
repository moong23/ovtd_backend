const http = require("http");
const { Server } = require("socket.io");
const app = require("./app");
const { setupDraft, chooseStartingTeam } = require("./routes/draft");

const server = http.createServer(app);
const io = new Server(server);

// Set up the draft namespace and start the draft
const draftNamespace = setupDraft(io);
const startingTeam = chooseStartingTeam();
draftNamespace.to("draftRoom").emit("startingTeam", startingTeam);

const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
