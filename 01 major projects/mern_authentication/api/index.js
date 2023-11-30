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

// Middlewares & Routes
app.use(express.json()); // server can now accept json request
app.use("/api/user", require("./routes/user.route.js"));
app.use("/api/auth", require("./routes/auth.route.js"));

app.listen(PORT, () => console.log(`Server Running on ${PORT}....`));
