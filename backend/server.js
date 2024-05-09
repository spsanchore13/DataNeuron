require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.conf");
const componentRouter = require("./routes/Component.route");
const executionTimeMiddleware = require("./middlewares/ExecutionTime.middleware");

const app = express();

app.use(cors({ origin: ["https://data-neuron-assignment-mocha.vercel.app/"] }));
app.use(express.json());
app.use(executionTimeMiddleware);

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app.use("/component", componentRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
  try {
    await connectDB;
    console.log("Connected to MongoDB");
    console.log(`Listening on port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
