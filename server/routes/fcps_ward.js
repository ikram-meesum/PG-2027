let express = require('express');
let route = express.Router();

const mongoose = require('mongoose');
let Fcps_Depart = require('../models/depart.model');


route.get('/', (req, res, next) => {
    //res.render("login");

    let mbbsdata = [];
    Fcps_Depart.find().exec().then(
        doc => {
            //console.log(doc);
            if(doc.length >= 0){
                res.json(doc);
            }
            else{
                res.json({ message: 'No data found' });
            }
            //res.json(doc);            
            //console.log('CLASSES', doc)
            //res.render('mbbsall_dmc', {studentdata : doc});
        }
    ).catch(err => console.log(err));    
    //res.send('Classes Get Request');
});

route.post('/', (req, res, next) => {
    //let email = req.body.txtemail;

    console.log('Class submitted');
    res.send('Class submitted');
        
});

module.exports = route;