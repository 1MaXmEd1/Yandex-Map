require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./router/router.js");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use("/api", router);
const start = async () => {
  try {
    await mongoose.connect(process.env.DB);
    app.listen(PORT, () => console.log(`Сервер запущен на порту: ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};
start();
