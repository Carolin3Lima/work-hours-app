const mongoose = require("mongoose");
const { stringify } = require("qs");

const workloadSchema = {
  today: String,
  start: String,
  end: String,
  lunchStart: String,
  lunchEnd: String,
  hours: String,
};

const Workload = mongoose.model("Workload", workloadSchema);

module.exports = Workload;
