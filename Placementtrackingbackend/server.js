const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.MONGO_URI;

const app = express();

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Error connecting to the database:", err));

const cors = require("cors");

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

const surveyRoutes = require("./routes/surveyRoutes");
const userRoutes = require("./routes/auth");

app.use(express.json());
app.use(cors(corsOptions));
app.use("/api/candidate", surveyRoutes);
app.use("/api/admin", userRoutes);

app.listen(3001, () => {
  console.log("Node API App is running on port 3001 ");
});
