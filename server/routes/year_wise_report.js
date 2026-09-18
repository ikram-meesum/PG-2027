let express = require("express");
let route = express.Router();
const mongoose = require("mongoose");
var dateFormat = require("dateformat");

let FCPS = require("../models/student.model");

route.get("/:date", (req, res) => {
  let year = req.params.date;
  console.log("year is: ", year);

  FCPS.find({
    doj: { $gte: `${year}-01-01T00:00:00Z`, $lte: `${year}-12-31T00:00:00Z` },
  })
    .sort({ depart_id: 1, supervisor_id: 1 })
    .populate("depart_id", "ward_name")
    .populate("supervisor_id", "super_name")
    .exec()
    .then((doc) => {
      //console.log(doc);
      if (doc.length >= 0) {
        console.log("doc", doc);
        res.json(doc);
      } else {
        res.json({ message: "No data found" });
      }
      //res.json(doc);
      //console.log('STUDENT', doc)
      //res.render('mbbsall_dmc', {studentdata : doc});
    })
    .catch((err) => console.log(err));
});

module.exports = route;
