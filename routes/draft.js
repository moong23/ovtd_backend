const users = [
  { id: "super-account", role: "SuperAccount" },
  { id: "user1", role: "Player" },
  { id: "user2", role: "Player" },
  // Add more users as needed
];

// This function simulates the random team selection process.
const chooseStartingTeam = () => {
  const randomIndex = Math.floor(Math.random() * 2);
  return randomIndex === 0 ? "teamA" : "teamB";
};

const setupDraft = (io) => {
  const draftNamespace = io.of("/draft");

  draftNamespace.on("connection", (socket) => {
    console.log("User connected to the draft");

    socket.on("joinDraft", (user) => {
      socket.user = user;
      socket.join("draftRoom");
      console.log(`${user.id} has joined the draft room.`);
    });

    socket.on("pickPlayer", (pickedUser) => {
      if (socket.user && socket.user.role === "Leader") {
        console.log(`${socket.user.id} has picked ${pickedUser.id}`);
        draftNamespace.to("draftRoom").emit("playerPicked", pickedUser);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected from the draft");
    });
  });

  return draftNamespace;
};

module.exports = { setupDraft, chooseStartingTeam };
