const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require("./app");
const http = require("http");
const mongoose = require("mongoose");
const socketio = require("socket.io");

const Server = http.createServer(app);

const DB = process.env.DB;

mongoose.connect(DB).then((e) => console.log("DB connection successful!"));

const io = socketio(Server, {
  cors: {
    origin: `${process.env.FRONTEND_URL}`,
    methods: ["GET", "POST", "DELETE"],
  },
});

app.set("io", io);

io.on("connection", (socket) => {
  console.log(socket.id, "has connected");
});

const PORT = process.env.PORT || 8000;

Server.listen(PORT, () => console.log(`Listening to Port ${PORT}`));

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  process.exit(1);
});
