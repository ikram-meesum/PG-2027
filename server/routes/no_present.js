let express = require('express');
let route = express.Router();
const mongoose = require('mongoose');

let FCPS = require('../models/student.model');


route.get('/', (req, res, next) => {
    console.log('no present route');

    //res.render('index');
    //let mbbsdata = [];
    //Student.find().populate({ path: 'ward', select: 'classname' }).exec().then(
        FCPS.find({"ispresent" : { $ne: 'WORKING' }}).populate('depart_id', 'ward_name').populate('supervisor_id', 'super_name').exec().then(  
        doc => {
            //console.log(doc);
            if(doc.length >= 0){
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

module.exports = route