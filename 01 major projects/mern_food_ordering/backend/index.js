const express = require("express");
const app = express();
const port = 8080;
const { DB_Connector, /* Fetch_Data */ } = require("./db");
require("dotenv").config();

// connect to the database
const db_connection_link = process.env.DB_CONNECTION_LINK;

DB_Connector(db_connection_link).then(() => {
  console.log("MongoDB Connected...");
  // Fetch_Data();
});

// middleware
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use("/api", require("./routes/CreateUser"));
app.use("/api", require("./routes/LoginUser"));

app.get("/", (req, res) => {
  res.send("hello");
});


app.listen(port, () => {
  console.log(`express running on ${port}...`);
});
