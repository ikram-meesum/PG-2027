let express = require("express");
let route = express.Router();
const mongoose = require("mongoose");

//let FCPS = require("../models/student.model");
let Fcps_Supevisor = require("../models/fcps_supervisor.modal");

route.get("/", (req, res) => {
  Fcps_Supevisor.find({})
    .sort({ depart_id: 1 })
    .populate("depart_id", ["ward_name", "campus"])
    .exec()
    .then((doc) => {
      //console.log(doc);
      if (doc.length >= 0) {
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

route.post("/", async (req, res) => {
  const supervisor = new Fcps_Supevisor({
    super_name: req.body.super_name,
    ispresent: "YES",
    email: req.body.email,
    mobile: req.body.mobile,
    depart_id: req.body.depart_id,
    emp_id: req.body.emp_id,
    // ins_name: req.body.ins_name,
  });

  try {
    const result = await supervisor.save();
    console.log(result); // result
    res.json(result);
  } catch (err) {
    console.error("Error ocured from insert supervisor", err);
  }
});

module.exports = route;
