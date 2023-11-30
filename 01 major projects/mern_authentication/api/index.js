const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const PORT = 8080;

// database connection
mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`Server Running on ${PORT}....`));
