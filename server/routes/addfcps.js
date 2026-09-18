let express = require("express");
let route = express.Router();
//const mongoose = require("mongoose");

let Student = require("../models/student.model");

route.get("/", (req, res) => {
  console.log("Add New FCPS");
  res.send("Please submit form");
});

route.post("/", async (req, res) => {
  console.log("INSERTED");

  const studentData = new Student({
    sname: req.body.txtsname,
    fname: req.body.txtfname,
    email: req.body.txtemail,
    mobile: req.body.txtmobile,
    doj: req.body.txtdoj,
    dor: req.body.txtdor,
    domicile: req.body.txtdomicile,
    account_no: req.body.txtaccount_no,
    cnic: req.body.txtcnic,
    do_birth: req.body.txtdob,
    cmsid: req.body.txtcmsid,
    empid: req.body.txtempid,
    nationality: req.body.txtnationality,
    pmdc_no: req.body.txtpmdc,
    rtmc_no: req.body.txtrtmc,
    gender: req.body.cmbgender,
    depart_id: req.body.cmbdepart,
    supervisor_id: req.body.cmbsupervisor,
    address: req.body.txtaddress,
    govt: req.body.cmbgovt,
    ispresent: req.body.cmbpresent,
    // emp_id: req.body.emp_id,
    //med_board: req.body.txtmedboard,
    remarks: req.body.txtremarks,
    religion: req.body.cmbreligion,
  });

  try {
    const result = await studentData.save();
    console.log(result); // result
    res.json(result);
  } catch (err) {
    console.error("Error ocured from insert pg data: ", err);
  }
});

module.exports = route;
