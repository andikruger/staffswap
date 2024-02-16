const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");
const dotenv = require("dotenv");
const usersRouter = require("./routes/user.route.js");
const chatsRouter = require("./routes/chats.route.js");
const swapRouter = require("./routes/swap.route.js");

const connectToDB = require("./db.js");

dotenv.config();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: CLIENT_URL,
  },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/user", usersRouter);
app.use("/chats", chatsRouter);
app.use("/swap", swapRouter);

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${PORT}`);
});

connectToDB();

io.on("connection", (socket) => {
  socket.on("subscribe chats", (userId) => {
    socket.join(userId);
  });

  socket.on("create chat", (userId) => {
    socket.to(userId).emit("chat created");
  });

  socket.on("delete chat", (userId) => {
    socket.to(userId).emit("chat deleted");
  });

  socket.on("add member", (userId) => {
    socket.to(userId).emit("member added");
  });

  socket.on("subscribe chat messages", (chatId) => {
    socket.join(chatId);
  });

  socket.on("unsubscribe chat messages", (chatId) => {
    socket.leave(chatId);
  });

  socket.on("send message", (chatId, message) => {
    socket.to(chatId).emit("receive message", message);
  });
});
