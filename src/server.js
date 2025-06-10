import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import path from "path";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'public')));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let latestLocation = null;

// Serve static files from the "public" directory
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "public", "home.html"));
});

app.get("/latest-location", (req, res) => {
  if (latestLocation) {
    res.json(latestLocation);
  } else {
    res.status(404).json({ message: "No location data available" });
  }
});

//real time location updates
io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("sendLocation", (location) => {
    console.log("Received location:", location);
    latestLocation = location;
    socket.broadcast.emit("locationUpdate", location);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
