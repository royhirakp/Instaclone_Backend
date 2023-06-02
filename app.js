const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(cors());

app.use(bodyparser.json());
const InstapostRoute = require("./routes/postR");

app.use("/api/v1", InstapostRoute);

app.use("*", (req, res) => {
  res.status(404).send("404 not found");
});

module.exports = app;
