import { NextResponse } from "next/server";
import { Server } from "socket.io";

export async function GET() {
  return NextResponse.json({ message: "Socket.IO initialized" });
}

let io;

export function configureSocketIO() {
  if (!io) {
    console.log("Setting up Socket.IO server...");
    io = new Server({
      path: "/api/socket",
    });

    io.on("connection", (socket) => {
      console.log("A user connected:", socket.id);

      socket.on("chat message", (msg) => {
        console.log("Received message:", msg); // Log received messages
        io.emit("chat message", msg); // Broadcast the message to all clients
      });

      socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.id);
      });
    });
  }
}

configureSocketIO();
