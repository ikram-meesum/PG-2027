const express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
const fs = require("fs");
const fileupload = require("express-fileupload");
const path = require("path");

require("dotenv").config();
const apikey = process.env.API_KEY;

const app = express();
app.use(cors());

mongoose.connect(apikey, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// file upload
app.use(fileupload());
app.use("/upload_dox", express.static(path.resolve(__dirname, "upload_dox")));
console.log("path", express.static(path.resolve(__dirname, "upload_dox")));

// New Routes
const depart = require("./routes/department");

//--------------------------------

// Old Routes
const loginRoute = require("./routes/login");
const studentRoute = require("./routes/student");
const addMBBSRoute = require("./routes/addfcps");
const editStudent = require("./routes/editstudent");
//const feesRoute = require('./routes/fees');
const fcpsWardRoute = require("./routes/fcps_ward");
const fcpsSupervisorRoute = require("./routes/fcps_supervisor");
const departSupervisor = require("./routes/depart_supervisor");
const allPgReport = require("./routes/all_pg_report");
const current_Supervisor = require("./routes/current_supervisor");
const supervisor_Wise_Total = require("./routes/supervisor_wise_report");
const no_present = require("./routes/no_present");
const yearWiseReport = require("./routes/year_wise_report");

const editSupervisor = require("./routes/editsupervisor");
const uploadUpdate = require("./routes/upload");
//const editFeeRoute = require('./routes/editfee');

// app.get('/' (req, res) => {
//     console.log('ge request');
//     res.send('get req');
// })

// New Routes
app.use("/depart", depart); // DONE

//--------------------------------------
// All Routes
app.use("/", loginRoute);
app.use("/fcpspresent", studentRoute); // DONE
app.use("/addfcps", addMBBSRoute); // DONE
app.use("/editfcps", editStudent); // DONE
app.use("/upload", uploadUpdate); // DONE
app.use("/editsupervisor", editSupervisor); // DONE

//app.use('/fees', feesRoute);

app.use("/fcpsward", fcpsWardRoute);
app.use("/fcps_supervisor", fcpsSupervisorRoute);
app.use("/depart_supervisor", departSupervisor); // PROCESS

// ------------------ REPORTS ---------------------
app.use("/allpg_report", allPgReport); // PROCESS
app.use("/current_supervisors", current_Supervisor); // DONE
app.use("/supervisor_wise_total", supervisor_Wise_Total);
app.use("/nopresent", no_present); // DONE
app.use("/yearwise_report", yearWiseReport);

// FILE UPLOAD
app.get("/upload_dox/:id", (req, res) => {
  //console.log('upload route', req.params.enroll_no);

  let dir = __dirname + "/upload_dox/" + req.params.id;
  console.log("dir", dir);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  res.send(req.params.id);
});

app.post("/upload_dox/:id", (req, res) => {
  //let filepath = path.join(__dirname, '/upload_dox/' + req.params.enroll_no);

  let fname = req.body.filename;
  console.log("fname", fname);

  if (req.files) {
    let file = req.files.filename;
    let file_name = file.name;
    //console.log('i m in if');

    //console.log('file name: ', file_name);

    //let finalpath2 = "./upload_dox/" + req.params.enroll_no + '/' + file_name;
    //console.log('finalpath2', finalpath2);

    file.mv("./upload_dox/" + req.params.id + "/" + file_name, function (err) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        console.log("File Uploaded Successfully");
        res.send("File Uploaded Successfully");

        // Category.findByIdAndUpdate(
        //     {_id: req.params.catid},
        //     {$push: {"subCategory": { sub_name: req.body.txt_subcategory, image: file_name, description: req.body.txt_description, price: req.body.txt_price, ispresent: req.body.txt_present }}},
        //     function(err, model) {
        //         if(err){
        //             console.log('Error from update: ', err);
        //         } else {
        //             console.log(model);
        //             res.send('File uploaded and save data successfully');
        //         }
        //     }
        // );
      }
    });
  }
});

// SHOW FILES
app.get("/showfiles/:enroll_no", (req, res) => {
  const folderPath = __dirname + "/upload_dox/" + req.params.enroll_no;
  console.log("folder path", folderPath);
  //res.redirect('/users');

  fs.readdir(folderPath, function (err, items) {
    //console.log(items);
    //allFiles = items;

    res.json(items);

    // for (var i=0; i<items.length; i++) {
    //     console.log(items[i]);
    // }
  });
});

app.listen(3001, () => console.log("App listening on port 3001!"));
