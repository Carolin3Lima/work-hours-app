const express = require("express");
const router = express.Router();
const Workload = require("../models/workloadModel");

router.route("/insert").post((req, res) => {
  const today = req.body.today;
  const start = req.body.start;
  const end = req.body.end;
  const lunchStart = req.body.lunchStart;
  const lunchEnd = req.body.lunchEnd;
  const hours = req.body.hours;
  const newWorkload = new Workload({
    today,
    start,
    end,
    lunchStart,
    lunchEnd,
    hours,
  });
  newWorkload.save();
  return res.status(200).end();
});

router.route("/search").get((req, res) => {
  Workload.find().then((foundWorkloads) => res.json(foundWorkloads));
});

module.exports = router;
