const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config({ path: "./config/config.env" });
const swaggerjsdoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const Server = require("socket.io");

// use monogoose to connect to mongodb

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

const port = process.env.PORT || 8000;

app.use(express.json());

app.get("/", (req, res) => {
  res.redirect("/apidocs");
});

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.1",
    info: {
      title: "StaffSwapp API",
      version: "0.7.0",
    },
    basePath: "/api/v1/",
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./docs/users.docs.js"],
};

const swaggerDocs = swaggerjsdoc(swaggerOptions);
app.use("/apidocs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use("/api/v1/user", require("./routes/user.route"));

app.use("/api/v1/swap", require("./routes/swap.route"));
const server = app.listen(port, () =>
  console.log(`Server running on port ${port}`)
);
// display database connection
mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected");
});

const io = new Server.Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});
io.on("connection", (socket) => {
  socket.on("setup", (userData) => {
    socket.join(userData.id);
    socket.emit("connected");
  });
  socket.on("join room", (room) => {
    socket.join(room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieve) => {
    var chat = newMessageRecieve.chatId;
    if (!chat.users) console.log("chats.users is not defined");
    chat.users.forEach((user) => {
      if (user._id == newMessageRecieve.sender._id) return;
      socket.in(user._id).emit("message recieved", newMessageRecieve);
    });
  });
});
