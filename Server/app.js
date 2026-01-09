const express = require("express");
const cors = require("cors");
const hpp = require("hpp");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
const compression = require("compression");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const { xss } = require("express-xss-sanitizer");
const app = express();
const socketio = require("socket.io");
const expressServer = app.listen(8001);

const campaignRouter = require("./routes/campaignRouter");
const blockchainRouter = require("./routes/blockchainRouter");
const userRouter = require("./routes/userRouter");

const io = socketio(expressServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE"],
  },
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

io.on("connection", (socket) => {
  console.log(socket.id, "has connected");
});

app.use(
  cors({
    origin: "http://localhost:5173", // your frontend
    credentials: true,
  })
);

// const limiter = rateLimit({
//   max: 100,
//   windowMs: 60 * 60 * 1000,
//   message: "too many requrests",
// });

// app.use(limiter);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  mongoSanitize.sanitize(req.body);
  mongoSanitize.sanitize(req.params);
  mongoSanitize.sanitize(req.query);
  next();
});

app.use(xss());
app.use(hpp());
app.use(compression());

app.use("/api/campaigns", campaignRouter);
app.use("/api/blockchain", blockchainRouter);
app.use("/api/user", userRouter);

module.exports = app;
