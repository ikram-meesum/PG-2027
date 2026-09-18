let express = require('express');
let route = express.Router();
const mongoose = require('mongoose');

let FCPS = require('../models/student.model');


route.get('/', (req, res, next) => {    
        
        FCPS.find({}).sort({'depart_id': 1, 'supervisor_id':1 }).populate('depart_id', 'ward_name').populate('supervisor_id', 'super_name').exec().then(      
        doc => {
            //console.log(doc);
            if(doc.length >= 0){

                //FCPS.findById("ward_name")
                //FCPS.count({'supervisor_id.super_name': 'PROF. ZIAUDDIN KASHMIRI'}, function(err, c) {
                  //  console.log('Count is ' + c);
                //});
                res.json(doc);
            }
            else{
                res.json({ message: 'No data found' });
            }
            //res.json(doc);            
            //console.log('STUDENT', doc)
            //res.render('mbbsall_dmc', {studentdata : doc});
        }
    ).catch(err => console.log(err));
});


/*
route.get('/:id', (req, res, next) => {
    //res.render('index');
    let studentid = req.params.id;

    let mbbsdata = [];
    Student.findById(studentid).exec().then(
        doc => {
            res.json(doc);            
            //console.log('STUDENT', doc)
            //res.render('mbbsall_dmc', {studentdata : doc});
        }).catch(err => console.log(err));
});
*/

module.exports = route