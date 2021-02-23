const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://mongo:27017/workloadDB", { useNewUrlParser: true });

app.use("/", require("./routes/workloadRoute"));
app.listen(3001, function () {
  console.log("express server is running on port 3001");
});
