let express = require("express");
let route = express.Router();
const mongoose = require("mongoose");
let FCPS_Supervisor = require("../models/fcps_supervisor.modal");

route.get("/", (req, res) => {
  console.log("get request...");
  res.send("Welcome to route");
});

route.get("/:id", async (req, res) => {
  let studentid = req.params.id;
  console.log(studentid);

  FCPS_Supervisor.find({ _id: studentid })
    .populate("depart_id", "ward_name")
    .exec()
    .then((doc) => {
      //console.log(doc);
      if (doc.length > 0) {
        res.json(doc);
        //console.log('ward name', doc.depart_id.ward_name);
      } else {
        res.json({ message: "No data supervisor found" });
      }
      //res.json(doc);
      //console.log('CLASSES', doc)
      //res.render('mbbsall_dmc', {studentdata : doc});
    })
    .catch((err) => console.log(err));

  //res.send('FCPS Supervisor');
});

// ============

route.put("/:id", async (req, res) => {
  //console.log('Ok');
  //res.send(req.params.id);
  console.log("req.body.id : ", req.body.id);

  let studentid = req.params.id;
  console.log(studentid);

  let doc = await FCPS_Supervisor.findOneAndUpdate(
    { _id: studentid },
    {
      super_name: req.body.supervisor,
      email: req.body.email,
      mobile: req.body.mobile,
      emp_id: req.body.empno,
      depart_id: req.body.depart,
    },
    { useFindAndModify: false },
  );

  doc = await FCPS_Supervisor.findOne({ _id: studentid });
  console.log("UPDATE RECORD: ", doc);
});

module.exports = route;
