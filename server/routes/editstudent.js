let express = require("express");
let route = express.Router();

let Student = require("../models/student.model");

route.get("/:id", (req, res) => {
  let studentid = req.params.id.toString();
  console.log(studentid);

  Student.findById(studentid)
    .exec()
    .then((doc) => {
      res.json(doc);
      console.log("SINGLE STUDENT", doc);
    })
    .catch((err) => console.log(err));
});

route.put("/:id", async (req, res) => {
  //console.log('Ok');
  //res.send(req.params.id);
  console.log("req.body.account_no : ", req.body.account_no);

  let studentid = req.params.id.toString();
  console.log(studentid);

  let doc = await Student.findOneAndUpdate(
    { _id: studentid },
    {
      sname: req.body.studentname,
      fname: req.body.fathername,
      email: req.body.email,
      mobile: req.body.mobile,
      doj: req.body.doj,
      dor: req.body.dor,
      cnic: req.body.cnic,
      do_birth: req.body.dob,
      cmsid: req.body.cmsid,
      nationality: req.body.nationality,
      pmdc_no: req.body.pmdc,
      rtmc_no: req.body.rtmc,
      gender: req.body.gender,
      depart_id: req.body.depart_id,
      supervisor_id: req.body.supervisor_id,
      address: req.body.address,
      //dis_action: req.body.txtdisciplinary,
      //med_board: req.body.txtmedboard,
      domicile: req.body.domicile,
      account_no: req.body.account_no,
      govt: req.body.govt,
      ispresent: req.body.ispresent,
      religion: req.body.religion,
      remarks: req.body.remarks,
    },
    { useFindAndModify: false }
  );
  //doc.name; // 'Jean-Luc Picard'
  //doc.age; // undefined

  doc = await Student.findOne({ _id: studentid });
  console.log("UPDATE RECORD: ", doc);

  //let mbbsdata = [];
  // Student.update(
  //   { _id: studentid },
  //   {
  //     $set: {
  //       sname: req.body.txtsname,
  //       fname: req.body.txtfname,
  //       email: req.body.txtemail,
  //       mobile: req.body.txtmobile,
  //       doj: req.body.txtdoj,
  //       dor: req.body.txtdor,
  //       cnic: req.body.txtcnic,
  //       do_birth: req.body.txtdob,
  //       cmsid: req.body.txtcmsid,
  //       nationality: req.body.txtnationality,
  //       pmdc_no: req.body.txtpmdc,
  //       rtmc_no: req.body.txtrtmc,
  //       gender: req.body.cmbgender,
  //       depart_id: req.body.cmbdepart,
  //       supervisor_id: req.body.cmbsupervisor,
  //       address: req.body.txtaddress,
  //       dis_action: req.body.txtdisciplinary,
  //       med_board: req.body.txtmedboard,
  //       domicile: req.body.txtdomicile,
  //       account_no: req.body.txtaccount_no,
  //       govt: req.body.cmbgovt,
  //       ispresent: req.body.cmbpresent,
  //       religion: req.body.cmbreligion,
  //       remarks: req.body.txtremarks,
  //     },
  //   }
  // )
  //   .exec()
  //   .then((doc) => {
  //     res.json(doc);
  //     console.log("Update :", doc);
  //     //res.render('mbbsall_dmc', {studentdata : doc});
  //   })
  //   .catch((err) => console.log(err));
});

module.exports = route;
