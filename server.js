//setup configs
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

//middleware usage
app.use(cors());
app.use(express.json());

//route importing / usage
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

//db connection
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("db running");
});

//app run
app.listen(3000, () => {
  console.log("API running");
});
