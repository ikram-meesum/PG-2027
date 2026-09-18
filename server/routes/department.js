let express = require("express");
let route = express.Router();
//const mongoose = require('mongoose');

//let FCPS_Supervisor = require('../models/fcps_supervisor.modal');

const Depart = require("../models/depart.model");

route.get("/", (req, res, next) => {
  Depart.find({})
    .sort({ ward_name: 1 })
    .then((doc) => {
      if (doc.length >= 0) {
        res.json(doc);
      } else {
        res.json({ message: "No data found" });
      }
    })
    .catch((err) => console.log(err));
});

route.post("/", async (req, res) => {
  const departData = new Depart({
    ward_name: req.body.ward_name,
    campus: req.body.campus,
    ispresent: "YES",
  });

  try {
    const result = await departData.save();
    console.log(result); // result
    res.json(result);
  } catch (err) {
    console.error("Error ocured from insert department", err);
  }
});

module.exports = route;
