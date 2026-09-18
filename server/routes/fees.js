let express = require('express');
let route = express.Router();

route.get('/', (req, res, next) => {
    //res.render("login");
    res.send('Fee Get Request');
});

route.post('/', (req, res, next) => {
    //let email = req.body.txtemail;
    //let pwd = req.body.txtpwd;
    //console.log('Email ', email);
    //console.log('Password ', pwd);

    res.send('Fees submitted');
        
});

module.exports = route;