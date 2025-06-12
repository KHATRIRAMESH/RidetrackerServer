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
app.use(express.static(path.join(__dirname, "public")));

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

app.post("/latest-location", (req, res) => {
  console.log("Received location data:", req.body);
  if (latestLocation) {
    res.json(latestLocation);
  } else {
    res.status(404).json({ message: "No location data available" });
  }
});

//real time location updates
io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("locationUpdate", (coordinates) => {
    console.log("Received location:", coordinates);
    latestLocation = coordinates;
    socket.broadcast.emit("locationUpdate", coordinates);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected", socket.id);
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
