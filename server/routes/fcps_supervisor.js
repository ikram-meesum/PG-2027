let express = require("express");
let route = express.Router();
const mongoose = require("mongoose");

let FCPS_Supervisor = require("../models/fcps_supervisor.modal");

route.get("/", (req, res) => {
  FCPS_Supervisor.find()
    .populate("depart_id", "ward_name")
    .exec()
    .then((doc) => {
      //console.log(doc);
      if (doc.length >= 0) {
        res.json(doc);
        //console.log('ward name', doc.depart_id.ward_name);
      } else {
        res.json({ message: "No data found" });
      }
      //res.json(doc);
      //console.log('CLASSES', doc)
      //res.render('mbbsall_dmc', {studentdata : doc});
    })
    .catch((err) => console.log(err));

  //res.send('FCPS Supervisor');
});

route.post("/", (req, res, next) => {
  //   const studentData = new FCPS_Supervisor({
  //     super_name: req.body.txtsuper_name,
  //     ispresent: req.body.cmbpresent,
  //     email: req.body.txtemail,
  //     mobile: req.body.txtmobile,
  //     depart_id: req.body.cmbward,
  //     emp_id: req.body.txtemp_id,
  //     ins_name: req.body.ins_name,
  //   });
  //   studentData
  //     .save()
  //     .then((doc) => {
  //       console.log(doc);
  //     })
  //     .catch((err) => console.log(err));
  //   res.json({ message: req.body });
  /*
    Student.find({}, (err, data) => {
        for(let i = 0; i < data.length; i++){
            console.log(data[i].feepolicy);

            Student.update({}, function(err, students){
                if(err){
                    res.send(err);
                }
                else{
                    let finalmonth = req.body.cmbmonthof + '-' + req.body.cmbyear;
                    console.log(finalmonth);
                    //console.log(Student.sname);
        
                    Student.update({},
                        {$push: {"fees": { monthof: finalmonth, amount: '1090', paydate: (new Date), status: 'UnPaid'}}},
                        { multi: true},
                        function(err, model) {
                            if(err){ console.log('update err', err); }
                            console.log('update model', model);                    
                        }
                    );
                }
            });
        }
        
    });
    */
  //res.send('Supervisor');
});

module.exports = route;
