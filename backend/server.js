require("dotenv").config();
const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
