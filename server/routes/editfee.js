let express = require('express');
let route = express.Router();
const mongoose = require('mongoose');

let Student = require('../models/student.model');

route.get('/:sid', (req, res, next) => {
    //console.log('Ok');  
    //res.send(req.params.id);

    let studentid = req.params.sid;
    console.log(studentid);
    
    let mbbsdata = [];
    Student.findById(studentid).exec().then(
        doc => {
            res.json(doc);            
            console.log('STUDENT FEE', doc)
            //res.render('mbbsall_dmc', {studentdata : doc});
        }).catch(err => console.log(err));

});

route.post('/:id', (req, res, next) => {
    //console.log('Ok');  
    //res.send(req.params.id);

    let studentid = req.params.id.toString();
    console.log(studentid);
    
    //let mbbsdata = [];
    Student.update({_id: studentid}, {$set: {sname: req.body.txtsname, 
        fname: req.body.txtfname,
        email: req.body.txtemail,
        do_admission: req.body.txtdo_admission,
        do_birth: req.body.txtdo_birth,
        rollno: req.body.txtrollno,
        grno: req.body.txtgrno,
        nationality: req.body.txtnationality,
        gender: req.body.cmbgender,
        class: req.body.cmbclass,
        religion: req.body.txtreligion,
        address: req.body.txtaddress,
        lastpassout: req.body.txtlastpassout,
        startclass: req.body.txtstartclass,
        previous_school: req.body.txtprevious_school,
        previous_school_address: req.body.txtprevious_school_address,
        hafiz: req.body.cmbhafiz,
        ispresent: req.body.cmbpresent,
        father_qualification: req.body.txtfather_qualification,
        father_cnic: req.body.txtfather_cnic,
        father_mobile: req.body.txtfather_mobile,
        father_email: req.body.txtfather_email,
        father_office: req.body.txtfather_office,
        father_salary: req.body.txtfather_salary,
    
    }})
        .exec()
        .then(
        doc => {
            res.json(doc);            
            console.log('Update :', doc)
            //res.render('mbbsall_dmc', {studentdata : doc});
        }).catch(err => console.log(err));

});


module.exports = route