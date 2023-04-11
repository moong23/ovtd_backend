import { useEffect } from "react";
import { io } from "socket.io-client";

const useDraftSocket = (user, onPlayerPicked, onStartingTeam) => {
  useEffect(() => {
    if (!user) return;

    const draftSocket = io("/draft");

    const joinDraft = () => {
      if (user) {
        draftSocket.emit("joinDraft", user);
      }
    };

    draftSocket.on("connect", joinDraft);

    draftSocket.on("playerPicked", (pickedUser) => {
      onPlayerPicked(pickedUser);
    });

    draftSocket.on("startingTeam", (startingTeam) => {
      onStartingTeam(startingTeam);
    });

    return () => {
      draftSocket.off("connect", joinDraft);
      draftSocket.off("playerPicked");
      draftSocket.off("startingTeam");
      draftSocket.disconnect();
    };
  }, [user, onPlayerPicked, onStartingTeam]);
};

export default useDraftSocket;
