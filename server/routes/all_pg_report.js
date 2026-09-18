let express = require("express");
let route = express.Router();

let FCPS = require("../models/student.model");

route.get("/", (req, res) => {
  FCPS.find({})
    .sort({ depart_id: 1, supervisor_id: 1 })
    .populate("depart_id", "ward_name")
    .populate("supervisor_id", "super_name")
    .exec()
    .then((doc) => {
      //console.log(doc);
      if (doc.length >= 0) {
        res.json(doc);
      } else {
        res.json({ message: "No data found" });
      }
    })
    .catch((err) => console.log(err));
});

module.exports = route;
